package websocket

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// 等待写入消息的时间。
	writeWait = 10 * time.Second
	// 等待读取 pong 消息的时间。
	pongWait = 60 * time.Second
	// 发送 ping 消息的周期。必须小于 pongWait。
	pingPeriod = (pongWait * 9) / 10
	// 允许从 peer 读取的最大消息大小。
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// 解决跨域问题：允许所有来源的连接
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Client 是 WebSocket 连接和 Hub 之间的中间人。
type Client struct {
	hub *Hub
	// WebSocket 连接。
	conn *websocket.Conn
	// 缓冲的传出消息通道。
	send chan []byte
}

// readPump 从 WebSocket 连接中读取消息并将其泵送到 Hub。
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, _, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		// 我们目前忽略从客户端收到的消息，因为我们只做服务器->客户端的推送
	}
}

// writePump 将消息从 Hub 泵送到 WebSocket 连接。
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// Hub 关闭了通道。
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// 将排队的消息添加到当前 WebSocket 消息中。
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write([]byte{'\n'})
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// ServeWs 处理来自 peer 的 WebSocket 请求。
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// 允许在独立的 goroutine 中并发执行读写操作。
	go client.writePump()
	go client.readPump()
}
