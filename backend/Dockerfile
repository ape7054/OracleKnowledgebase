# 第一阶段：构建
# 使用官方的 Go 语言镜像作为构建环境。我们选择 alpine 版本的镜像，因为它更小。
FROM golang:1.21-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 go.mod 和 go.sum 文件，并下载依赖
# 这一步骤利用 Docker 的缓存机制，如果这些文件没有变化，就不会重新下载依赖
COPY go.mod go.sum ./
RUN go mod download

# 复制源代码
COPY . .

# 构建应用
# CGO_ENABLED=0 禁用 CGO，使得生成的二进制文件是静态链接的，不依赖于 C 库
# 这样可以在 alpine 这样的精简镜像中运行
RUN CGO_ENABLED=0 go build -o /app/market-pulse-backend ./cmd/market-pulse-backend

# 第二阶段：运行
# 使用 alpine 作为最终的基础镜像，它非常小，只有几 MB
FROM alpine:3.18

# 安装 wget 用于健康检查
RUN apk --no-cache add wget

# 设置工作目录
WORKDIR /app

# 从构建阶段复制编译好的二进制文件
COPY --from=builder /app/market-pulse-backend .

# 运行应用
CMD ["./market-pulse-backend"] 