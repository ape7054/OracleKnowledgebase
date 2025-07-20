@echo off
echo Stopping Full-Stack Development Environment...

echo.
echo ========================================
echo   Stopping MarketPulse Development
echo ========================================

echo.
echo 1. Stopping frontend server (Vite)...
:: 停止占用5173端口的进程
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5173" 2^>nul') do (
    echo Stopping frontend server (PID: %%i)
    taskkill /f /pid %%i 2>nul
)

echo.
echo 2. Stopping backend server (Go)...
:: 停止占用8080端口的进程
for /f "tokens=5" %%i in ('netstat -ano ^| find ":8080" 2^>nul') do (
    echo Stopping backend server (PID: %%i)
    taskkill /f /pid %%i 2>nul
)

:: 也停止所有go.exe进程（开发服务器）
taskkill /f /im go.exe 2>nul
echo ✓ Go processes stopped

echo.
echo 3. Stopping Node.js processes...
:: 停止Node.js进程（Vite开发服务器）
taskkill /f /im node.exe 2>nul
echo ✓ Node.js processes stopped

echo.
echo 4. Stopping database container...
docker-compose stop db 2>nul
if not errorlevel 1 (
    echo ✓ Database container stopped
) else (
    echo ⚠ Database container may not be running
)

echo.
echo 5. Cleaning up...
:: 关闭可能打开的命令行窗口
taskkill /f /fi "WindowTitle eq Backend Server*" 2>nul
taskkill /f /fi "WindowTitle eq Frontend Server*" 2>nul

echo.
echo ========================================
echo   🛑 Development Environment Stopped
echo ========================================
echo.
echo All services have been stopped:
echo ✓ Frontend server (port 5173)
echo ✓ Backend server (port 8080)
echo ✓ Database container
echo ✓ Development processes
echo.
echo You can restart with: start-dev.bat
echo.
echo Press any key to close this window...
pause >nul
