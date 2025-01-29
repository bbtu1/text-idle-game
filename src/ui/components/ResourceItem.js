import { ResourceDisplayConfig } from '../../config/resources.js';

/**
 * 资源项组件类
 * 显示单个资源的信息
 */
export default class ResourceItem {
    /**
     * 构造函数
     * @param {string} resourceId - 资源ID
     * @param {Object} config - 资源配置
     */
    constructor(resourceId, config) {
        this.resourceId = resourceId;
        this.config = config;
        this.element = document.createElement('div');
        this.element.className = 'resource-item';
        // 初始化显示
        this.update(0, this.config.baseCapacity, this.config.baseProduction);
    }

    /**
     * 获取组件的DOM元素
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * 更新资源显示
     * @param {number} amount - 当前数量
     * @param {number} capacity - 存储上限
     * @param {number} production - 每秒产量
     */
    update(amount, capacity, production) {
        // 格式化数字显示
        const formattedAmount = ResourceDisplayConfig.formatNumber(amount);
        const formattedCapacity = ResourceDisplayConfig.formatNumber(capacity);
        const formattedProduction = ResourceDisplayConfig.formatProduction(production);

        // 更新显示内容
        this.element.textContent = `${this.config.name} ${formattedAmount}/${formattedCapacity} ${formattedProduction}`;
    }
} 