package models

import (
	"time"
)

type Trade struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	UserID uint   `json:"user_id" gorm:"not null;index"`
	Price  string `json:"price" gorm:"type:varchar(50);not null"`
	Amount string `json:"amount" gorm:"type:varchar(50);not null"`
	Type   string `json:"type" gorm:"type:varchar(10);not null"` // 改为varchar，兼容SQLite
	Symbol string `json:"symbol" gorm:"type:varchar(20);default:'BTC/USDT'"`
	Status string `json:"status" gorm:"type:varchar(20);default:'completed'"` // 改为varchar，兼容SQLite

	// 用于前端显示的字段
	UserName string `json:"user_name" gorm:"-"` // 不存储在数据库中，仅用于响应
	Time     string `json:"time" gorm:"-"`      // 格式化的时间字符串

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName 指定表名
func (Trade) TableName() string {
	return "trades"
}
