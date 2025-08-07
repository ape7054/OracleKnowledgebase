package api

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"market-pulse/backend/internal/database"
	"market-pulse/backend/internal/models"
	"market-pulse/backend/internal/services"

	"math"
	"math/rand"

	"github.com/gin-gonic/gin"
)

type MarketHandler struct{}

// NewMarketHandler creates a new MarketHandler
func NewMarketHandler() *MarketHandler {
	return &MarketHandler{}
}

// RegisterRoutes registers the market data routes
func (h *MarketHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/all", GetAllMarketData)
	router.GET("/data", GetMarketData)
	router.GET("/coins", GetCoinsData)
	router.GET("/coins/:id/ohlc", GetOhlcData)
}

// createHTTPClient creates a HTTP client with relaxed TLS settings
func createHTTPClient() *http.Client {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{
			InsecureSkipVerify: true, // 跳过证书验证
		},
	}
	return &http.Client{
		Transport: tr,
		Timeout:   30 * time.Second, // 增加超时时间到30秒以适应CoinGecko API
	}
}

// GetAllMarketData fetches all market data.
func GetAllMarketData(c *gin.Context) {
	var results []models.MarketData
	if err := database.DB.Find(&results).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch market data"})
		return
	}
	c.JSON(http.StatusOK, results)
}

// GetMarketData fetches market data from external APIs with mock fallback
func GetMarketData(c *gin.Context) {
	limit := c.DefaultQuery("limit", "20")

	log.Printf("🚀 尝试获取真实市场数据 (limit: %s)", limit)

	// 多次重试获取真实数据
	var data []map[string]interface{}
	var err error

	for retry := 0; retry < 2; retry++ { // 减少重试次数
		if retry > 0 {
			log.Printf("🔄 第 %d 次重试获取真实数据", retry+1)
			time.Sleep(time.Duration(retry) * 2 * time.Second)
		}

		data, err = fetchRealMarketData(limit)
		if err == nil {
			log.Printf("✅ 成功获取%d条真实市场数据", len(data))
			c.JSON(http.StatusOK, gin.H{
				"success": true,
				"data":    data,
				"source":  "external_api",
			})
			return
		}
		log.Printf("❌ 第 %d 次尝试失败: %v", retry+1, err)
	}

	// 所有重试都失败，使用Mock数据
	log.Printf("❌ 网络环境限制，无法连接外部API，使用Mock数据")
	mockData := generateRealtimeMarketData(limit)
	c.JSON(http.StatusOK, gin.H{
		"success":       true,
		"data":          mockData,
		"source":        "mock_data",
		"message":       "由于网络环境限制，当前使用高质量模拟数据",
		"note":          "模拟数据包含真实的价格波动，可用于开发和测试",
		"network_issue": true,
	})
}

// fetchRealMarketData 仅尝试获取真实的外部API数据
func fetchRealMarketData(limit string) ([]map[string]interface{}, error) {
	// 尝试多个真实数据源
	dataSources := []func(string) ([]map[string]interface{}, error){
		fetchFromCoinGecko,
		fetchFromBinance,
		fetchFromKraken,
	}

	for i, fetchFunc := range dataSources {
		log.Printf("🔄 尝试数据源 %d/%d", i+1, len(dataSources))
		data, err := fetchFunc(limit)
		if err == nil {
			return data, nil
		}
		log.Printf("❌ 数据源 %d 失败: %v", i+1, err)
	}

	return nil, fmt.Errorf("所有真实数据源都无法访问，可能是网络连接问题")
}

// fetchFromCoinGecko 从CoinGecko API获取数据
func fetchFromCoinGecko(limit string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%s&page=1&sparkline=false&price_change_percentage=24h", limit)

	client := createHTTPClient()

	// 创建请求并添加HTTP头部
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("创建请求失败: %v", err)
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
	req.Header.Set("Accept", "application/json")

	log.Printf("🔄 尝试CoinGecko API")
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("API调用失败: %v", err)
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API返回状态码: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取响应失败: %v", err)
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("解析JSON失败: %v", err)
	}

	return data, nil
}

