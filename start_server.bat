@echo off
title Freightliner FleetOps Server
cd /d "%~dp0"
if not exist "%~dp0uploads" mkdir "%~dp0uploads"
if not exist "%~dp0data" mkdir "%~dp0data"
echo ===================================================
echo   Starting Freightliner FleetOps Local Server...
echo   All photos, pastes, and edits save to disk.
echo ===================================================
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
pause