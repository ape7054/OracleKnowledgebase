# 第一阶段：构建 React 应用
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
# 同样是为了利用 Docker 缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有前端代码
COPY . .

# 执行构建命令，生成静态文件
# 这些文件会被输出到 /app/dist 目录
RUN npm run build

# ---

# 第二阶段：使用 Nginx 托管静态文件
FROM nginx:1.24-alpine

# 将我们自定义的 Nginx 配置文件复制到容器中
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 将第一阶段（build）中 /app/dist 目录下的所有文件
# 复制到 Nginx 的默认网站根目录 /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 80 端口，这是 Nginx 默认监听的端口
EXPOSE 80

# 容器启动时运行的命令，以前台方式启动 Nginx
CMD ["nginx", "-g", "daemon off;"] 