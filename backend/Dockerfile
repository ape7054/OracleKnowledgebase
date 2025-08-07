# 多阶段构建：构建阶段
FROM golang:1.22-alpine AS builder

# 安装git和ca-certificates (Alpine)
RUN apk --no-cache add git ca-certificates tzdata

# 设置工作目录
WORKDIR /app

# 复制go mod文件
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 复制源代码
COPY . .

# 构建应用
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o market-pulse-backend ./cmd/market-pulse-backend

# 运行阶段
FROM alpine:3.18

# 安装必要的依赖
RUN apk --no-cache add ca-certificates tzdata

# 设置工作目录
WORKDIR /app

# 从构建阶段复制二进制文件
COPY --from=builder /app/market-pulse-backend .

# 复制可能需要的配置文件
COPY --from=builder /app/.env* ./

# 设置执行权限
RUN chmod +x market-pulse-backend

# 暴露端口
EXPOSE 8080

# 运行应用
CMD ["./market-pulse-backend"] 