// fetchFromBinance 从Binance API获取数据
func fetchFromBinance(limit string) ([]map[string]interface{}, error) {
	url := "https://api.binance.com/api/v3/ticker/24hr"

	client := createHTTPClient()

	log.Printf("🔄 尝试Binance API")
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("Binance API连接失败: %v", err)
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Binance API返回状态码: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取Binance响应失败: %v", err)
	}

	// Binance数据转换逻辑...
	var binanceData []map[string]interface{}
	if err := json.Unmarshal(body, &binanceData); err != nil {
		return nil, fmt.Errorf("解析Binance JSON失败: %v", err)
	}

	// 转换为统一格式
	var result []map[string]interface{}
	count := 0
	limitInt, _ := strconv.Atoi(limit)
	if limitInt <= 0 {
		limitInt = 20
	}

	for _, item := range binanceData {
		if count >= limitInt {
			break
		}

		symbol, ok := item["symbol"].(string)
		if !ok {
			continue
		}

		// 只处理主要加密货币对
		if isMainCryptoPair(symbol) {
			cryptoName := getCryptoName(symbol)
			if cryptoName == "" {
				continue
			}

			priceStr, _ := item["lastPrice"].(string)
			price, _ := strconv.ParseFloat(priceStr, 64)

			changeStr, _ := item["priceChangePercent"].(string)
			changePercent, _ := strconv.ParseFloat(changeStr, 64)

			volumeStr, _ := item["volume"].(string)
			volume, _ := strconv.ParseFloat(volumeStr, 64)

			result = append(result, map[string]interface{}{
				"id":                          strings.ToLower(cryptoName),
				"symbol":                      strings.ToLower(strings.Replace(symbol, "USDT", "", 1)),
				"name":                        cryptoName,
				"current_price":               price,
				"price_change_percentage_24h": changePercent,
				"total_volume":                volume,
				"market_cap":                  price * volume * 1000, // 估算
				"market_cap_rank":             count + 1,
			})
			count++
		}
	}

	if len(result) == 0 {
		return nil, fmt.Errorf("未找到有效的Binance数据")
	}

	return result, nil
}

// fetchFromKraken 从Kraken API获取数据
func fetchFromKraken(limit string) ([]map[string]interface{}, error) {
	url := "https://api.kraken.com/0/public/Ticker?pair=BTCUSD,ETHUSD,ADAUSD"

	client := createHTTPClient()

	log.Printf("🔄 尝试Kraken API")
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("Kraken API连接失败: %v", err)
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Kraken API返回状态码: %d", resp.StatusCode)
	}

	// Kraken数据处理逻辑...
	return nil, fmt.Errorf("Kraken API解析待实现")
}

// 辅助函数
func isMainCryptoPair(symbol string) bool {
	mainPairs := []string{
		"BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT",
		"USDCUSDT", "STETHUSDT", "TRXUSDT", "AVAXUSDT", "LINKUSDT", "MATICUSDT",
		"DOTUSDT", "LTCUSDT", "ICPUSDT", "UNIUSDT", "ETCUSDT", "XLMUSDT", "FILUSDT",
		"ATOMUSDT", "VETUSDT", "NEARUSDT", "APTUSDT", "OPUSDT", "ARBUSDT", "INJUSDT",
		"MKRUSDT", "GRTUSDT", "FTMUSDT", "AAVEUSDT", "ALGOUSDT", "FLOWUSDT", "MANAUSDT",
		"SANDUSDT", "AXSUSDT", "THETAUSDT", "ROSEUSDT", "EOSUSDT", "ZILUSDT",
	}
	for _, pair := range mainPairs {
		if symbol == pair {
			return true
		}
	}
	return false
}

func getCryptoName(symbol string) string {
	names := map[string]string{
		"BTCUSDT":   "Bitcoin",
		"ETHUSDT":   "Ethereum",
		"BNBUSDT":   "BNB",
		"ADAUSDT":   "Cardano",
		"SOLUSDT":   "Solana",
		"XRPUSDT":   "XRP",
		"DOGEUSDT":  "Dogecoin",
		"USDCUSDT":  "USD Coin",
		"STETHUSDT": "Lido Staked Ether",
		"TRXUSDT":   "TRON",
		"AVAXUSDT":  "Avalanche",
		"LINKUSDT":  "Chainlink",
		"MATICUSDT": "Polygon",
		"DOTUSDT":   "Polkadot",
		"LTCUSDT":   "Litecoin",
		"ICPUSDT":   "Internet Computer",
		"UNIUSDT":   "Uniswap",
		"ETCUSDT":   "Ethereum Classic",
		"XLMUSDT":   "Stellar",
		"FILUSDT":   "Filecoin",
		"ATOMUSDT":  "Cosmos",
		"VETUSDT":   "VeChain",
		"NEARUSDT":  "NEAR Protocol",
		"APTUSDT":   "Aptos",
		"OPUSDT":    "Optimism",
		"ARBUSDT":   "Arbitrum",
		"INJUSDT":   "Injective",
		"MKRUSDT":   "Maker",
		"GRTUSDT":   "The Graph",
		"FTMUSDT":   "Fantom",
		"AAVEUSDT":  "Aave",
		"ALGOUSDT":  "Algorand",
		"FLOWUSDT":  "Flow",
		"MANAUSDT":  "Decentraland",
		"SANDUSDT":  "The Sandbox",
		"AXSUSDT":   "Axie Infinity",
		"THETAUSDT": "Theta Network",
		"ROSEUSDT":  "Oasis Network",
		"EOSUSDT":   "EOS",
		"ZILUSDT":   "Zilliqa",
	}
	if name, exists := names[symbol]; exists {
		return name
	}
	return strings.TrimSuffix(symbol, "USDT")
}

