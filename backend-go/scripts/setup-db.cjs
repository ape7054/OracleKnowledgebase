const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// MySQL 安装路径
const mysqlPath = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';

// SQL 命令
const sqlCommands = `
CREATE DATABASE IF NOT EXISTS market_pulse_db;
CREATE USER IF NOT EXISTS 'market_pulse_user'@'localhost' IDENTIFIED BY 'wBYXZkiLTExiEAHF';
GRANT ALL PRIVILEGES ON market_pulse_db.* TO 'market_pulse_user'@'localhost';
FLUSH PRIVILEGES;
`;

// 将 SQL 命令写入临时文件
const tempSqlFile = path.join(__dirname, 'temp-setup.sql');
fs.writeFileSync(tempSqlFile, sqlCommands);

console.log('请输入 MySQL root 用户的密码:');

// 执行 MySQL 命令
const mysqlCmd = `"${mysqlPath}" -u root -p < "${tempSqlFile}"`;
console.log(`执行命令: ${mysqlCmd}`);

// 在 CMD 中执行命令
exec(`cmd /c ${mysqlCmd}`, (error, stdout, stderr) => {
  // 删除临时文件
  fs.unlinkSync(tempSqlFile);
  
  if (error) {
    console.error(`执行出错: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`错误输出: ${stderr}`);
    return;
  }
  
  console.log('数据库设置成功!');
  console.log(`
数据库名: market_pulse_db
用户名: market_pulse_user
密码: wBYXZkiLTExiEAHF
  `);
}); 