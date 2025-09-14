CREATE DATABASE IF NOT EXISTS market_pulse_db;
CREATE USER IF NOT EXISTS 'market_pulse_user'@'localhost' IDENTIFIED BY 'wBYXZkiLTExiEAHF';
GRANT ALL PRIVILEGES ON market_pulse_db.* TO 'market_pulse_user'@'localhost';
FLUSH PRIVILEGES; 