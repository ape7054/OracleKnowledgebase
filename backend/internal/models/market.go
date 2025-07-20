package models

import (
	"time"
)

// MarketData 表示市场数据的数据库模型
type MarketData struct {
	ID                       uint      `json:"id" gorm:"primaryKey"`
	CoinID                   string    `json:"coin_id" gorm:"index;not null"`
	Symbol                   string    `json:"symbol" gorm:"not null"`
	Name                     string    `json:"name" gorm:"not null"`
	CurrentPrice             float64   `json:"current_price"`
	MarketCap                float64   `json:"market_cap"`
	MarketCapRank            int       `json:"market_cap_rank"`
	TotalVolume              float64   `json:"total_volume"`
	PriceChange24h           float64   `json:"price_change_24h"`
	PriceChangePercentage24h float64   `json:"price_change_percentage_24h"`
	LastUpdated              time.Time `json:"last_updated"`
	CreatedAt                time.Time `json:"created_at"`
	UpdatedAt                time.Time `json:"updated_at"`
}

// HistoricalPrice 表示历史价格数据
type HistoricalPrice struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CoinID    string    `json:"coin_id" gorm:"index;not null"`
	Price     float64   `json:"price" gorm:"not null"`
	Timestamp time.Time `json:"timestamp" gorm:"index;not null"`
	CreatedAt time.Time `json:"created_at"`
}

// PriceAlert 表示价格预警
type PriceAlert struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"user_id" gorm:"index;not null"`
	CoinID      string    `json:"coin_id" gorm:"index;not null"`
	TargetPrice float64   `json:"target_price" gorm:"not null"`
	AlertType   string    `json:"alert_type" gorm:"not null"` // "above" or "below"
	IsActive    bool      `json:"is_active" gorm:"default:true"`
	IsTriggered bool      `json:"is_triggered" gorm:"default:false"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	
	// 关联关系
	User User `json:"user" gorm:"foreignKey:UserID"`
}

// Watchlist 表示用户的关注列表
type Watchlist struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id" gorm:"index;not null"`
	CoinID    string    `json:"coin_id" gorm:"index;not null"`
	CreatedAt time.Time `json:"created_at"`
	
	// 关联关系
	User User `json:"user" gorm:"foreignKey:UserID"`
}

// MarketSummary 表示市场概览数据
type MarketSummary struct {
	TotalMarketCap       float64 `json:"total_market_cap"`
	TotalVolume24h       float64 `json:"total_volume_24h"`
	BitcoinDominance     float64 `json:"bitcoin_dominance"`
	EthereumDominance    float64 `json:"ethereum_dominance"`
	ActiveCryptocurrencies int   `json:"active_cryptocurrencies"`
	Markets              int     `json:"markets"`
	MarketCapChange24h   float64 `json:"market_cap_change_24h"`
	LastUpdated          time.Time `json:"last_updated"`
}

// TrendingCoin 表示热门加密货币
type TrendingCoin struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	CoinID        string `json:"coin_id" gorm:"index;not null"`
	Symbol        string `json:"symbol" gorm:"not null"`
	Name          string `json:"name" gorm:"not null"`
	Rank          int    `json:"rank"`
	SearchVolume  int    `json:"search_volume"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// CoinInfo 表示加密货币的基本信息
type CoinInfo struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	CoinID      string `json:"coin_id" gorm:"uniqueIndex;not null"`
	Symbol      string `json:"symbol" gorm:"not null"`
	Name        string `json:"name" gorm:"not null"`
	Description string `json:"description" gorm:"type:text"`
	Website     string `json:"website"`
	Explorer    string `json:"explorer"`
	SourceCode  string `json:"source_code"`
	Whitepaper  string `json:"whitepaper"`
	ImageURL    string `json:"image_url"`
	IsActive    bool   `json:"is_active" gorm:"default:true"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// TableName 指定MarketData表名
func (MarketData) TableName() string {
	return "market_data"
}

// TableName 指定HistoricalPrice表名
func (HistoricalPrice) TableName() string {
	return "historical_prices"
}

// TableName 指定PriceAlert表名
func (PriceAlert) TableName() string {
	return "price_alerts"
}

// TableName 指定Watchlist表名
func (Watchlist) TableName() string {
	return "watchlists"
}

// TableName 指定TrendingCoin表名
func (TrendingCoin) TableName() string {
	return "trending_coins"
}

// TableName 指定CoinInfo表名
func (CoinInfo) TableName() string {
	return "coin_info"
}
