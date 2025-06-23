package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	// 为 /api/health 路由定义一个处理器函数
	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		// 设置响应头，告诉客户端我们返回的是 JSON
		w.Header().Set("Content-Type", "application/json")
		
		// 创建一个 map 用于生成 JSON 响应
		response := map[string]string{
			"status": "ok",
			"service": "market-pulse-backend",
		}
		
		// 将 map 编码为 JSON 并写入响应
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("Error encoding response: %v", err)
		}
	})

	// 启动 Web 服务器，监听在 8080 端口
	log.Println("Backend server starting on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
