# 🔧 AI Protocol Lab - 工具脚本

这个目录包含用于AI协作的实用工具脚本，帮助自动化项目上下文获取和管理。

## 📁 脚本列表

### `get-ai-context.sh`
**项目上下文获取脚本**

#### 功能
- 自动收集项目的关键信息
- 生成AI助手可用的上下文摘要
- 包含项目结构、技术栈、最新状态等

#### 使用方法
```bash
# 在项目根目录执行
./Oracle/scripts/get-ai-context.sh

# 或者指定输出文件
./Oracle/scripts/get-ai-context.sh > project-context.md
```

#### 输出内容
- 项目基本信息
- 技术栈和依赖
- 最新的git提交信息
- 项目结构概览
- 重要配置文件摘要

## 🚀 快速使用

### 为新AI助手准备上下文
```bash
# 1. 生成最新的项目上下文
cd /www/wwwroot/market-pulse
./Oracle/scripts/get-ai-context.sh

# 2. 将输出内容提供给新的AI助手
# 3. 结合AI-CONTEXT-GUIDE.md使用
```

## 📋 脚本开发指南

### 添加新脚本
1. 在此目录创建新的脚本文件
2. 添加可执行权限: `chmod +x script-name.sh`
3. 在本README中添加说明
4. 测试脚本功能

### 脚本规范
- 使用bash编写
- 包含详细的注释
- 处理错误情况
- 提供使用帮助

---

_这些脚本旨在简化AI协作流程，提高开发效率。_
