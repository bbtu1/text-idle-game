/**
 * 存档管理器类
 * 负责游戏数据的保存和加载
 */
export default class SaveManager {
    /**
     * 构造函数
     * @param {Object} game - 游戏实例
     */
    constructor(game) {
        this.game = game;
        this.saveKey = 'textIdleGameSave'; // 存档在localStorage中的键名
        this.autoSaveInterval = 60000; // 自动保存间隔（毫秒）
        this.setupAutoSave();
    }

    /**
     * 设置自动保存
     */
    setupAutoSave() {
        // 每分钟自动保存一次
        setInterval(() => this.saveGame(), this.autoSaveInterval);
    }

    /**
     * 保存游戏数据
     */
    saveGame() {
        try {
            const saveData = {
                resources: this.game.resourceManager.resources,
                lastSaveTime: Date.now()
            };
            
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            
            // 如果有日志面板，添加保存成功的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('游戏已自动保存', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('保存游戏失败:', error);
            
            // 如果有日志面板，添加保存失败的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('保存游戏失败: ' + error.message, 'error');
            }
            
            return false;
        }
    }

    /**
     * 加载游戏数据
     */
    loadGame() {
        try {
            const savedData = localStorage.getItem(this.saveKey);
            if (!savedData) {
                return false;
            }

            const saveData = JSON.parse(savedData);
            
            // 恢复资源数据
            if (saveData.resources) {
                Object.entries(saveData.resources).forEach(([resourceId, data]) => {
                    const resource = this.game.resourceManager.resources[resourceId];
                    if (resource) {
                        resource.amount = data.amount;
                        resource.capacity = data.capacity;
                        resource.production = data.production;
                        resource.unlocked = data.unlocked;
                    }
                });
                
                // 触发资源更新事件
                this.game.resourceManager.triggerUpdate();
            }
            
            // 如果有日志面板，添加加载成功的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('游戏数据已加载', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('加载游戏失败:', error);
            
            // 如果有日志面板，添加加载失败的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('加载游戏失败: ' + error.message, 'error');
            }
            
            return false;
        }
    }

    /**
     * 重置游戏数据
     */
    resetGame() {
        try {
            localStorage.removeItem(this.saveKey);
            
            // 重新初始化资源管理器
            this.game.resourceManager.initialize(true);
            
            // 如果有日志面板，添加重置成功的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('游戏数据已重置', 'warning');
            }
            
            return true;
        } catch (error) {
            console.error('重置游戏失败:', error);
            
            // 如果有日志面板，添加重置失败的日志
            if (this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('重置游戏失败: ' + error.message, 'error');
            }
            
            return false;
        }
    }
} 