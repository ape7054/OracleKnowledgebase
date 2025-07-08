package models

// Trade 定义了交易数据结构
type Trade struct {
	ID     int    `json:"id"`
	Price  string `json:"price"`
	Amount string `json:"amount"`
	Time   string `json:"time"`
	Type   string `json:"type"` // "buy" or "sell"
}
