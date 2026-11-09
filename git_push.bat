@echo off
title Freightliner FleetOps - Git Push
cd /d "%~dp0"

echo ========================================================
echo   Freightliner FleetOps - Sync Changes to GitHub
echo ========================================================
echo.

where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not found in PATH!
    echo Please install Git or restart your command prompt.
    echo.
    pause
    exit /b 1
)

if not exist "%~dp0.git" (
    echo [ERROR] Git repository is not initialized here yet.
    echo Please initialize git first.
    echo.
    pause
    exit /b 1
)

set /p COMMIT_MSG="Enter commit note (press Enter for auto-timestamp): "
if "%COMMIT_MSG%"=="" (
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
    set COMMIT_MSG=FleetOps update - %DATE% %TIME%
)

echo.
echo [1/3] Adding all files and uploads...
git add .

echo [2/3] Committing changes...
git commit -m "%COMMIT_MSG%"

echo [3/3] Pushing to GitHub...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Successfully pushed all changes to GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTICE] Push encountered an issue. Trying 'master' branch or check connection...
    git push origin master
)

echo.
pause
