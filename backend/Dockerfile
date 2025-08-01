# 使用一个极简的基础镜像
FROM alpine:3.18

# 设置工作目录
WORKDIR /app

# 从构建上下文复制我们已经在本地编译好的二进制文件
COPY market-pulse-backend-linux .

# 暴露端口
EXPOSE 8080

# 运行应用
CMD ["./market-pulse-backend-linux"] 