// GetCoinsData fetches specific coins data from CoinGecko API
func GetCoinsData(c *gin.Context) {
	ids := c.Query("ids")
	sparkline := c.DefaultQuery("sparkline", "false")

	if ids == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Missing 'ids' parameter",
		})
		return
	}

	// 调用真实的CoinGecko API
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%s&sparkline=%s&price_change_percentage=24h", ids, sparkline)

	client := createHTTPClient()

	// 添加重试机制
	var resp *http.Response
	var err error
	maxRetries := 3

	for i := 0; i < maxRetries; i++ {
		resp, err = client.Get(url)
		if err == nil {
			break
		}
		if i < maxRetries-1 {
			time.Sleep(time.Duration(i+1) * time.Second) // 递增延迟
		}
	}

	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "CoinGecko API temporarily unavailable",
			"message": "请稍后重试",
		})
		return
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "Failed to read API response",
			"message": "请稍后重试",
		})
		return
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "Failed to parse API response",
			"message": "请稍后重试",
		})
		return
	}

	// 返回前端期望的格式
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

// GetOhlcData fetches OHLC data for a specific coin from CoinGecko API
func GetOhlcData(c *gin.Context) {
	coinId := c.Param("id")
	vsCurrency := c.DefaultQuery("vs_currency", "usd")
	days := c.DefaultQuery("days", "7")

	data, err := services.GetCoinOhlcData(coinId, vsCurrency, days)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
			"data":    nil,
			"error":   err.Error(),
			"message": "使用Mock数据替代",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

// RegisterHealthCheck registers the health check route.
func RegisterHealthCheck(router *gin.RouterGroup) {
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "UP"})
	})
}

