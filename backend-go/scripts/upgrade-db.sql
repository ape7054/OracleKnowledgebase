-- 简单的数据库升级脚本
-- 为编程小白设计，一步步改进

-- 第一步：创建用户表（最基础的）
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 第二步：给trades表添加用户关联（可选的，不会破坏现有数据）
ALTER TABLE trades 
ADD COLUMN user_id INT DEFAULT NULL,
ADD COLUMN user_name VARCHAR(50) DEFAULT 'Anonymous';

-- 第三步：改进price和amount的数据类型
-- 注意：这会保留现有数据
ALTER TABLE trades 
ADD COLUMN price_decimal DECIMAL(20,8) DEFAULT NULL,
ADD COLUMN amount_decimal DECIMAL(20,8) DEFAULT NULL;

-- 第四步：将现有的VARCHAR数据转换为DECIMAL
UPDATE trades 
SET 
    price_decimal = CAST(price AS DECIMAL(20,8)),
    amount_decimal = CAST(amount AS DECIMAL(20,8))
WHERE price_decimal IS NULL;

-- 插入一个测试用户
INSERT IGNORE INTO users (username, email, password_hash) 
VALUES ('testuser', 'test@example.com', 'simple_password_hash');
