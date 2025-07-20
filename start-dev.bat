@echo off
echo Starting Full-Stack Development Environment...

echo.
echo ========================================
echo   MarketPulse Development Setup
echo ========================================

echo.
echo 1. Checking prerequisites...

:: Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    goto :error
)
echo ✓ Node.js:
node --version

:: Check Go
echo Checking Go...
go version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Go is not installed or not in PATH!
    echo Please install Go from https://golang.org/
    goto :error
)
echo ✓ Go:
go version

:: Check Docker (for database)
echo Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not running!
    echo Please install Docker Desktop and make sure it's running
    goto :error
)
echo ✓ Docker:
docker --version

echo.
echo 2. Starting database (MySQL in Docker)...
docker-compose up -d db
if errorlevel 1 (
    echo ERROR: Failed to start database!
    goto :error
)
echo ✓ Database starting...

echo.
echo 3. Waiting for database to be ready...
timeout /t 10 /nobreak >nul

echo.
echo 4. Installing frontend dependencies...
npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies!
    goto :error
)
echo ✓ Frontend dependencies installed

echo.
echo 5. Starting backend server...
start "Backend Server" cmd /k "cd backend && echo Starting Go backend server... && go run cmd/market-pulse-backend/main.go"

echo.
echo 6. Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo 7. Starting frontend development server...
start "Frontend Server" cmd /k "echo Starting Vite frontend server... && npm run dev"

echo.
echo ========================================
echo   🚀 Development Environment Ready!
echo ========================================
echo   Frontend:  http://localhost:5173
echo   Backend:   http://localhost:8080
echo   Database:  localhost:3307
echo   API Test:  http://localhost:8080/api/health
echo ========================================
echo.
echo Two new windows opened:
echo - Backend Server (Go)
echo - Frontend Server (Vite)
echo.
echo To stop everything, run: stop-dev.bat
echo.
echo Press any key to close this window...
pause >nul
exit /b 0

:error
echo.
echo ❌ Setup failed! Please fix the errors above.
echo.
echo Press any key to exit...
pause >nul
exit /b 1
