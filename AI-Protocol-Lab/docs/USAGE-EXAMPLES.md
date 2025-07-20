# AI助手使用示例 - MarketPulse项目

## 🎯 使用场景示例

### 场景1: 编辑器切换 / 对话丢失

#### 问题
您从VSCode切换到其他编辑器，或者浏览器刷新导致AI对话历史丢失。

#### 解决方案
```bash
# 1. 快速获取上下文
cd /www/wwwroot/market-pulse
./AI-Protocol-Lab/scripts/get-ai-context.sh

# 2. 复制生成的内容给新的AI助手
# 3. 说明您的需求
```

#### AI对话示例
```
用户: [粘贴上下文内容]

我刚切换了编辑器，需要继续开发MarketPulse项目。现在我想添加用户登录功能，请帮我实现。

AI: 我已经理解了您的MarketPulse项目背景。根据当前82%的完成度和技术栈(React + Go + MySQL)，我来帮您实现用户登录功能...
```

### 场景2: 长时间开发中断

#### 问题
您几天没有开发，忘记了当前的进度和下一步要做什么。

#### 解决方案
```bash
# 1. 查看最新进度
cat docs/development/DEVELOPMENT-ROADMAP.md | grep -A 20 "最新进度更新"

# 2. 查看最近的对话记录
ls docs/conversations/development/ | tail -3

# 3. 获取AI上下文
cat docs/conversations/AI-CONTEXT-GUIDE.md
```

#### AI对话示例
```
用户: [粘贴AI-CONTEXT-GUIDE.md内容]

我几天没有开发了，请帮我回顾一下当前的项目状态，以及下一步应该做什么？

AI: 根据您的项目文档，MarketPulse当前完成度82%，最近完成了Dashboard页面修复和代币图标系统。下一步优先级最高的是用户认证系统开发...
```

### 场景3: 团队成员交接

#### 问题
新的团队成员需要快速了解项目并开始开发。

#### 解决方案
```bash
# 1. 提供完整项目背景
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md

# 2. 提供快速上手指南
cat AI-Protocol-Lab/README-PROGRESS-MANAGER.md

# 3. 查看最近的技术决策
cat docs/conversations/development/2025-01-20-dashboard-fixes-and-ui-improvements.md
```

#### AI对话示例
```
新成员: [粘贴project_progress_manager.prompt.md内容]

我是新加入的开发者，需要了解MarketPulse项目的技术架构和当前状态，请给我一个全面的介绍。

AI: 欢迎加入MarketPulse项目！这是一个82%完成度的加密货币交易平台。让我为您介绍技术架构和当前状态...
```

### 场景4: 特定问题解决

#### 问题
遇到了之前解决过的类似问题，想找到解决方案。

#### 解决方案
```bash
# 1. 搜索历史对话
grep -r "Dashboard" docs/conversations/development/

# 2. 查看具体解决方案
cat docs/conversations/development/2025-01-20-dashboard-fixes-and-ui-improvements.md

# 3. 获取当前上下文
./AI-Protocol-Lab/scripts/get-ai-context.sh
```

#### AI对话示例
```
用户: [粘贴相关历史记录和当前上下文]

我遇到了类似的Dashboard加载问题，但这次是在Trade页面。根据之前的解决方案，请帮我修复这个问题。

AI: 根据您提供的历史解决方案，Dashboard问题主要是缺少loading/error状态处理。让我检查Trade页面的类似问题...
```

## 🔧 快速命令参考

### 获取AI上下文的不同方式

#### 1. 完整自动化脚本
```bash
./AI-Protocol-Lab/scripts/get-ai-context.sh
```
**优点**: 包含实时状态、Git历史、服务状态  
**用途**: 新会话开始时使用

#### 2. 详细项目指南
```bash
cat docs/conversations/AI-CONTEXT-GUIDE.md
```
**优点**: 完整的项目背景和使用技巧  
**用途**: 需要全面了解项目时使用

#### 3. 专业AI Prompt
```bash
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
```
**优点**: 让AI具备项目管理能力  
**用途**: 需要AI帮助管理进度时使用

#### 4. 最新进度快照
```bash
cat docs/development/DEVELOPMENT-ROADMAP.md | tail -50
```
**优点**: 最新的开发状态和计划  
**用途**: 快速了解当前进度时使用

### 常用搜索命令

#### 查找特定问题的解决方案
```bash
# 搜索关键词
grep -r "图标" docs/conversations/
grep -r "Dashboard" docs/conversations/
grep -r "API" docs/conversations/

# 查看最近的对话
ls -lt docs/conversations/development/ | head -5
```

#### 查看技术实现细节
```bash
# 查看API相关代码
find . -name "*.go" -o -name "*.jsx" | xargs grep -l "API"

# 查看最近修改的文件
git log --name-only -5
```

## 📝 AI对话模板

### 模板1: 新功能开发
```
[粘贴AI上下文]

我需要在MarketPulse项目中实现[具体功能]。

技术要求:
- 使用现有的技术栈 (React + Go + MySQL)
- 遵循现有的代码风格和架构
- 需要考虑[特定约束条件]

请提供详细的实现方案和代码示例。
```

### 模板2: 问题修复
```
[粘贴AI上下文]

我在MarketPulse项目中遇到了问题:

问题描述: [详细描述]
错误信息: [如果有的话]
复现步骤: [具体步骤]
期望行为: [应该如何工作]

请帮我诊断和修复这个问题。
```

### 模板3: 代码优化
```
[粘贴AI上下文]

我想优化MarketPulse项目中的[具体模块/功能]。

当前状况: [现在的实现]
优化目标: [想要达到的效果]
性能要求: [如果有的话]

请提供优化建议和实现方案。
```

### 模板4: 进度更新
```
[粘贴project_progress_manager.prompt.md]

我刚完成了[具体功能/修复]，请帮我更新项目进度并保存这次的开发记录。

完成的工作:
- [具体项目1]
- [具体项目2]

遇到的问题和解决方案:
- [问题和解决过程]

下一步计划:
- [下一步要做的事情]
```

## 🎯 成功使用的关键

### 1. **提供充分的上下文**
- 总是包含项目背景信息
- 说明当前的开发状态
- 提及相关的技术约束

### 2. **具体描述需求**
- 避免模糊的描述
- 提供具体的期望结果
- 包含相关的代码片段或错误信息

### 3. **保持文档更新**
- 每次重要开发后更新进度
- 记录重要的技术决策
- 保存有价值的对话内容

### 4. **建立使用习惯**
- 开发前先获取上下文
- 开发后及时更新文档
- 定期回顾和整理记录

---

**记住**: 这些工具的价值在于持续使用。越是经常更新和使用，您的开发效率就越高！
