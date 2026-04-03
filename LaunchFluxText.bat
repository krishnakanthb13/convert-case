@echo off
title FluxText Launcher
echo =======================================
echo           FluxText Web App
echo =======================================

cd frontend

rem Check if npm is installed
echo [INFO] Checking for npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH! Please install Node.js.
    pause
    exit /b
)

rem Check if dependencies are installed
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Initializing 'npm install'...
    call npm install
)

echo [INFO] Starting Vite development server...
call npm run dev

pause
