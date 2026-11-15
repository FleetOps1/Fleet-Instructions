@echo off
title Freightliner FleetOps - GitHub Login
cd /d "%~dp0"

echo ========================================================
echo   Freightliner FleetOps - GitHub Login (FleetOps1)
echo ========================================================
echo.

:: Ensure gh is in PATH
set "PATH=C:\Program Files\GitHub CLI;C:\Program Files\Git\cmd;%PATH%"

where gh >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] GitHub CLI is not found!
    echo.
    pause
    exit /b 1
)

echo Starting web login to GitHub...
echo A browser window will open to authorize your account.
echo.
gh auth login --web -h github.com -p https -s repo,workflow

if %ERRORLEVEL% equ 0 (
    echo.
    echo Configuring Git credential helper...
    gh auth setup-git
    echo.
    echo ========================================================
    echo   [SUCCESS] Logged in to GitHub successfully!
    echo ========================================================
) else (
    echo.
    echo [WARNING] Login was not completed or failed.
)

echo.
pause
