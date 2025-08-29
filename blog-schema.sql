-- Learning Stack 博客数据库设计
-- 创建时间：2025-01-26

-- 博客文章表
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL COMMENT '文章标题',
    content LONGTEXT NOT NULL COMMENT '文章内容(Markdown格式)',
    summary TEXT COMMENT '文章摘要',
    category VARCHAR(50) COMMENT '文章分类',
    tags JSON COMMENT '文章标签数组',
    cover_image VARCHAR(255) COMMENT '封面图片URL',
    status ENUM('draft', 'published') DEFAULT 'draft' COMMENT '发布状态',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    reading_time INT COMMENT '预估阅读时长(分钟)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
) COMMENT='博客文章表';

-- 学习记录表
CREATE TABLE learning_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL COMMENT '学习主题',
    content TEXT COMMENT '学习内容和心得',
    technology VARCHAR(100) COMMENT '学习的技术栈',
    difficulty ENUM('beginner', 'intermediate', 'advanced') COMMENT '难度等级',
    time_spent INT COMMENT '学习时长(分钟)',
    progress_score INT DEFAULT 0 COMMENT '学习进度评分(0-100)',
    resources JSON COMMENT '学习资源链接',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_technology (technology),
    INDEX idx_difficulty (difficulty),
    INDEX idx_created_at (created_at)
) COMMENT='学习记录表';

-- 项目里程碑表
CREATE TABLE project_milestones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100) NOT NULL COMMENT '项目名称',
    milestone_name VARCHAR(200) NOT NULL COMMENT '里程碑名称',
    description TEXT COMMENT '详细描述',
    status ENUM('todo', 'doing', 'done') DEFAULT 'todo' COMMENT '完成状态',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium' COMMENT '优先级',
    completion_date TIMESTAMP NULL COMMENT '完成日期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_project_name (project_name),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
) COMMENT='项目里程碑表';

-- 技能树表
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(100) NOT NULL COMMENT '技能名称',
    category VARCHAR(50) COMMENT '技能分类(前端/后端/数据库等)',
    proficiency ENUM('learning', 'familiar', 'proficient', 'expert') DEFAULT 'learning' COMMENT '熟练程度',
    description TEXT COMMENT '技能描述',
    start_date DATE COMMENT '开始学习日期',
    last_used DATE COMMENT '最后使用日期',
    projects_used JSON COMMENT '使用该技能的项目列表',
    
    UNIQUE KEY uk_skill_name (skill_name),
    INDEX idx_category (category),
    INDEX idx_proficiency (proficiency)
) COMMENT='技能树表';

-- 文章分类表
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL COMMENT '分类名称',
    description TEXT COMMENT '分类描述',
    color VARCHAR(7) DEFAULT '#1976d2' COMMENT '分类颜色(十六进制)',
    sort_order INT DEFAULT 0 COMMENT '排序权重',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_name (name)
) COMMENT='文章分类表';

-- 文章标签表  
CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL COMMENT '标签名称',
    color VARCHAR(7) DEFAULT '#42a5f5' COMMENT '标签颜色',
    usage_count INT DEFAULT 0 COMMENT '使用次数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_name (name)
) COMMENT='文章标签表';

-- 初始化基础数据
INSERT INTO categories (name, description, color, sort_order) VALUES
('前端开发', 'React、Vue、JavaScript等前端技术', '#e91e63', 1),
('后端开发', 'Go、Node.js、Python等后端技术', '#2196f3', 2),
('数据库', 'MySQL、Redis、MongoDB等数据库技术', '#ff9800', 3),
('DevOps', 'Docker、CI/CD、云服务等运维技术', '#4caf50', 4),
('学习心得', '技术学习过程中的思考和总结', '#9c27b0', 5),
('项目实战', '实际项目开发经验分享', '#f44336', 6);

INSERT INTO tags (name, color) VALUES
('React', '#61dafb'),
('Go', '#00add8'),
('MySQL', '#f29111'),
('Docker', '#2496ed'),
('JavaScript', '#f7df1e'),
('Material-UI', '#007fff'),
('学习笔记', '#42a5f5'),
('踩坑记录', '#ff5722'); 