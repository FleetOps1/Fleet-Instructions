# Local HTTP Server for Freightliner FleetOps Knowledge Base
param (
    [int]$Port = 8080,
    [switch]$NoBrowser
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host " Freightliner FleetOps Web Server Started! " -ForegroundColor Green
    Write-Host " URL: http://localhost:$($Port)" -ForegroundColor Yellow
    Write-Host " Local Storage: $scriptDir\data\fleet_database.json" -ForegroundColor Gray
    Write-Host " Press Ctrl+C in this window to stop the server." -ForegroundColor DarkGray
    Write-Host "==========================================================" -ForegroundColor Cyan
} catch {
    Write-Host "Error starting listener on port $($Port): $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Trying port 8088 instead..." -ForegroundColor Yellow
    $Port = 8088
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    Write-Host "Started on http://localhost:$($Port)" -ForegroundColor Green
}

# Auto-open browser if requested
if (-not $NoBrowser) {
    try {
        Start-Process "http://localhost:$($Port)"
    } catch {}
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".pdf"  = "application/pdf"
    ".doc"  = "application/msword"
    ".docx" = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ".xls"  = "application/vnd.ms-excel"
    ".xlsx" = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ".csv"  = "text/csv; charset=utf-8"
    ".txt"  = "text/plain; charset=utf-8"
    ".zip"  = "application/zip"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Add CORS headers so direct file access can also query if needed
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        $rawUrl = $request.RawUrl.Split('?')[0]

        # API Endpoints
        if ($rawUrl -eq "/api/status") {
            $json = '{"status":"ok","mode":"local_server","port":' + $Port + '}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/api/database" -and $request.HttpMethod -eq "GET") {
            $dbPath = Join-Path $scriptDir "data\fleet_database.json"
            if (Test-Path $dbPath) {
                $content = [System.IO.File]::ReadAllBytes($dbPath)
                $response.ContentType = "application/json; charset=utf-8"
                $response.OutputStream.Write($content, 0, $content.Length)
            } else {
                $response.StatusCode = 404
            }
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/api/database" -and $request.HttpMethod -eq "POST") {
            $dbPath = Join-Path $scriptDir "data\fleet_database.json"
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
            [System.IO.File]::WriteAllText($dbPath, $body, $utf8NoBom)
            
            # Keep offline seed_data.js in sync automatically
            try {
                $seedPath = Join-Path $scriptDir "js\seed_data.js"
                $seedContent = "// Seed Database for Offline / Standalone Fallback`r`nconst INITIAL_DATABASE = " + $body + ";`r`n"
                [System.IO.File]::WriteAllText($seedPath, $seedContent, $utf8NoBom)
            } catch {}
            
            $json = '{"success":true,"message":"Database saved to disk and seed updated"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/api/git-push" -and $request.HttpMethod -eq "POST") {
            $gitPath = "C:\Users\user\AppData\Local\Programs\Git\cmd;C:\Users\user\AppData\Local\Programs\Git\ucrt64\bin;"
            $env:Path = $gitPath + $env:Path
            
            try {
                git add .
                $commitMsg = "FleetOps update: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
                git commit -m $commitMsg 2>&1 | Out-Null
            } catch {}
            
            $pushOut = git push origin main 2>&1
            $success = ($LASTEXITCODE -eq 0)
            
            $result = @{
                success = $success
                message = if ($success) { "Successfully pushed all changes and photos to GitHub!" } else { ($pushOut | Out-String).Trim() }
            } | ConvertTo-Json
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($result)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/api/upload" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            $uploadData = $body | ConvertFrom-Json
            
            $ext = [System.IO.Path]::GetExtension($uploadData.fileName).ToLower()
            if ([string]::IsNullOrWhiteSpace($ext)) {
                if ($uploadData.base64 -match '^data:image/jpeg') { $ext = '.jpg' }
                elseif ($uploadData.base64 -match '^data:image/png') { $ext = '.png' }
                elseif ($uploadData.base64 -match '^data:image/webp') { $ext = '.webp' }
                elseif ($uploadData.base64 -match '^data:image/gif') { $ext = '.gif' }
                elseif ($uploadData.base64 -match '^data:image/svg') { $ext = '.svg' }
                elseif ($uploadData.base64 -match '^data:application/pdf') { $ext = '.pdf' }
                else { $ext = '.png' }
            }
            $origName = [System.IO.Path]::GetFileNameWithoutExtension($uploadData.fileName) -replace '[^a-zA-Z0-9_\-]', '_'
            if ([string]::IsNullOrWhiteSpace($origName)) { $origName = 'pasted_photo' }
            $prefix = if ($ext -match '\.(png|jpg|jpeg|webp|gif|svg)') { 'img_' } elseif ($ext -eq '.pdf') { 'pdf_' } else { 'file_' }
            $fileName = $prefix + [Guid]::NewGuid().ToString().Substring(0, 8) + "_" + $origName + $ext
            $uploadDir = Join-Path $scriptDir "uploads"
            if (!(Test-Path $uploadDir)) { New-Item -ItemType Directory -Path $uploadDir | Out-Null }
            $targetPath = Join-Path $uploadDir $fileName
            
            # Base64 data decode
            $base64 = $uploadData.base64
            if ($base64.Contains(',')) {
                $base64 = $base64.Split(',')[1]
            }
            $bytes = [System.Convert]::FromBase64String($base64)
            [System.IO.File]::WriteAllBytes($targetPath, $bytes)
            
            # Return relative path without leading slash so it works under file:// and http://
            $result = @{
                success = $true
                url = "uploads/" + $fileName
                fileName = $fileName
            } | ConvertTo-Json
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($result)
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Static File Serving
        $localPath = if ($rawUrl -eq "/" -or $rawUrl -eq "") { "index.html" } else { $rawUrl.TrimStart('/') }
        $localPath = $localPath -replace '/', '\'
        $filePath = Join-Path $scriptDir $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # Keep server loop running on transient error
    }
}
