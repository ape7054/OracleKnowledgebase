package websocket

import (
	"encoding/json"
	"log"
)

// TradeMessage 交易消息结构
type TradeMessage struct {
	ID       uint   `json:"id"`
	Price    string `json:"price"`
	Amount   string `json:"amount"`
	Type     string `json:"type"`
	Symbol   string `json:"symbol"`
	UserName string `json:"user_name"`
	Time     string `json:"time"`
}

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
			h.clients[client] = true
			log.Printf("WebSocket客户端已连接，当前连接数: %d", len(h.clients))

		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
				log.Printf("WebSocket客户端已断开连接，当前连接数: %d", len(h.clients))
			}
		case message := <-h.broadcast:
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

// BroadcastTrade 广播交易消息
func (h *Hub) BroadcastTrade(trade TradeMessage) {
	message, err := json.Marshal(trade)
	if err != nil {
		log.Printf("交易消息序列化失败: %v", err)
		return
	}

	select {
	case h.broadcast <- message:
		log.Printf("已广播交易消息: %s %s %s", trade.Type, trade.Amount, trade.Symbol)
	default:
		log.Println("广播通道已满，跳过消息")
	}
}
