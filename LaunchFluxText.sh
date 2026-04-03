#!/bin/bash

# FluxText Launcher
# Make sure to run `chmod +x LaunchFluxText.sh` before using.

echo "======================================="
echo "          FluxText Web App"
echo "======================================="

# Trap signals for graceful shutdown to prevent orphaned node processes
trap 'kill 0' SIGINT SIGTERM EXIT

cd frontend || exit 1

# Check if npm is installed
echo "[INFO] Checking for npm..."
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed or not in PATH! Please install Node.js."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "[INFO] node_modules not found. Initializing 'npm install'..."
    npm install
fi

echo "[INFO] Starting Vite development server..."
npm run dev
