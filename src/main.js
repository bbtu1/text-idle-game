import Game from './Game.js';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，开始初始化游戏'); // 添加日志
    
    // 创建游戏实例
    const game = new Game();
    
    // 初始化游戏
    game.initialize();
    
    console.log('游戏初始化完成'); // 添加日志
    
    // 将游戏实例暴露到全局作用域（仅用于调试）
    window.game = game;
});