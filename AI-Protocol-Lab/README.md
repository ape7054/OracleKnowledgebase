# 🤖 AI Protocol Lab

**通用AI助手工具箱** - 提升开发效率的专业化Prompt集合

## 📋 概述

AI Protocol Lab是一个可复用的AI助手工具箱，包含多种专业化的prompt，适用于任何软件开发项目。无论您使用什么技术栈、在哪个编辑器中工作，都可以通过这些prompt获得一致的高质量AI助手体验。

### 🎯 核心价值

- **🔄 无缝切换**: 在不同编辑器、AI助手之间保持上下文连续性
- **📚 知识保存**: 自动化项目进度跟踪和技术决策记录
- **⚡ 效率提升**: 专业化prompt提供针对性的开发支持
- **🔧 即插即用**: 复制文件夹到任何项目即可使用

## 📁 Prompt集合

### 🎓 学习和指导类

#### `tech_english_tutor.prompt.md`
- **用途**: 技术英语学习和改进
- **适用**: 需要提升技术英语水平的开发者
- **特色**: 专业术语解释、写作指导、表达优化

#### `web3_mentor.prompt.md`
- **用途**: Web3技术学习指导
- **适用**: 从Web2向Web3转型的开发者
- **特色**: 结构化学习路径、实践项目指导

### 🛠️ 开发支持类

#### `development_assistant.prompt.md`
- **用途**: 全栈开发技术支持
- **适用**: 日常开发问题解决、架构设计
- **特色**: 多技术栈支持、最佳实践指导、代码质量保证

#### `code_reviewer.prompt.md`
- **用途**: 专业代码审查
- **适用**: 代码质量提升、团队协作
- **特色**: 结构化审查流程、建设性反馈、优先级分类

#### `documentation_generator.prompt.md`
- **用途**: 技术文档生成和优化
- **适用**: API文档、用户手册、项目文档
- **特色**: 多种文档模板、清晰的结构指导

### 📊 项目管理类

#### `project_progress_manager.prompt.md`
- **用途**: 项目进度跟踪和对话记录保存
- **适用**: 任何需要进度管理的软件项目
- **特色**: 自动化文档更新、上下文保存、知识传承

## 🚀 快速开始

### 1. 复制到您的项目
```bash
# 将整个AI-Protocol-Lab文件夹复制到您的项目根目录
cp -r AI-Protocol-Lab /path/to/your/project/
```

### 2. 生成项目上下文
```bash
cd /path/to/your/project
./AI-Protocol-Lab/get-ai-context.sh
```

### 3. 选择合适的Prompt
```bash
# 查看所有可用的prompt
ls AI-Protocol-Lab/prompts/

# 使用特定prompt
cat AI-Protocol-Lab/prompts/development_assistant.prompt.md
```

### 4. 与AI助手对话
- 复制选择的prompt内容
- 粘贴给AI助手
- 开始专业化的技术对话

## 📖 使用场景

### 🔄 编辑器切换
**场景**: 从VSCode切换到其他编辑器，AI对话历史丢失
```bash
# 1. 生成当前项目上下文
./AI-Protocol-Lab/get-ai-context.sh

# 2. 复制生成的内容给新的AI助手
# 3. 继续开发工作，无缝衔接
```

### 👥 团队协作
**场景**: 新团队成员需要快速了解项目
```bash
# 1. 提供项目背景
cat AI-Protocol-Lab/get-ai-context.sh

# 2. 选择合适的学习prompt
cat AI-Protocol-Lab/prompts/web3_mentor.prompt.md  # 如果是Web3项目

# 3. 开始指导和学习
```

### 🔍 代码审查
**场景**: 需要对代码进行专业审查
```bash
# 1. 使用代码审查prompt
cat AI-Protocol-Lab/prompts/code_reviewer.prompt.md

# 2. 提供代码给AI助手
# 3. 获得结构化的审查反馈
```

### 📚 文档编写
**场景**: 需要创建或改进项目文档
```bash
# 1. 使用文档生成prompt
cat AI-Protocol-Lab/prompts/documentation_generator.prompt.md

# 2. 说明文档类型和需求
# 3. 获得专业的文档建议和模板
```

## 🔧 自定义和扩展

### 添加新的Prompt
1. 在`prompts/`目录下创建新的`.prompt.md`文件
2. 遵循现有的格式和结构
3. 包含清晰的使用说明和激活条件

### 修改现有Prompt
1. 根据项目需求调整prompt内容
2. 保持核心结构和原则不变
3. 添加项目特定的上下文信息

### 项目特定配置
1. 修改`get-ai-context.sh`脚本
2. 添加项目特定的检测逻辑
3. 自定义生成的上下文信息

## 📁 文件结构

```
AI-Protocol-Lab/
├── prompts/                          # Prompt集合
│   ├── tech_english_tutor.prompt.md     # 技术英语指导
│   ├── web3_mentor.prompt.md            # Web3学习指导
│   ├── development_assistant.prompt.md   # 开发助手
│   ├── code_reviewer.prompt.md          # 代码审查
│   ├── documentation_generator.prompt.md # 文档生成
│   └── project_progress_manager.prompt.md # 项目管理
├── get-ai-context.sh                 # 上下文生成脚本
├── README.md                         # 本文档
├── README-PROGRESS-MANAGER.md        # 项目管理详细指南
└── USAGE-EXAMPLES.md                 # 使用示例
```

## 💡 最佳实践

### 1. **选择合适的Prompt**
- 根据当前任务选择最相关的prompt
- 可以组合使用多个prompt
- 定期更新和优化prompt内容

### 2. **保持上下文连续性**
- 定期运行`get-ai-context.sh`更新项目状态
- 在重要开发节点保存对话记录
- 使用项目管理prompt跟踪进度

### 3. **团队协作**
- 统一使用相同的prompt版本
- 分享有效的prompt使用经验
- 建立团队特定的prompt库

### 4. **持续改进**
- 根据使用反馈优化prompt
- 添加项目特定的最佳实践
- 定期回顾和更新工具箱

## 🔗 相关资源

- [项目管理详细指南](README-PROGRESS-MANAGER.md)
- [使用示例和场景](USAGE-EXAMPLES.md)
- [Prompt编写最佳实践](https://docs.anthropic.com/claude/docs/prompt-engineering)

## 🤝 贡献

欢迎贡献新的prompt或改进现有的工具：

1. Fork项目并创建新分支
2. 添加或修改prompt文件
3. 测试prompt的有效性
4. 提交Pull Request

## 📄 许可证

本项目采用MIT许可证，可自由使用、修改和分发。

---

**记住**: AI Protocol Lab的价值在于持续使用和改进。将它复制到您的每个项目中，建立一致的AI协作体验！
