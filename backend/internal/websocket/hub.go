package websocket

import "encoding/json"

// Hub 维护一组活跃的客户端，并将消息广播给这些客户端。
type Hub struct {
	// 注册的客户端集合。
	clients map[*Client]bool

	// 从客户端传入的消息。
	broadcast chan []byte

	// 从客户端注册请求。
	register chan *Client

	// 从客户端注销请求。
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			// 当有新客户端连接时，将其添加到 clients 集合中。
			h.clients[client] = true
		case client := <-h.unregister:
			// 当客户端断开连接时，将其从 clients 集合中移除。
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			// 当有新消息需要广播时，将其发送给所有已连接的客户端。
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}

// BroadcastTrade 会将交易信息序列化为 JSON 并发送到广播通道。
func (h *Hub) BroadcastTrade(trade interface{}) {
	// 将 trade 结构体序列化为 JSON
	message, err := json.Marshal(trade)
	if err != nil {
		// 在实际应用中，这里应该有更完善的日志记录
		println("无法序列化交易信息:", err)
		return
	}
	// 将 JSON 消息发送到广播通道
	h.broadcast <- message
}
