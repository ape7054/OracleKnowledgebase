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

## 📁 完整工具箱结构

```
AI-Protocol-Lab/
├── README.md                    # 本文件
├── docs/                       # 📖 通用AI协作工具文档
│   └── README.md               # 工具使用指南
├── prompts/                    # 🎯 专业Prompt库
│   ├── development_assistant.prompt.md
│   ├── code_reviewer.prompt.md
│   ├── project_progress_manager.prompt.md
│   ├── ... (更多角色)
│   └── zh-CN/                  # 中文版本
├── conversations/              # 💬 AI对话记录 (项目特定)
│   └── YYYY-MM-DD_topic.md
├── scripts/                    # 🔧 工具脚本
│   ├── get-ai-context.sh       # 项目上下文获取
│   └── README.md               # 脚本说明
└── project-docs/               # 📚 项目特定文档
    ├── ai-collaboration/       # AI协作相关文档
    └── development/            # 技术文档
```

**设计理念**:
- 通用工具 (`docs/`, `prompts/`, `scripts/`) 可复制到任何项目。
- 项目内容 (`conversations/`, `project-docs/`) 在每个项目中独立管理。
- 简化结构，避免重复和复杂性。
- 一站式AI协作解决方案。

## 🚀 快速开始

### 🎯 **最简单的使用方法（3步搞定）**

#### **第一步：让AI了解您的项目**
```bash
# 进入你的项目根目录
cd /path/to/your-project

# 运行上下文获取脚本
./AI-Protocol-Lab/scripts/get-ai-context.sh
```
**复制输出内容，粘贴给任何AI助手（ChatGPT、Claude等）。**

#### **第二步：选择AI助手角色**
```bash
# 写代码、调试问题
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md

# 审查代码
cat AI-Protocol-Lab/prompts/code_reviewer.prompt.md

# 管理项目进度
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
```
**复制prompt内容，粘贴给AI助手。**

#### **第三步：开始高效协作**
对AI说："现在请帮我开发XXX功能" 或 "请审查这段代码"。

### 📝 **完整使用示例**

**场景：让AI帮你写代码**
```bash
# 1. 获取项目上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 2. 选择开发助手角色
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md

# 3. 在AI助手中粘贴：
#    - 项目上下文（步骤1的输出）
#    - 开发助手prompt（步骤2的内容）
#    - 然后说："请帮我添加一个新的用户登录功能"
```

**AI就会基于您的项目结构和技术栈，给出具体的代码实现！**

## 📚 详细文档

### 通用AI协作工具文档 (`/docs/`)
- 📋 [工具使用指南](docs/README.md) - AI Protocol Lab完整使用说明

### 项目特定文档 (`/project-docs/`)
这部分内容是每个项目独立的，用于存放该项目的具体文档。
- 🛠️ [开发文档](./project-docs/development/) - 技术架构、API规范等。
- 🤖 [AI协作文档](./project-docs/ai-collaboration/) - 项目状态、上下文指南等。

#### 对话记录统一管理
- 💬 [所有对话记录](./conversations/) - 重要AI对话和项目讨论统一存放于此。

## 💡 常见使用场景

### 🔄 **编辑器切换/对话丢失**
**问题**：从VSCode切换到其他编辑器，或浏览器刷新导致AI对话历史丢失。
**解决**：
```bash
# 1. 重新获取项目上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 2. 重新选择角色
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md

# 3. 复制粘贴给新的AI助手，立即恢复工作状态。
```

### 👥 **新团队成员加入**
**场景**：新同事需要快速了解项目。
**方法**：指导他们查看 `project-docs/` 目录下的文档。
```bash
# 示例：
cat AI-Protocol-Lab/project-docs/development/README.md
cat AI-Protocol-Lab/project-docs/ai-collaboration/AI-CONTEXT-GUIDE.md
```

### 🔍 **代码审查 / 项目管理**
**使用**：
```bash
# 选择对应的角色prompt
cat AI-Protocol-Lab/prompts/code_reviewer.prompt.md
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md

# 复制给AI，然后提交代码或问题进行专业审查或规划。
```

## 🔧 **高级功能**

### **自动化脚本详解**
```bash
# 生成完整项目上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 保存上下文到文件，方便复用
./AI-Protocol-Lab/scripts/get-ai-context.sh > current-context.md
```

### **查看历史对话**
```bash
# 查看所有对话记录的文件列表
ls AI-Protocol-Lab/conversations/

# 查看某次具体的对话
cat AI-Protocol-Lab/conversations/YYYY-MM-DD_topic.md
```

### **复制到新项目**
```bash
# 1. 复制整个工具箱到新项目
cp -r AI-Protocol-Lab /path/to/new-project/

# 2. (可选) 清理当前项目的特定内容
cd /path/to/new-project/AI-Protocol-Lab
rm -rf conversations/* project-docs/*
# 重新创建目录结构
mkdir conversations project-docs
```
**脚本 `scripts/get-ai-context.sh` 是通用的，无需修改。**

## 💡 **最佳实践**

### **日常开发流程**
1. **开始工作前**：运行 `get-ai-context.sh` 获取项目最新状态。
2. **选择角色**：根据任务选择合适的prompt。
3. **开始协作**：将上下文和角色prompt粘贴给AI助手，开始高效工作。

### **对话记录管理**
- 重要AI对话保存到 `conversations/` 目录。
- 推荐命名格式：`YYYY-MM-DD_主题描述.md`。
- 定期整理和归档。

### **文档维护**
- 项目状态变化时，及时更新 `project-docs/` 中的相关文档。
- 保持 `AI-CONTEXT-GUIDE.md` 的时效性，方便快速同步。

---

## �� **核心理念**

**让AI协作像呼吸一样自然**
- 🚀 **3步上手**：获取上下文 → 选择角色 → 开始协作
- 🔄 **无缝切换**：在任何AI助手间保持工作连续性
- 📚 **知识保存**：项目经验和决策过程完整记录
- 🎯 **即插即用**：复制到任何项目立即可用

**记住**：这不只是一个工具箱，而是您在任何项目中的AI协作伙伴！🤖
