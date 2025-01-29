# 设置错误操作
$ErrorActionPreference = "Stop"

# 设置输出编码为UTF-8
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

try {
    # 获取脚本所在目录
    $scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
    Write-Host "当前目录: $scriptPath" -ForegroundColor Gray

    # 切换到项目目录
    Set-Location $scriptPath
    
    # 检查是否安装了Node.js
    try {
        $nodeVersion = node -v
        Write-Host "✓ 检测到Node.js版本: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ 未检测到Node.js，请先安装Node.js" -ForegroundColor Red
        Write-Host "下载地址: https://nodejs.org/" -ForegroundColor Yellow
        Write-Host "错误信息: $_" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }

    # 检查npm是否可用
    try {
        $npmVersion = npm -v
        Write-Host "✓ 检测到npm版本: $npmVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ npm命令不可用，请重新安装Node.js" -ForegroundColor Red
        Write-Host "错误信息: $_" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }

    # 检查express模块是否安装
    if (-not (Test-Path "node_modules/express")) {
        Write-Host "正在安装express模块..." -ForegroundColor Yellow
        npm install express
        if ($LASTEXITCODE -ne 0) {
            throw "Express安装失败"
        }
        Write-Host "✓ Express安装完成" -ForegroundColor Green
    }

    # 检查是否安装了依赖
    if (-not (Test-Path "node_modules")) {
        Write-Host "正在安装项目依赖..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            throw "依赖安装失败，请检查网络连接或手动运行 npm install"
        }
        Write-Host "✓ 依赖安装完成" -ForegroundColor Green
    } else {
        Write-Host "✓ 项目依赖已安装" -ForegroundColor Green
    }

    # 检查server.js是否存在
    if (-not (Test-Path "server.js")) {
        throw "找不到server.js文件"
    }

    # 启动服务器
    Write-Host "`n启动游戏服务器..." -ForegroundColor Cyan
    Write-Host "请稍候，浏览器将自动打开游戏页面" -ForegroundColor Cyan
    Write-Host "按 Ctrl+C 可以停止服务器`n" -ForegroundColor Yellow

    # 等待3秒后打开浏览器
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000"

    # 启动Node服务器
    node server.js

} catch {
    Write-Host "`n错误: $_" -ForegroundColor Red
    Write-Host "堆栈跟踪: $($_.ScriptStackTrace)" -ForegroundColor Red
    Write-Host "`n按任意键退出..." -ForegroundColor Yellow  # 修正后的字符串
    Read-Host
    exit 1
}