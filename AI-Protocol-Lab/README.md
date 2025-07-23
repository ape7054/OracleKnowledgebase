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
│   ├── tech_english_tutor.prompt.md
│   ├── web3_mentor.prompt.md
│   ├── documentation_generator.prompt.md
│   └── zh-CN/                  # 中文版本
├── conversations/              # 💬 AI对话记录
│   └── 2025-07-21_market-pulse-development-summary.md
├── scripts/                    # 🔧 工具脚本
│   ├── get-ai-context.sh       # 项目上下文获取
│   └── README.md               # 脚本说明
└── project-docs/               # 📚 项目特定文档
    ├── ai-collaboration/       # AI协作相关文档
    └── development/            # 技术文档
```

**设计理念**:
- 通用工具 (`docs/`, `prompts/`, `scripts/`) 可复制到任何项目
- 项目内容 (`conversations/`, `project-docs/`) 统一管理
- 简化结构，避免重复和复杂性
- 一站式AI协作解决方案

## 🚀 快速开始

### 🎯 **最简单的使用方法（3步搞定）**

#### **第一步：让AI了解您的项目**
```bash
cd /www/wwwroot/market-pulse
./AI-Protocol-Lab/scripts/get-ai-context.sh
```
**复制输出内容，粘贴给任何AI助手（ChatGPT、Claude等）**

#### **第二步：选择AI助手角色**
```bash
# 写代码、调试问题
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md

# 审查代码
cat AI-Protocol-Lab/prompts/code_reviewer.prompt.md

# 管理项目进度
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
```
**复制prompt内容，粘贴给AI助手**

#### **第三步：开始高效协作**
对AI说："现在请帮我开发XXX功能" 或 "请审查这段代码"

### 📝 **完整使用示例**

**场景：让AI帮您写代码**
```bash
# 1. 获取项目上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 2. 选择开发助手角色
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md

# 3. 在AI助手中粘贴：
#    - 项目上下文（步骤1的输出）
#    - 开发助手prompt（步骤2的内容）
#    - 然后说："请帮我添加一个新的价格图表组件"
```

**AI就会基于您的项目结构和技术栈，给出具体的代码实现！**

## 📚 详细文档

### 通用AI协作工具文档 (`/docs/`)
- 📋 [工具使用指南](docs/README.md) - AI Protocol Lab完整使用说明

### 项目特定文档 (`/project-docs/`)

#### AI协作文档
- 🚀 [快速上下文指南](project-docs/ai-collaboration/AI-CONTEXT-GUIDE.md) - 30秒了解项目状态
- 📊 [项目状态报告](project-docs/ai-collaboration/PROJECT-STATUS-2025-07-20.md) - 完整进度跟踪
- 💡 [使用示例](project-docs/ai-collaboration/USAGE-EXAMPLES.md) - 实际应用场景

#### 项目技术文档
- 📖 [文档导航](project-docs/DOCUMENTATION-INDEX.md) - 完整文档索引
- 🛠️ [开发文档](project-docs/development/) - 技术架构、API规范

#### 对话记录统一管理
- 💬 [所有对话记录](conversations/) - AI对话和项目讨论统一存放

## 💡 常见使用场景

### 🔄 **编辑器切换/对话丢失**
**问题**：从VSCode切换到其他编辑器，或浏览器刷新导致AI对话历史丢失
**解决**：
```bash
./AI-Protocol-Lab/scripts/get-ai-context.sh  # 获取项目上下文
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md  # 选择角色
# 复制粘贴给新的AI助手，立即恢复工作状态
```

### 👥 **新团队成员加入**
**场景**：新同事需要快速了解项目
**方法**：
```bash
# 1. 快速了解项目
cat AI-Protocol-Lab/project-docs/ai-collaboration/AI-CONTEXT-GUIDE.md

# 2. 查看项目状态
cat AI-Protocol-Lab/project-docs/ai-collaboration/PROJECT-STATUS-2025-07-20.md

# 3. 搭建开发环境
cat AI-Protocol-Lab/project-docs/development/README-DEV.md
```

### 🔍 **代码审查**
**使用**：
```bash
cat AI-Protocol-Lab/prompts/code_reviewer.prompt.md
# 复制给AI，然后提交代码进行专业审查
```

### 📋 **项目管理**
**跟踪进度**：
```bash
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
# 让AI帮您管理项目进度和任务规划
```

## 🔧 **高级功能**

### **自动化脚本详解**
```bash
# 生成完整项目上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 保存上下文到文件
./AI-Protocol-Lab/scripts/get-ai-context.sh > current-context.md

# 只查看项目结构
./AI-Protocol-Lab/scripts/get-ai-context.sh | grep -A 20 "项目结构"
```

### **查看历史对话**
```bash
# 查看所有对话记录
ls AI-Protocol-Lab/conversations/

# 查看完整开发历程总结
cat AI-Protocol-Lab/conversations/2025-07-21_market-pulse-development-summary.md
```

### **复制到新项目**
```bash
# 复制整个工具箱到新项目
cp -r AI-Protocol-Lab /path/to/new-project/

# 清理项目特定内容
cd /path/to/new-project/AI-Protocol-Lab
rm -rf conversations/* project-docs/*

# 更新脚本中的项目信息
vim scripts/get-ai-context.sh
```

## 💡 **最佳实践**

### **日常开发流程**
1. **开始工作前**：运行 `get-ai-context.sh` 获取项目状态
2. **选择角色**：根据任务选择合适的prompt
3. **开始协作**：复制粘贴给AI助手，开始高效工作

### **对话记录管理**
- 重要AI对话保存到 `conversations/` 目录
- 命名格式：`YYYY-MM-DD_主题描述.md`
- 定期整理和归档

### **文档维护**
- 项目状态变化时更新相关文档
- 保持快速上下文指南的时效性

## 📈 **更新日志**

### 2025-07-21 (晚)
- ✅ 趋势图视觉效果大幅优化：波动幅度增强3-4倍，颜色饱和度大幅提升
- ✅ 移除Dashboard卡片出场动画，提升用户体验和响应速度
- ✅ 完善用户疑问解答：趋势指示器功能说明
- ✅ 新增趋势图优化开发记录文档

### 2025-07-21 (下午)
- ✅ Account页面四大功能完整实现：趋势图+搜索+排序+响应式
- ✅ 简化使用说明，3步即可上手
- ✅ 添加具体使用示例和场景
- ✅ 优化文档结构和对话记录管理

### 2025-07-20
- ✅ Dashboard专业级升级完成
- ✅ 文档结构规范化优化
- ✅ 统一命名规范，消除重复目录

---

## 🎯 **核心理念**

**让AI协作像呼吸一样自然**
- 🚀 **3步上手**：获取上下文 → 选择角色 → 开始协作
- 🔄 **无缝切换**：在任何AI助手间保持工作连续性
- 📚 **知识保存**：项目经验和决策过程完整记录
- 🎯 **即插即用**：复制到任何项目立即可用

**记住**：这不只是一个工具箱，而是您的AI协作伙伴！🤖
