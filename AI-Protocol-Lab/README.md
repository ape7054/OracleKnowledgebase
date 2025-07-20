# 🤖 AI Protocol Lab

**通用AI助手工具箱** - 提升开发效率的专业化工具集合

## 📋 概述

AI Protocol Lab是一个完整的AI助手协作工具箱，包含prompt库、对话记录、项目文档和实用脚本。既可以作为通用工具在不同项目间复用，也能管理特定项目的所有AI协作资源。

### 🎯 核心价值

- **🔄 无缝切换**: 在不同编辑器、AI助手之间保持上下文连续性
- **📚 知识保存**: 自动化项目进度跟踪和技术决策记录
- **⚡ 效率提升**: 专业化prompt提供针对性的开发支持
- **🔧 即插即用**: 复制到任何项目即可使用
- **📖 统一管理**: 集成项目文档，一站式AI协作解决方案

## 📁 规范化目录结构

```
AI-Protocol-Lab/
├── README.md                    # 本文件
├── docs/                       # 📖 AI协作工具文档
│   ├── AI-CONTEXT-GUIDE.md     # 快速上下文指南
│   ├── PROJECT-STATUS-2025-07-20.md # 项目状态报告
│   ├── README-PROGRESS-MANAGER.md   # 进度管理指南
│   └── USAGE-EXAMPLES.md       # 使用示例
├── prompts/                    # 🎯 专业Prompt库
│   ├── development_assistant.prompt.md
│   ├── code_reviewer.prompt.md
│   ├── project_progress_manager.prompt.md
│   ├── tech_english_tutor.prompt.md
│   ├── web3_mentor.prompt.md
│   ├── documentation_generator.prompt.md
│   └── zh-CN/                  # 中文版本
├── conversations/              # 💬 AI对话记录
│   ├── market-pulse-dashboard-upgrade_2025-07-20.md
│   └── web3_fullstack_conversation_2025-07-18.md
├── scripts/                    # 🔧 工具脚本
│   ├── get-ai-context.sh       # 项目上下文获取
│   └── README.md               # 脚本说明
└── project/                    # 📚 项目特定文档
    ├── DOCUMENTATION-INDEX.md   # 文档导航
    ├── development/            # 开发文档
    ├── conversations/          # 项目技术讨论
    └── guides/                # 用户指南
```

## 🚀 快速开始

### 使用专业Prompt
```bash
# 选择合适的prompt
cat prompts/development_assistant.prompt.md
# 复制内容到新的AI对话开始处
```

### 获取项目上下文
```bash
# 自动生成项目上下文
./scripts/get-ai-context.sh
```

### 查看对话历史
```bash
# 了解最新的开发进展
cat conversations/market-pulse-dashboard-upgrade_2025-07-20.md
```

## 📚 详细文档

### AI协作工具文档 (`/docs/`)
- 🚀 [快速上下文指南](docs/AI-CONTEXT-GUIDE.md) - 30秒了解项目状态
- 📊 [项目状态报告](docs/PROJECT-STATUS-2025-07-20.md) - 完整进度跟踪
- 📋 [进度管理指南](docs/README-PROGRESS-MANAGER.md) - 项目管理工具
- 💡 [使用示例](docs/USAGE-EXAMPLES.md) - 实际应用场景

### 项目特定文档 (`/project/`)
- 📖 [文档导航](project/DOCUMENTATION-INDEX.md) - 完整文档索引
- 🛠️ [开发文档](project/development/) - 技术架构、API规范
- 💬 [项目对话](project/conversations/) - 技术讨论记录
- 📚 [用户指南](project/guides/) - 使用说明

## 💡 使用场景

### 🔄 AI助手切换
当需要在不同AI助手间切换时，使用快速上下文指南和专业prompt。

### 📋 项目管理
使用project_progress_manager.prompt.md进行自动化进度跟踪。

### 🎓 学习指导
使用学习类prompt进行技术英语提升和Web3学习。

## 📈 最新更新 (2025-07-20)

- ✅ Dashboard专业级升级完成
- ✅ 图标颜色问题修复
- ✅ 文档结构规范化优化
- ✅ 统一命名规范
- ✅ 消除重复目录

## 🔧 目录规范说明

### **命名规范**
- 所有目录名使用小写，不使用连字符
- 文件名使用大写字母和连字符（如需要）
- 保持一致性和可读性

### **功能分离**
- `conversations/` - 专门存放AI对话记录
- `project/conversations/` - 存放项目技术讨论记录
- 避免功能重复和混淆

### **层次清晰**
- 通用工具在根目录下
- 项目特定内容在project/目录下
- 每个目录职责明确

---

**记住**: AI Protocol Lab专注于提供完整的AI协作解决方案，规范化的结构确保长期可维护性。
