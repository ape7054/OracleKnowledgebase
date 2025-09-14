const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// MySQL 安装路径
const mysqlPath = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';

// SQL 命令
const sqlCommands = `
DROP USER IF EXISTS 'market_pulse_user'@'localhost';
CREATE USER 'market_pulse_user'@'localhost' IDENTIFIED BY 'wBYXZkiLTExiEAHF';
CREATE DATABASE IF NOT EXISTS market_pulse_db;
GRANT ALL PRIVILEGES ON market_pulse_db.* TO 'market_pulse_user'@'localhost';
FLUSH PRIVILEGES;
`;

// 将 SQL 命令写入临时文件
const tempSqlFile = path.join(__dirname, 'temp-fix-user.sql');
fs.writeFileSync(tempSqlFile, sqlCommands);

console.log('请输入 MySQL root 用户的密码。');
console.log('如果脚本运行成功，您应该看到"用户和数据库已成功设置!"的信息。');
console.log('如果出现错误，请检查您的 MySQL root 密码是否正确。');

try {
  // 使用 MySQL 命令行工具运行 SQL 命令，以交互方式输入密码
  const mysql = execSync(`"${mysqlPath}" -u root -p < "${tempSqlFile}"`, {
    stdio: 'inherit' // 继承当前进程的标准输入/输出/错误流
  });
  
  // 如果执行到这里，说明命令已成功执行
  console.log('用户和数据库已成功设置!');
  console.log(`
用户名: market_pulse_user
密码: wBYXZkiLTExiEAHF
数据库: market_pulse_db
  `);
} catch (error) {
  console.error('执行 MySQL 命令时出错:', error.message);
} finally {
  // 删除临时文件
  if (fs.existsSync(tempSqlFile)) {
    fs.unlinkSync(tempSqlFile);
  }
} 