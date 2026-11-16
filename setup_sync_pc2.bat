@echo off
title Freightliner FleetOps - PC2 Setup
cd /d "%~dp0"

echo ========================================================
echo   Freightliner FleetOps - PC2 Sync Setup
echo ========================================================
echo.

where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    if exist "C:\Program Files\Git\cmd\git.exe" set "PATH=C:\Program Files\Git\cmd;%PATH%"
    if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
)

set /p GHTOKEN="Enter your GitHub Personal Access Token: "
if not "%GHTOKEN%"=="" (
    git remote set-url origin https://%GHTOKEN%@github.com/FleetOps1/Fleet-Instructions.git
    git config credential.helper store
    git config user.name "Dylan"
    git config user.email "dylan@fleetlibrary.local"
    echo.
    echo Git credentials saved!
)

echo Pulling latest updates from GitHub...
git pull origin main

echo.
echo ========================================================
echo   [SUCCESS] PC2 is fully configured and in sync!
echo ========================================================
echo.
pause
