@echo off
title Freightliner FleetOps
cd /d "%~dp0"

:: Ensure uploads and data directories exist
if not exist "%~dp0uploads" mkdir "%~dp0uploads"
if not exist "%~dp0data" mkdir "%~dp0data"

:: Check if local server is already running on port 8080
powershell -NoProfile -Command "try { $c = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 8080); $c.Close(); exit 0 } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Local FleetOps server already running. Opening app...
    start "" "http://localhost:8080"
    exit /b 0
)

:: Launch local server in background (minimized window)
echo Starting FleetOps local storage server in background...
start "" /min powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1" -NoBrowser

:: Wait briefly for server listener to bind, then launch browser
powershell -NoProfile -Command "for ($i=0; $i -lt 15; $i++) { try { $c = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 8080); $c.Close(); exit 0 } catch { Start-Sleep -Milliseconds 200 } }; exit 1" >nul 2>&1
start "" "http://localhost:8080"
exit /b 0
