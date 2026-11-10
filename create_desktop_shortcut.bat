@echo off
title Create Freightliner FleetOps Desktop Shortcut
cd /d "%~dp0"

echo Creating Desktop Shortcut for Freightliner FleetOps...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$wsh = New-Object -ComObject WScript.Shell; " ^
  "$desktop = [Environment]::GetFolderPath('Desktop'); " ^
  "$sc = $wsh.CreateShortcut((Join-Path $desktop 'Freightliner FleetOps.lnk')); " ^
  "$sc.TargetPath = '%~dp0open_app.bat'; " ^
  "$sc.WorkingDirectory = '%~dp0'; " ^
  "$sc.IconLocation = '%~dp0assets\app_icon.ico,0'; " ^
  "$sc.Description = 'Launch Freightliner FleetOps SOP & Troubleshooting Library'; " ^
  "$sc.WindowStyle = 7; " ^
  "$sc.Save(); " ^
  "Write-Host 'Desktop shortcut successfully created!'"

pause
