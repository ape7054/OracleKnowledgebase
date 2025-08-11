# SelectTranslate 项目蓝图

> 版本：v1.0  
> 更新：2025-01-20  
> 状态：设计阶段

## 🎯 项目概览

### 核心价值主张
替代腾讯电脑管家的划词翻译功能，提供轻量、快速、隐私安全的桌面翻译工具。

### 目标用户
- 开发者：阅读英文技术文档
- 学生/研究者：处理外文资料
- 办公人员：快速理解邮件/网页内容

### 成功指标
- 翻译响应时间 ≤ 1.5s
- 内存占用 ≤ 20MB
- 启动时间 ≤ 0.5s
- 剪贴板恢复成功率 ≥ 99%

---

## 🏗️ 系统架构

### 整体架构图
```
┌─────────────────────────────────────────────────────────┐
│                    SelectTranslate                      │
├─────────────────────────────────────────────────────────┤
│  UI Layer (egui/eframe)                                │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │   Popup Window  │  │    Settings Window          │   │
│  │   - 显示译文    │  │    - 语言设置               │   │
│  │   - 复制/关闭   │  │    - API Key 管理           │   │
│  │   - 错误提示    │  │    - 热键配置               │   │
│  └─────────────────┘  └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  Business Logic Layer                                   │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  HotkeyManager  │  │    TranslationService       │   │
│  │  - 全局热键监听 │  │    - DeepL/LibreTranslate   │   │
│  │  - 事件分发     │  │    - 语言检测               │   │
│  └─────────────────┘  │    - 缓存管理               │   │
│                       └─────────────────────────────┘   │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │ ClipboardManager│  │    ConfigManager            │   │
│  │  - 文本复制     │  │    - 配置持久化             │   │
│  │  - 内容保护     │  │    - 默认值管理             │   │
│  │  - 状态恢复     │  │    - 配置校验               │   │
│  └─────────────────┘  └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  System Integration Layer                               │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  Windows APIs   │  │    System Tray              │   │
│  │  - 全局钩子     │  │    - 托盘图标               │   │
│  │  - 剪贴板API    │  │    - 右键菜单               │   │
│  │  - 窗口定位     │  │    - 开机自启               │   │
│  └─────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ 技术栈详解

### 核心依赖
```toml
[dependencies]
# UI 框架
egui = "0.24"                    # 轻量级即时模式 GUI
eframe = "0.24"                  # egui 的框架封装

# 系统集成
global-hotkey = "0.4"            # 全局热键监听
arboard = "3.2"                  # 跨平台剪贴板操作
windows = { version = "0.52", features = [
  "Win32_UI_WindowsAndMessaging",
  "Win32_Foundation",
  "Win32_UI_Accessibility",   # UI Automation（选中检测）
  "Win32_System_Com"          # COM 初始化
] }

# 网络和序列化
reqwest = { version = "0.11", features = ["json", "rustls-tls"] }
tokio = { version = "1.0", features = ["rt-multi-thread", "macros", "time"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# 工具库
lru = "0.12"                     # LRU 缓存
dirs = "5.0"                     # 系统目录获取
anyhow = "1.0"                   # 错误处理
log = "0.4"                      # 日志
env_logger = "0.10"              # 日志输出

# 系统托盘（可选）
tray-icon = "0.8"                # 系统托盘图标
```

### 项目结构
```
select-translate/
├── Cargo.toml                   # 项目配置
├── src/
│   ├── main.rs                  # 程序入口
│   ├── app.rs                   # 主应用逻辑
│   ├── config/
│   │   ├── mod.rs
│   │   └── manager.rs           # 配置管理
│   ├── translation/
│   │   ├── mod.rs
│   │   ├── service.rs           # 翻译服务
│   │   ├── providers/
│   │   │   ├── mod.rs
│   │   │   ├── deepl.rs         # DeepL 集成
│   │   │   └── libretranslate.rs # LibreTranslate 集成
│   │   └── cache.rs             # 翻译缓存
│   ├── clipboard/
│   │   ├── mod.rs
│   │   └── manager.rs           # 剪贴板管理
│   ├── hotkey/
│   │   ├── mod.rs
│   │   └── manager.rs           # 热键管理
│   ├── ui/
│   │   ├── mod.rs
│   │   ├── popup.rs             # 弹窗界面
│   │   ├── settings.rs          # 设置界面
│   │   └── theme.rs             # 主题管理
│   ├── system/
│   │   ├── mod.rs
│   │   ├── tray.rs              # 系统托盘
│   │   └── startup.rs           # 开机自启
│   └── utils/
│       ├── mod.rs
│       ├── error.rs             # 错误类型定义
│       └── logger.rs            # 日志配置
├── assets/
│   ├── icon.ico                 # 应用图标
│   └── tray.png                 # 托盘图标
├── build.rs                     # 构建脚本
└── docs/
    ├── README.md
    ├── CHANGELOG.md
    └── API.md
```

---

## 📋 开发计划

### 第1周：核心功能（MVP）
- [x] 项目脚手架搭建
- [ ] HotkeyManager 实现
- [ ] ClipboardManager 实现
- [ ] 基础翻译服务（LibreTranslate）
- [ ] 简单弹窗 UI
- [ ] 基础错误处理

### 第2周：完善功能
- [ ] DeepL API 集成
- [ ] 配置管理系统
- [ ] 设置界面
- [ ] 翻译缓存
- [ ] 系统托盘集成

### 第3周：优化和测试
- [ ] 性能优化
- [ ] 错误处理完善
- [ ] 单元测试
- [ ] 集成测试
- [ ] 用户体验优化

### 第4周：发布准备
- [ ] 打包优化
- [ ] 文档完善
- [ ] 安装包制作
- [ ] 自动更新机制
- [ ] Beta 版本发布

---

## 🎯 质量标准

### 性能指标
- 启动时间: ≤ 500ms
- 内存占用: ≤ 20MB
- 翻译延迟: ≤ 1500ms
- CPU 占用: 空闲时 < 1%

### 稳定性指标
- 剪贴板恢复成功率: ≥ 99%
- 热键响应成功率: ≥ 99.9%
- 连续运行时间: ≥ 7天无崩溃
- 内存泄漏: 24小时内增长 < 5MB

### 兼容性要求
- Windows 10/11 x64
- DPI 缩放: 100%-300%
- 多显示器支持
- 各种应用程序兼容（Chrome、VS Code、Word等） 