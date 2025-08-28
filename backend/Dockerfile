# 使用轻量的Alpine镜像
FROM nginx:1.25-alpine

# 设置工作目录
WORKDIR /app

# 复制预构建的二进制文件
COPY learning-stack-backend ./learning-stack-backend

# 复制配置文件（如果存在）
COPY .env* ./ || true

# 设置执行权限
RUN chmod +x learning-stack-backend

# 暴露端口
EXPOSE 8080

# 运行应用
CMD ["./learning-stack-backend"] 