// generateRealtimeMarketData 生成实时感的市场数据作为fallback
func generateRealtimeMarketData(limit string) []map[string]interface{} {
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 20
	}

	log.Printf("🚀 生成实时市场数据 (limit: %d)", limitInt)

	// 主要加密货币的基础数据
	cryptos := []map[string]interface{}{
		{"id": "bitcoin", "symbol": "btc", "name": "Bitcoin", "basePrice": 45000.0},
		{"id": "ethereum", "symbol": "eth", "name": "Ethereum", "basePrice": 3200.0},
		{"id": "binancecoin", "symbol": "bnb", "name": "BNB", "basePrice": 310.0},
		{"id": "cardano", "symbol": "ada", "name": "Cardano", "basePrice": 0.45},
		{"id": "solana", "symbol": "sol", "name": "Solana", "basePrice": 98.0},
		{"id": "ripple", "symbol": "xrp", "name": "XRP", "basePrice": 0.58},
		{"id": "polkadot", "symbol": "dot", "name": "Polkadot", "basePrice": 7.2},
		{"id": "dogecoin", "symbol": "doge", "name": "Dogecoin", "basePrice": 0.08},
		{"id": "avalanche-2", "symbol": "avax", "name": "Avalanche", "basePrice": 35.0},
		{"id": "chainlink", "symbol": "link", "name": "Chainlink", "basePrice": 14.5},
		{"id": "polygon", "symbol": "matic", "name": "Polygon", "basePrice": 0.92},
		{"id": "litecoin", "symbol": "ltc", "name": "Litecoin", "basePrice": 72.0},
		{"id": "uniswap", "symbol": "uni", "name": "Uniswap", "basePrice": 6.8},
		{"id": "bitcoin-cash", "symbol": "bch", "name": "Bitcoin Cash", "basePrice": 250.0},
		{"id": "stellar", "symbol": "xlm", "name": "Stellar", "basePrice": 0.12},
		{"id": "filecoin", "symbol": "fil", "name": "Filecoin", "basePrice": 5.4},
		{"id": "tron", "symbol": "trx", "name": "TRON", "basePrice": 0.105},
		{"id": "ethereum-classic", "symbol": "etc", "name": "Ethereum Classic", "basePrice": 21.0},
		{"id": "cosmos", "symbol": "atom", "name": "Cosmos", "basePrice": 10.2},
		{"id": "algorand", "symbol": "algo", "name": "Algorand", "basePrice": 0.18},
		{"id": "vechain", "symbol": "vet", "name": "VeChain", "basePrice": 0.032},
		{"id": "internet-computer", "symbol": "icp", "name": "Internet Computer", "basePrice": 4.8},
		{"id": "theta-token", "symbol": "theta", "name": "Theta Network", "basePrice": 1.2},
		{"id": "eos", "symbol": "eos", "name": "EOS", "basePrice": 0.95},
		{"id": "aave", "symbol": "aave", "name": "Aave", "basePrice": 95.0},
		{"id": "tezos", "symbol": "xtz", "name": "Tezos", "basePrice": 0.88},
		{"id": "monero", "symbol": "xmr", "name": "Monero", "basePrice": 158.0},
		{"id": "neo", "symbol": "neo", "name": "Neo", "basePrice": 12.5},
		{"id": "pancakeswap-token", "symbol": "cake", "name": "PancakeSwap", "basePrice": 2.1},
		{"id": "iota", "symbol": "miota", "name": "IOTA", "basePrice": 0.23},
		{"id": "the-sandbox", "symbol": "sand", "name": "The Sandbox", "basePrice": 0.45},
		{"id": "decentraland", "symbol": "mana", "name": "Decentraland", "basePrice": 0.38},
		{"id": "shiba-inu", "symbol": "shib", "name": "Shiba Inu", "basePrice": 0.0000095},
		{"id": "axie-infinity", "symbol": "axs", "name": "Axie Infinity", "basePrice": 6.2},
		{"id": "maker", "symbol": "mkr", "name": "Maker", "basePrice": 1580.0},
		{"id": "compound", "symbol": "comp", "name": "Compound", "basePrice": 54.0},
		{"id": "yearn-finance", "symbol": "yfi", "name": "yearn.finance", "basePrice": 7200.0},
		{"id": "sushiswap", "symbol": "sushi", "name": "SushiSwap", "basePrice": 1.1},
		{"id": "1inch", "symbol": "1inch", "name": "1inch Network", "basePrice": 0.42},
		{"id": "curve-dao-token", "symbol": "crv", "name": "Curve DAO Token", "basePrice": 0.38},
	}

	if limitInt > len(cryptos) {
		limitInt = len(cryptos)
	}

	var result []map[string]interface{}
	now := time.Now()

	for i := 0; i < limitInt; i++ {
		crypto := cryptos[i]
		basePrice := crypto["basePrice"].(float64)

		// 生成真实感的价格波动 (-8% 到 +12%)
		priceVariation := (rand.Float64()*0.20 - 0.08) // -8% to +12%
		currentPrice := basePrice * (1 + priceVariation)

		// 生成24小时价格变化
		priceChange24h := (rand.Float64()*0.15 - 0.075) // -7.5% to +7.5%
		priceChangePercent24h := priceChange24h * 100

		// 生成市值
		marketCap := currentPrice * float64(21000000-i*500000) // 递减供应量

		// 生成24小时交易量
		volume24h := marketCap * (0.05 + rand.Float64()*0.15) // 5%-20% of market cap

		// 生成sparkline数据 (简化版本)
		sparkline := make([]float64, 24)
		for j := 0; j < 24; j++ {
			sparkline[j] = currentPrice * (0.95 + rand.Float64()*0.10)
		}

		item := map[string]interface{}{
			"id":                               crypto["id"],
			"symbol":                           crypto["symbol"],
			"name":                             crypto["name"],
			"image":                            fmt.Sprintf("https://assets.coingecko.com/coins/images/%d/large/%s.png", i+1, crypto["symbol"]),
			"current_price":                    math.Round(currentPrice*100) / 100,
			"market_cap":                       math.Round(marketCap),
			"market_cap_rank":                  i + 1,
			"fully_diluted_valuation":          math.Round(marketCap * 1.1),
			"total_volume":                     math.Round(volume24h),
			"high_24h":                         math.Round(currentPrice*1.08*100) / 100,
			"low_24h":                          math.Round(currentPrice*0.94*100) / 100,
			"price_change_24h":                 math.Round(currentPrice*priceChange24h*100) / 100,
			"price_change_percentage_24h":      math.Round(priceChangePercent24h*100) / 100,
			"market_cap_change_24h":            math.Round(marketCap * priceChange24h),
			"market_cap_change_percentage_24h": math.Round(priceChangePercent24h*100) / 100,
			"circulating_supply":               float64(21000000 - i*500000),
			"total_supply":                     float64(21000000),
			"max_supply":                       float64(21000000),
			"ath":                              math.Round(currentPrice*2.5*100) / 100,
			"ath_change_percentage":            -45.5 - rand.Float64()*30,
			"ath_date":                         "2021-11-10T14:24:11.849Z",
			"atl":                              math.Round(currentPrice*0.15*100) / 100,
			"atl_change_percentage":            450.8 + rand.Float64()*200,
			"atl_date":                         "2020-03-13T02:24:11.849Z",
			"roi":                              nil,
			"last_updated":                     now.Format(time.RFC3339),
			"sparkline_in_7d": map[string]interface{}{
				"price": sparkline,
			},
		}

		result = append(result, item)
	}

	return result
}
