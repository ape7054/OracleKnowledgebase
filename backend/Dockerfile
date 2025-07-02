# 第一阶段：构建
# 使用官方的 Go 语言镜像作为构建环境。我们选择 alpine 版本的镜像，因为它更小。
FROM golang:1.22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制所有源代码到工作目录
COPY . .

# 编译 Go 应用。
# -o 指定输出文件名为 market-pulse-backend
# CGO_ENABLED=0 是为了进行静态编译，确保可执行文件不依赖 C 库，使其在 alpine 这种精简环境下也能运行
RUN CGO_ENABLED=0 go build -o /app/market-pulse-backend .

# ---

# 第二阶段：运行
# 使用一个非常小的基础镜像
FROM alpine:3.18

# 设置工作目录
WORKDIR /app

# 从构建阶段（builder）复制编译好的可执行文件到当前阶段
COPY --from=builder /app/market-pulse-backend .

# 暴露 8080 端口，这是我们的 Gin 服务器监听的端口
EXPOSE 8080

# 容器启动时运行的命令
# 启动我们的后端服务
CMD ["/app/market-pulse-backend"] 