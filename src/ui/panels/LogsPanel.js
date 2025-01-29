import Panel from './Panel.js';

/**
 * 日志面板类
 * 用于显示游戏中的各种事件和消息
 */
export default class LogsPanel extends Panel {
    /**
     * 构造函数
     * @param {Object} game - 游戏实例
     */
    constructor(game) {
        super('logs-panel', '游戏日志');
        this.game = game;
        this.logs = [];
        this.maxLogs = 100; // 最多保存100条日志
        this.setupPanel();
    }

    /**
     * 设置面板
     */
    setupPanel() {
        this.logsContainer = document.createElement('div');
        this.logsContainer.className = 'logs-container';
        this.element.appendChild(this.logsContainer);
    }

    /**
     * 添加一条日志
     * @param {string} message - 日志消息
     * @param {string} type - 日志类型 (info/success/warning/error)
     */
    addLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logItem = document.createElement('div');
        logItem.className = `log-item log-${type}`;
        logItem.innerHTML = `<span class="log-timestamp">[${timestamp}]</span> ${message}`;
        
        this.logsContainer.insertBefore(logItem, this.logsContainer.firstChild);
        this.logs.unshift({ message, type, timestamp });

        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
            if (this.logsContainer.lastChild) {
                this.logsContainer.lastChild.remove();
            }
        }
    }

    /**
     * 清空日志
     */
    clearLogs() {
        this.logs = [];
        this.logsContainer.innerHTML = '';
    }

    /**
     * 渲染面板
     */
    render() {
        this.logsContainer.innerHTML = '';
        this.logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = `log-item log-${log.type}`;
            logItem.innerHTML = `<span class="log-timestamp">[${log.timestamp}]</span> ${log.message}`;
            this.logsContainer.appendChild(logItem);
        });
    }

    /**
     * 更新面板
     * 由于日志是实时添加的，这个方法可能用不到
     */
    update() {
        this.render();
    }
} 