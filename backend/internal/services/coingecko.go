package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// CoinGeckoService 处理与CoinGecko API的交互
type CoinGeckoService struct {
	baseURL    string
	httpClient *http.Client
}

// CoinData 表示单个加密货币的数据
type CoinData struct {
	ID                       string  `json:"id"`
	Symbol                   string  `json:"symbol"`
	Name                     string  `json:"name"`
	CurrentPrice             float64 `json:"current_price"`
	MarketCap                float64 `json:"market_cap"`
	MarketCapRank            int     `json:"market_cap_rank"`
	TotalVolume              float64 `json:"total_volume"`
	PriceChange24h           float64 `json:"price_change_24h"`
	PriceChangePercentage24h float64 `json:"price_change_percentage_24h"`
	LastUpdated              string  `json:"last_updated"`
}

// HistoricalPrice 表示历史价格数据点
type HistoricalPrice struct {
	Timestamp int64   `json:"timestamp"`
	Price     float64 `json:"price"`
}

// MarketChart 表示市场图表数据
type MarketChart struct {
	Prices [][]float64 `json:"prices"`
}

// NewCoinGeckoService 创建新的CoinGecko服务实例
func NewCoinGeckoService() *CoinGeckoService {
	return &CoinGeckoService{
		baseURL: "https://api.coingecko.com/api/v3",
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// GetTopCoins 获取市值排名前N的加密货币
func (c *CoinGeckoService) GetTopCoins(limit int) ([]CoinData, error) {
	url := fmt.Sprintf("%s/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%d&page=1&sparkline=false",
		c.baseURL, limit)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data from CoinGecko: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("CoinGecko API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var coins []CoinData
	if err := json.Unmarshal(body, &coins); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w", err)
	}

	return coins, nil
}

// GetCoinByID 根据ID获取特定加密货币的详细信息
func (c *CoinGeckoService) GetCoinByID(coinID string) (*CoinData, error) {
	url := fmt.Sprintf("%s/coins/markets?vs_currency=usd&ids=%s", c.baseURL, coinID)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch coin data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("CoinGecko API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var coins []CoinData
	if err := json.Unmarshal(body, &coins); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w", err)
	}

	if len(coins) == 0 {
		return nil, fmt.Errorf("coin not found: %s", coinID)
	}

	return &coins[0], nil
}

// GetMultipleCoins 获取多个指定加密货币的数据
func (c *CoinGeckoService) GetMultipleCoins(coinIDs []string) ([]CoinData, error) {
	if len(coinIDs) == 0 {
		return []CoinData{}, nil
	}

	idsParam := strings.Join(coinIDs, ",")
	url := fmt.Sprintf("%s/coins/markets?vs_currency=usd&ids=%s", c.baseURL, idsParam)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch coins data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("CoinGecko API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var coins []CoinData
	if err := json.Unmarshal(body, &coins); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w", err)
	}

	return coins, nil
}

// GetHistoricalPrices 获取指定加密货币的历史价格数据
func (c *CoinGeckoService) GetHistoricalPrices(coinID string, days int) ([]HistoricalPrice, error) {
	url := fmt.Sprintf("%s/coins/%s/market_chart?vs_currency=usd&days=%d",
		c.baseURL, coinID, days)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch historical data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("CoinGecko API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var chart MarketChart
	if err := json.Unmarshal(body, &chart); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w", err)
	}

	// 转换数据格式
	var prices []HistoricalPrice
	for _, priceData := range chart.Prices {
		if len(priceData) >= 2 {
			prices = append(prices, HistoricalPrice{
				Timestamp: int64(priceData[0]),
				Price:     priceData[1],
			})
		}
	}

	return prices, nil
}

// GetSupportedCoins 获取支持的加密货币列表
func (c *CoinGeckoService) GetSupportedCoins() ([]map[string]interface{}, error) {
	url := fmt.Sprintf("%s/coins/list", c.baseURL)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch supported coins: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("CoinGecko API returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	var coins []map[string]interface{}
	if err := json.Unmarshal(body, &coins); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w", err)
	}

	return coins, nil
}

// Ping 检查CoinGecko API的连接状态
func (c *CoinGeckoService) Ping() error {
	url := fmt.Sprintf("%s/ping", c.baseURL)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return fmt.Errorf("failed to ping CoinGecko API: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("CoinGecko API ping failed with status %d", resp.StatusCode)
	}

	return nil
}
