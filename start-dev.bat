@echo off
echo Starting development environment...

echo.
echo 1. Starting database (Docker)...
docker-compose -f docker-compose.dev.yml up -d

echo.
echo 2. Waiting for database to start...
timeout /t 10 /nobreak

echo.
echo 3. Starting backend service...
start "Backend" cmd /k "cd backend && go run cmd/market-pulse-backend/main.go"

echo.
echo 4. Waiting for backend to start...
timeout /t 5 /nobreak

echo.
echo 5. Starting frontend service...
start "Frontend" cmd /k "npm run dev"

echo.
echo Development environment started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8080
echo Database: localhost:3307
echo.
echo Press any key to close this window...
pause >nul
