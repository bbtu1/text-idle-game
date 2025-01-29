import Panel from './Panel.js';
import Button from '../components/Button.js';

/**
 * 建筑面板类
 * 用于显示和管理游戏中的各种建筑
 */
export default class BuildingsPanel extends Panel {
    /**
     * 构造函数
     * @param {Object} game - 游戏实例
     */
    constructor(game) {
        super('buildings-panel', '建筑');
        this.game = game;
        this.buildings = []; // 初始化为空数组
        this.buttons = {};
        this.setupPanel();
    }

    /**
     * 设置面板
     */
    setupPanel() {
        // 创建按钮容器
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';

        // 创建伐木按钮
        this.buttons.chopWood = new Button({
            id: 'chop-wood-button',
            text: '伐木',
            type: 'primary',
            size: 'medium',
            onClick: () => this.handleChopWood()
        });

        // 创建建筑列表容器
        this.buildingsContainer = document.createElement('div');
        this.buildingsContainer.className = 'buildings-container';

        // 添加伐木按钮到按钮容器
        buttonsContainer.appendChild(this.buttons.chopWood.getElement());
        
        // 添加按钮容器和建筑容器到面板
        this.element.appendChild(buttonsContainer);
        this.element.appendChild(this.buildingsContainer);
    }

    /**
     * 处理伐木按钮点击
     */
    handleChopWood() {
        console.log('伐木按钮被点击'); // 添加日志
        // 增加木材数量
        if (this.game.resourceManager) {
            const success = this.game.resourceManager.addResource('wood', 1);
            console.log('添加木材结果:', success); // 添加日志
            // 添加日志
            if (success && this.game.uiManager && this.game.uiManager.panels.logs) {
                this.game.uiManager.panels.logs.addLog('获得了1个木材', 'info');
            }
        } else {
            console.error('resourceManager未初始化'); // 添加错误日志
        }
    }

    /**
     * 渲染面板
     */
    render() {
        this.update(this.buildings);
    }

    /**
     * 更新建筑显示
     * @param {Array} buildings - 建筑数据，如果未提供则使用当前的buildings数组
     */
    update(buildings = null) {
        // 如果提供了新的建筑数据，则更新
        if (buildings !== null) {
            this.buildings = buildings;
        }
        
        // 清空建筑容器
        this.buildingsContainer.innerHTML = '';
        
        // 如果有建筑数据，则显示建筑
        if (Array.isArray(this.buildings) && this.buildings.length > 0) {
            this.buildings.forEach(building => {
                const buildingElement = this.createBuildingElement(building);
                this.buildingsContainer.appendChild(buildingElement);
            });
        }
    }

    /**
     * 创建建筑元素
     * @param {Object} building - 建筑数据
     * @returns {HTMLElement}
     */
    createBuildingElement(building) {
        const buildingElement = document.createElement('div');
        buildingElement.className = 'building-item';
        
        // 建筑信息
        const info = document.createElement('div');
        info.className = 'building-info';
        info.innerHTML = `
            <h3>${building.name}</h3>
            <p class="building-desc">${building.description || ''}</p>
            <p class="building-stats">
                数量: <span class="building-quantity">${building.quantity}</span>
                产出: <span class="building-production">${building.production}/秒</span>
            </p>
        `;
        
        buildingElement.appendChild(info);
        return buildingElement;
    }
} 