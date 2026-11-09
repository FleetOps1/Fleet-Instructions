@echo off
title Freightliner FleetOps - Git Push
cd /d "%~dp0"

echo ========================================================
echo   Freightliner FleetOps - Sync Changes to GitHub
echo ========================================================
echo.

:: Ensure Git is in PATH
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
    ) else if exist "C:\Program Files\Git\cmd\git.exe" (
        set "PATH=C:\Program Files\Git\cmd;%PATH%"
    ) else (
        echo [ERROR] Git is not found!
        echo Please install Git on this PC to push changes.
        echo.
        pause
        exit /b 1
    )
)

if not exist "%~dp0.git" (
    echo [ERROR] Git repository is not initialized here.
    pause
    exit /b 1
)

:: Check if remote is configured
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [NOTICE] GitHub remote URL is not configured yet!
    echo.
    set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/username/repo.git): "
    if not "%REPO_URL%"=="" (
        git remote add origin %REPO_URL%
        echo Remote added: %REPO_URL%
    ) else (
        echo No remote entered. Cannot push.
        pause
        exit /b 1
    )
)

set /p COMMIT_MSG="Enter commit note (press Enter for auto-timestamp): "
if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=FleetOps update - %DATE% %TIME%
)

echo.
echo [1/3] Adding all files, uploads, and database changes...
git add .

echo [2/3] Committing changes...
git commit -m "%COMMIT_MSG%"

echo [3/3] Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Successfully pushed all changes to GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTICE] If this is your first push or authentication is required,
    echo sign in with your GitHub account in the browser prompt or token.
)

echo.
pause
