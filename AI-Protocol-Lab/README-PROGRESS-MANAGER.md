# Project Progress Manager - 使用指南

## 📋 概述

这个AI Prompt系统专门设计用于保存和管理MarketPulse项目的开发进度、技术决策和AI对话记录，确保您可以在任何时候、任何编辑器中无缝继续开发工作。

## 🎯 解决的问题

### 1. **AI对话丢失**
- 编辑器切换导致对话历史消失
- 浏览器刷新丢失上下文
- 长时间开发中断后难以恢复

### 2. **开发进度跟踪**
- 项目完成度难以准确评估
- 技术决策缺乏记录
- 问题解决方案容易遗忘

### 3. **知识传承**
- 团队成员变更时知识断层
- 复杂问题的解决过程未保存
- 最佳实践没有文档化

## 🚀 使用方法

### 方法一：直接使用Prompt文件

1. **复制Prompt内容**
   ```bash
   cat /www/wwwroot/market-pulse/AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
   ```

2. **粘贴给新的AI助手**
   - 将整个prompt内容复制
   - 粘贴到新的AI对话开始处
   - AI将自动理解项目背景和职责

3. **激活进度管理**
   - 说："update progress" 或 "save conversation"
   - AI将自动执行完整的文档化流程

### 方法二：使用简化的上下文指南

1. **快速上下文加载**
   ```bash
   cat /www/wwwroot/market-pulse/docs/conversations/AI-CONTEXT-GUIDE.md
   ```

2. **提供给AI助手**
   - 复制AI-CONTEXT-GUIDE.md的内容
   - 告诉AI："这是我的项目背景，请帮我继续开发"

## 📁 文档结构说明

### 核心文档位置
```
/www/wwwroot/market-pulse/
├── AI-Protocol-Lab/
│   ├── prompts/
│   │   └── project_progress_manager.prompt.md  # 主要Prompt
│   └── README-PROGRESS-MANAGER.md              # 本使用指南
├── docs/
│   ├── development/
│   │   └── DEVELOPMENT-ROADMAP.md              # 开发路线图
│   └── conversations/
│       ├── AI-CONTEXT-GUIDE.md                # AI使用指南
│       └── development/                        # 对话记录
│           └── YYYY-MM-DD-[topic].md
```

### 文档更新流程
1. **开发进度** → `DEVELOPMENT-ROADMAP.md`
2. **对话记录** → `conversations/development/`
3. **AI上下文** → `AI-CONTEXT-GUIDE.md`
4. **Git提交** → 保存所有更改

## 🔧 实际使用场景

### 场景1：切换编辑器
```markdown
# 新编辑器中的操作
1. 打开项目：cd /www/wwwroot/market-pulse
2. 复制上下文：cat docs/conversations/AI-CONTEXT-GUIDE.md
3. 粘贴给AI："这是我的项目背景，我需要继续开发[具体功能]"
4. AI立即理解项目状态，无缝继续工作
```

### 场景2：长时间中断后恢复
```markdown
# 查看最新进度
1. 检查路线图：cat docs/development/DEVELOPMENT-ROADMAP.md
2. 查看最近对话：ls docs/conversations/development/ | tail -5
3. 了解当前状态：cat docs/conversations/AI-CONTEXT-GUIDE.md
4. 继续开发：告诉AI当前要解决的问题
```

### 场景3：团队协作
```markdown
# 新团队成员加入
1. 阅读项目概述：docs/conversations/AI-CONTEXT-GUIDE.md
2. 了解开发进度：docs/development/DEVELOPMENT-ROADMAP.md
3. 查看技术决策：docs/conversations/development/
4. 使用AI助手：复制project_progress_manager.prompt.md
```

## 📊 自动化功能

### 进度跟踪
- 自动计算模块完成度
- 记录功能开发状态
- 追踪技术债务

### 文档生成
- 自动创建对话记录
- 更新开发路线图
- 维护AI使用指南

### Git集成
- 自动提交文档更改
- 标准化提交信息
- 保持版本历史

## 🎯 最佳实践

### 1. **定期更新**
- 每次完成功能后更新进度
- 解决重要问题后保存对话
- 每周回顾和调整路线图

### 2. **详细记录**
- 包含具体的代码片段
- 记录问题的完整解决过程
- 保存重要的技术决策

### 3. **上下文维护**
- 保持AI-CONTEXT-GUIDE.md的时效性
- 及时更新项目状态
- 记录新的依赖和工具

## 🚨 紧急恢复指南

### 如果所有AI对话都丢失了
1. **立即执行**：
   ```bash
   cd /www/wwwroot/market-pulse
   cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
   ```

2. **复制给新AI**：整个prompt内容

3. **提供当前状态**：
   ```bash
   cat docs/conversations/AI-CONTEXT-GUIDE.md
   ```

4. **说明需求**："我需要继续开发MarketPulse项目，请帮我[具体任务]"

### 如果文档损坏了
1. **检查Git历史**：
   ```bash
   git log --oneline docs/
   ```

2. **恢复最近版本**：
   ```bash
   git checkout HEAD~1 docs/
   ```

3. **重新生成文档**：使用AI助手重新创建

## 💡 高级技巧

### 1. **多AI协作**
- 不同AI助手可以使用相同的prompt
- 保持文档的一致性和连续性
- 实现真正的AI助手"交接班"

### 2. **项目模板化**
- 这个prompt可以适配其他项目
- 修改项目特定信息即可复用
- 建立标准化的开发流程

### 3. **智能搜索**
- 使用grep搜索历史对话
- 快速找到特定问题的解决方案
- 建立个人知识库

## 📈 成功指标

### 文档质量
- ✅ 所有重要对话都有记录
- ✅ 技术决策有完整说明
- ✅ 问题解决过程可复现

### 连续性保证
- ✅ 新AI会话能立即理解项目
- ✅ 开发可以无缝继续
- ✅ 知识不会因人员变动而丢失

---

**记住**：这个系统的价值在于持续使用。每次开发后都要更新文档，这样您就永远不会丢失开发进度和重要的技术知识！
