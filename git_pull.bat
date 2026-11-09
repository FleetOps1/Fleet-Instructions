@echo off
title Freightliner FleetOps - Git Pull
cd /d "%~dp0"

echo ========================================================
echo   Freightliner FleetOps - Pull Latest from GitHub
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
        echo Please install Git on this PC to pull changes.
        echo.
        pause
        exit /b 1
    )
)

echo Pulling latest updates from GitHub...
git pull origin main
if %ERRORLEVEL% neq 0 (
    git pull origin master
)

echo.
echo Syncing seed database to disk...
powershell -NoProfile -Command "if (Test-Path 'data\fleet_database.json') { $c = Get-Content 'data\fleet_database.json' -Raw; [System.IO.File]::WriteAllText('js\seed_data.js', '// Seed Database for Offline / Standalone Fallback`r`nconst INITIAL_DATABASE = ' + $c + ';`r`n', [System.Text.UTF8Encoding]::new($false)) }"

echo.
echo ========================================================
echo   [SUCCESS] Updated to latest version from GitHub!
echo ========================================================
echo.
pause
