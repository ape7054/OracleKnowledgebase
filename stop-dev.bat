@echo off
echo Stopping development environment...

echo.
echo 1. Stopping database container...
docker-compose -f docker-compose.dev.yml down

echo.
echo 2. Stopping backend and frontend processes...
taskkill /f /im go.exe 2>nul
taskkill /f /im node.exe 2>nul

echo.
echo Development environment stopped!
echo.
echo Press any key to close this window...
pause >nul
