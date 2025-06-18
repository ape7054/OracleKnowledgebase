# 交易面板 (Trading Dashboard)

这是一个使用 React 和 Material UI 构建的加密货币交易面板应用。该项目旨在帮助初学者学习 React 开发，并为 Web3 前端、加密货币钱包和行情页面开发打下基础。

## 功能特点

- **市场概览**: 显示总市值、BTC 和 ETH 占比、24 小时交易量等市场统计数据
- **价格图表**: 使用 Recharts 库展示多种加密货币的价格走势
- **热门币种**: 展示热门加密货币的价格和涨跌幅
- **交易功能**: 支持限价单、市价单和止损单等多种订单类型
- **订单簿**: 实时显示买卖盘深度
- **资产管理**: 查看用户资产余额和估值
- **交易历史**: 记录用户的交易、存款和提款历史
- **响应式设计**: 适配不同尺寸的屏幕

## 技术栈

- **React**: 用于构建用户界面的 JavaScript 库
- **Material UI**: 提供现代化、响应式的 UI 组件
- **Recharts**: 基于 React 的图表库
- **Axios**: 用于发送 HTTP 请求
- **Vite**: 现代前端构建工具

## 开始使用

### 前提条件

- Node.js (推荐 v16+)
- npm 或 yarn

### 安装

1. 克隆仓库:
   ```bash
   git clone https://github.com/yourusername/trading-dashboard.git
   cd trading-dashboard
   ```

2. 安装依赖:
   ```bash
   npm install
   # 或
   yarn
   ```

3. 启动开发服务器:
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

4. 打开浏览器访问 http://localhost:5173

## 项目结构

```
trading-dashboard/
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── api/             # API 服务和请求
│   ├── components/      # 可复用组件
│   ├── pages/           # 页面组件
│   │   ├── Dashboard.jsx   # 仪表盘页面
│   │   ├── Trade.jsx       # 交易页面
│   │   └── Account.jsx     # 账户页面
│   ├── App.jsx          # 应用入口组件
│   ├── main.jsx         # 应用入口点
│   └── index.css        # 全局样式
├── package.json         # 项目依赖和脚本
└── vite.config.js       # Vite 配置
```

## 学习要点

通过本项目，你可以学习到:

1. React 组件和 Hooks 的使用
2. Material UI 组件库的应用
3. 使用 Recharts 创建交互式图表
4. 状态管理和数据流
5. 响应式布局设计
6. API 调用和数据处理
7. 表单处理和验证

## 进一步改进

- 添加真实的 API 集成
- 实现用户认证
- 添加更多的图表类型
- 实现深色/浅色主题切换
- 添加更多的交易功能，如杠杆交易
- 实现实时数据更新
- 添加本地化支持

## 许可证

MIT
