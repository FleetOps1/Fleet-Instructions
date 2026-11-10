Add-Type -AssemblyName System.Drawing

$icoPath = "C:\Users\user\Desktop\Dylan_FleetLibraryApp\assets\app_icon.ico"
$sizes = @(16, 32, 48, 64, 128, 256)
$pngBuffers = @()

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    
    # Scale factors
    $pad = $size * 0.05
    $rectSize = $size - ($pad * 2)
    $cornerRadius = $rectSize * 0.22
    
    # Rounded Rect Path
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $cornerRadius * 2
    $r = New-Object System.Drawing.RectangleF($pad, $pad, $rectSize, $rectSize)
    $path.AddArc($r.X, $r.Y, $diameter, $diameter, 180, 90)
    $path.AddArc($r.Right - $diameter, $r.Y, $diameter, $diameter, 270, 90)
    $path.AddArc($r.Right - $diameter, $r.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($r.X, $r.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    
    # Gradient Brush (Orange to Amber)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.PointF]::new($r.X, $r.Y),
        [System.Drawing.PointF]::new($r.Right, $r.Bottom),
        [System.Drawing.Color]::FromArgb(255, 249, 115, 22),
        [System.Drawing.Color]::FromArgb(255, 217, 119, 6)
    )
    $g.FillPath($brush, $path)
    
    # Subtle border highlight
    $penBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 255, 255, 255), [Math]::Max(1.0, $size * 0.02))
    $g.DrawPath($penBorder, $path)
    
    # Center truck coordinate box
    $tSize = $rectSize * 0.65
    $tx = $pad + ($rectSize - $tSize) / 2
    $ty = $pad + ($rectSize - $tSize) / 2
    $scale = $tSize / 24.0
    
    $penWhite = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [Math]::Max(1.5, 2.0 * $scale))
    $penWhite.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penWhite.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penWhite.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    
    # Cargo box: x=1, y=3, w=15, h=13 (rx=2)
    $boxX = $tx + (1.0 * $scale)
    $boxY = $ty + (3.0 * $scale)
    $boxW = 15.0 * $scale
    $boxH = 13.0 * $scale
    $boxR = 2.0 * $scale
    $boxD = $boxR * 2
    $boxPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $boxPath.AddArc($boxX, $boxY, $boxD, $boxD, 180, 90)
    $boxPath.AddArc($boxX + $boxW - $boxD, $boxY, $boxD, $boxD, 270, 90)
    $boxPath.AddArc($boxX + $boxW - $boxD, $boxY + $boxH - $boxD, $boxD, $boxD, 0, 90)
    $boxPath.AddArc($boxX, $boxY + $boxH - $boxD, $boxD, $boxD, 90, 90)
    $boxPath.CloseFigure()
    $g.DrawPath($penWhite, $boxPath)
    
    # Truck cab: M16 8h4l3 3v5h-7V8z
    $cabPoints = @(
        [System.Drawing.PointF]::new($tx + 16.0 * $scale, $ty + 8.0 * $scale),
        [System.Drawing.PointF]::new($tx + 20.0 * $scale, $ty + 8.0 * $scale),
        [System.Drawing.PointF]::new($tx + 23.0 * $scale, $ty + 11.0 * $scale),
        [System.Drawing.PointF]::new($tx + 23.0 * $scale, $ty + 16.0 * $scale),
        [System.Drawing.PointF]::new($tx + 16.0 * $scale, $ty + 16.0 * $scale)
    )
    $g.DrawPolygon($penWhite, $cabPoints)
    
    # Cab window
    if ($size -ge 32) {
        $winPoints = @(
            [System.Drawing.PointF]::new($tx + 17.5 * $scale, $ty + 9.5 * $scale),
            [System.Drawing.PointF]::new($tx + 19.8 * $scale, $ty + 9.5 * $scale),
            [System.Drawing.PointF]::new($tx + 21.8 * $scale, $ty + 11.8 * $scale),
            [System.Drawing.PointF]::new($tx + 17.5 * $scale, $ty + 11.8 * $scale)
        )
        $winPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(210, 255, 255, 255), [Math]::Max(1.0, 1.2 * $scale))
        $g.DrawPolygon($winPen, $winPoints)
        $winPen.Dispose()
    }
    
    # Wheels: circle cx=5.5, cy=18.5, r=2.5 and cx=18.5, cy=18.5, r=2.5
    $wR = 2.4 * $scale
    $wD = $wR * 2
    $w1x = $tx + (5.5 * $scale) - $wR
    $w1y = $ty + (18.5 * $scale) - $wR
    $w2x = $tx + (18.5 * $scale) - $wR
    $w2y = $ty + (18.5 * $scale) - $wR
    
    $wheelBgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 88, 12))
    $g.FillEllipse($wheelBgBrush, $w1x, $w1y, $wD, $wD)
    $g.FillEllipse($wheelBgBrush, $w2x, $w2y, $wD, $wD)
    $g.DrawEllipse($penWhite, $w1x, $w1y, $wD, $wD)
    $g.DrawEllipse($penWhite, $w2x, $w2y, $wD, $wD)
    
    if ($size -ge 32) {
        $hubR = 0.8 * $scale
        $hubD = $hubR * 2
        $hubBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $g.FillEllipse($hubBrush, $tx + (5.5 * $scale) - $hubR, $ty + (18.5 * $scale) - $hubR, $hubD, $hubD)
        $g.FillEllipse($hubBrush, $tx + (18.5 * $scale) - $hubR, $ty + (18.5 * $scale) - $hubR, $hubD, $hubD)
        $hubBrush.Dispose()
    }
    
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngBuffers += ,@($size, $ms.ToArray())
    
    $g.Dispose()
    $bmp.Dispose()
    $brush.Dispose()
    $penWhite.Dispose()
    $wheelBgBrush.Dispose()
    $ms.Dispose()
}

# Assemble ICO file
$fs = [System.IO.File]::Create($icoPath)
$bw = New-Object System.IO.BinaryWriter($fs)

# ICONDIR
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type (1 = ICO)
$bw.Write([uint16]$pngBuffers.Count) # Image Count

# Calculate initial offset for image data: header (6 bytes) + entries (16 bytes * count)
$offset = 6 + ($pngBuffers.Count * 16)

foreach ($entry in $pngBuffers) {
    $sz = $entry[0]
    $bytes = $entry[1]
    
    $wByte = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }
    $hByte = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }
    
    $bw.Write($wByte) # Width
    $bw.Write($hByte) # Height
    $bw.Write([byte]0) # Color count
    $bw.Write([byte]0) # Reserved
    $bw.Write([uint16]1) # Color planes
    $bw.Write([uint16]32) # Bits per pixel
    $bw.Write([uint32]$bytes.Length) # Image size in bytes
    $bw.Write([uint32]$offset) # Image data offset
    
    $offset += $bytes.Length
}

foreach ($entry in $pngBuffers) {
    $bw.Write($entry[1])
}

$bw.Flush()
$bw.Close()
$fs.Close()
Write-Host "ICO successfully created at: $icoPath ($([System.IO.FileInfo]::new($icoPath).Length) bytes)"
