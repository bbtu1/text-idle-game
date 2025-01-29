import UIManager from './ui/ui-manager.js';
import ResourceManager from './managers/ResourceManager.js';
import SaveManager from './managers/SaveManager.js';

/**
 * 游戏主类
 * 负责协调游戏的各个系统和管理器
 */
export default class Game {
    /**
     * 构造函数
     */
    constructor() {
        // 初始化各个管理器
        this.resourceManager = new ResourceManager(this);
        this.saveManager = new SaveManager(this);

        // 尝试加载存档
        this.saveManager.loadGame();
        
        this.uiManager = new UIManager(this);
        
        // 游戏时间相关
        this.lastUpdate = performance.now();
        this.running = false;

        // 添加页面关闭前的保存
        window.addEventListener('beforeunload', () => {
            this.saveManager.saveGame();
        });
    }

    /**
     * 初始化游戏
     */
    initialize() {
        // 初始化UI
        this.uiManager.initialize();
        
        // 开始游戏循环
        this.start();
    }

    /**
     * 开始游戏
     */
    start() {
        if (!this.running) {
            this.running = true;
            this.gameLoop();
        }
    }

    /**
     * 暂停游戏
     */
    pause() {
        this.running = false;
    }

    /**
     * 游戏主循环
     */
    gameLoop() {
        if (!this.running) return;

        // 计算时间差（转换为秒）
        const now = performance.now();
        const deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;

        // 更新游戏状态
        this.update(deltaTime);

        // 继续下一帧
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * 更新游戏状态
     * @param {number} deltaTime - 距离上一帧的时间（秒）
     */
    update(deltaTime) {
        // 更新资源
        this.resourceManager.update(deltaTime);
        
        // 更新UI
        this.uiManager.update();
    }
} 