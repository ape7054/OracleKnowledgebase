# 使用本地可用的nginx:1.25-alpine镜像作为基础
FROM nginx:1.25-alpine

# 创建应用目录
WORKDIR /app

# 从本地复制预构建的二进制文件
COPY market-pulse-backend ./market-pulse-backend

# 复制配置文件
COPY .env* ./

# 设置执行权限
RUN chmod +x market-pulse-backend

# 调试：列出文件
RUN ls -la ./

# 暴露端口
EXPOSE 8080

# 运行应用 (使用完整路径)
CMD ["/app/market-pulse-backend"] 