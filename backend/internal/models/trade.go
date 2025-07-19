package models

// Trade 定义了交易数据结构
type Trade struct {
	ID       int    `json:"id"`
	Price    string `json:"price"`
	Amount   string `json:"amount"`
	Time     string `json:"time"`
	Type     string `json:"type"`                // "buy" or "sell"
	UserID   *int   `json:"user_id,omitempty"`   // 用户ID（可选）
	UserName string `json:"user_name,omitempty"` // 用户名（显示用）
}
