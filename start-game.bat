@echo off
chcp 65001
cls
title 文字放置游戏启动器
color 0A

echo [信息] 正在启动游戏服务器...
echo [信息] 请勿关闭此窗口...

cd /d "%~dp0"
node server.js

pause 