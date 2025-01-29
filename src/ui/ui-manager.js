// 导入需要的组件
// Button是通用按钮组件
import Button from './components/Button.js';
// 导入主要的面板组件
import ResourcesPanel from './panels/ResourcesPanel.js';
import BuildingsPanel from './panels/BuildingsPanel.js';
import LogsPanel from './panels/LogsPanel.js';

/**
 * UI管理器类
 * 负责管理游戏的所有界面元素，包括面板和按钮
 */
export default class UIManager {
    /**
     * 构造函数
     * @param {Object} game - 游戏核心实例，包含游戏的核心逻辑
     */
    constructor(game) {
        console.log('UIManager 初始化开始'); // 添加日志
        // 保存游戏实例的引用
        this.game = game;
        // 存储所有面板的容器
        this.container = document.querySelector('.panels-container');
        this.panels = {};
        // 存储所有按钮的容器
        this.buttons = {};
        // 初始化UI
        this.initialize();
        console.log('UIManager 初始化完成'); // 添加日志
    }

    /**
     * 初始化方法
     * 设置所有UI组件
     */
    initialize() {
        console.log('UIManager.initialize() 开始'); // 添加日志
        if (!this.container) {
            console.error('找不到面板容器元素！');
            return;
        }

        // 设置游戏面板
        this.setupPanels();
        // 设置游戏按钮
        this.setupButtons();
        // 设置事件监听器
        this.setupEventListeners();
        console.log('UIManager.initialize() 完成'); // 添加日志
    }

    /**
     * 设置游戏面板
     * 创建并初始化所有游戏面板
     */
    setupPanels() {
        console.log('设置游戏面板'); // 添加日志
        // 创建三个主要面板：资源面板、建筑面板和日志面板
        this.panels.resources = new ResourcesPanel(this.game);
        this.panels.buildings = new BuildingsPanel(this.game);
        this.panels.logs = new LogsPanel(this.game);

        // 获取页面中的main元素和面板容器
        const main = document.querySelector('main');
        const panelsContainer = document.querySelector('.panels-container');

        // 如果页面中没有面板容器，创建一个新的
        if (!panelsContainer) {
            const newPanelsContainer = document.createElement('div');
            newPanelsContainer.className = 'panels-container';
            main.appendChild(newPanelsContainer);
        }

        // 获取面板容器（使用已存在的或新创建的）
        const container = panelsContainer || newPanelsContainer;
        // 清空容器中的现有内容
        container.innerHTML = '';

        // 将所有面板添加到容器中
        container.appendChild(this.panels.resources.getElement());
        container.appendChild(this.panels.buildings.getElement());
        container.appendChild(this.panels.logs.getElement());

        // 添加一条初始日志
        this.panels.logs.addLog('游戏启动成功', 'success');
        console.log('面板设置完成'); // 添加日志
    }

    /**
     * 设置游戏按钮
     * 创建并初始化所有游戏按钮
     */
    setupButtons() {
        // 这里可以添加其他按钮的初始化代码
    }

    /**
     * 设置事件监听器
     * 监听游戏中的各种事件
     */
    setupEventListeners() {
        // 监听资源更新事件
        document.addEventListener('resourceUpdate', (e) => {
            this.updateResources(e.detail);
        });

        // 监听建筑更新事件
        document.addEventListener('buildingUpdate', (e) => {
            this.updateBuildings(e.detail);
        });
    }

    /**
     * 处理保存游戏的逻辑
     */
    handleSaveGame() {
        try {
            // 这里后续会添加实际的保存游戏逻辑
            console.log('保存游戏...');
            this.panels.logs.addLog('游戏已保存', 'success');
        } catch (error) {
            // 如果保存过程出错
            console.error('保存游戏失败:', error);
            this.panels.logs.addLog('保存游戏失败: ' + error.message, 'error');
        }
    }

    /**
     * 更新资源面板
     * @param {Object} resources - 资源数据
     */
    updateResources(resources) {
        this.panels.resources.update(resources);
    }

    /**
     * 更新建筑面板
     * @param {Object} buildings - 建筑数据
     */
    updateBuildings(buildings) {
        this.panels.buildings.update(buildings);
    }

    /**
     * 更新所有UI元素
     * 当游戏状态发生重大变化时调用
     */
    update() {
        // 更新所有面板
        Object.values(this.panels).forEach(panel => {
            if (panel && typeof panel.update === 'function') {
                panel.update();
            }
        });
    }
}