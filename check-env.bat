@echo off
chcp 65001
cls
title 环境检查
color 0A

echo [检查] Node.js环境...
node -v > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未安装Node.js，请访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)
echo [成功] Node.js已安装

echo [检查] 项目依赖...
if not exist "node_modules" (
    echo [信息] 正在安装依赖...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)
echo [成功] 依赖已安装

echo [检查] Express模块...
if not exist "node_modules\express" (
    echo [信息] 正在安装Express...
    call npm install express
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] Express安装失败
        pause
        exit /b 1
    )
)
echo [成功] Express已安装

echo [信息] 环境检查完成
echo [信息] 3秒后启动游戏...
timeout /t 3 /nobreak > nul

start http://localhost:3000
start start-game.bat 