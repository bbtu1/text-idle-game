import { ResourceConfig } from '../config/resources.js';

/**
 * 资源管理器类
 * 负责管理游戏中所有资源的数据和操作
 */
export default class ResourceManager {
    /**
     * 构造函数
     * @param {Object} game - 游戏实例的引用
     */
    constructor(game) {
        // 保存游戏实例引用
        this.game = game;
        
        // 存储所有资源的数据
        this.resources = {};
        
        // 初始化资源数据
        this.initialize();
    }

    /**
     * 初始化资源数据
     * 根据配置文件设置所有资源的初始状态
     * @param {boolean} force - 是否强制重置所有数据
     */
    initialize(force = false) {
        // 如果是强制重置或resources为空，则初始化所有资源
        if (force || Object.keys(this.resources).length === 0) {
            // 遍历资源配置，初始化每个资源的数据
            Object.entries(ResourceConfig).forEach(([id, config]) => {
                this.resources[id] = {
                    amount: 0,                    // 当前数量
                    capacity: config.baseCapacity, // 存储上限
                    production: 0,                // 当前产量（每秒）
                    baseProduction: config.baseProduction, // 基础产量
                    unlocked: config.visible      // 是否已解锁
                };
            });
            // 触发初始更新
            this.triggerUpdate();
        }
    }

    /**
     * 增加资源数量
     * @param {string} resourceId - 资源ID
     * @param {number} amount - 要增加的数量
     * @returns {boolean} - 是否增加成功
     */
    addResource(resourceId, amount) {
        // 检查资源是否存在
        if (!this.resources[resourceId]) {
            console.error(`资源 ${resourceId} 不存在`);
            return false;
        }

        // 获取资源数据
        const resource = this.resources[resourceId];
        
        // 计算增加后的数量
        const newAmount = resource.amount + amount;
        
        // 确保不超过存储上限
        resource.amount = Math.min(newAmount, resource.capacity);

        // 触发资源更新事件
        this.triggerUpdate();
        
        return true;
    }

    /**
     * 减少资源数量
     * @param {string} resourceId - 资源ID
     * @param {number} amount - 要减少的数量
     * @returns {boolean} - 是否减少成功
     */
    removeResource(resourceId, amount) {
        // 检查资源是否存在
        if (!this.resources[resourceId]) {
            console.error(`资源 ${resourceId} 不存在`);
            return false;
        }

        // 获取资源数据
        const resource = this.resources[resourceId];
        
        // 检查是否有足够的资源
        if (resource.amount < amount) {
            return false;
        }

        // 减少资源数量
        resource.amount -= amount;

        // 触发资源更新事件
        this.triggerUpdate();
        
        return true;
    }

    /**
     * 获取资源数据
     * @param {string} resourceId - 资源ID
     * @returns {Object|null} - 资源数据或null（如果资源不存在）
     */
    getResource(resourceId) {
        return this.resources[resourceId] || null;
    }

    /**
     * 获取所有资源的数据
     * @returns {Object} - 所有资源的数据
     */
    getResources() {
        return this.resources;
    }

    /**
     * 检查是否有足够的资源
     * @param {Object} requirements - 需求的资源及数量 {resourceId: amount}
     * @returns {boolean} - 是否满足需求
     */
    hasEnoughResources(requirements) {
        return Object.entries(requirements).every(([resourceId, amount]) => {
            const resource = this.resources[resourceId];
            return resource && resource.amount >= amount;
        });
    }

    /**
     * 更新资源的产量
     * @param {string} resourceId - 资源ID
     * @param {number} newProduction - 新的产量值
     */
    updateProduction(resourceId, newProduction) {
        if (this.resources[resourceId]) {
            this.resources[resourceId].production = newProduction;
            this.triggerUpdate();
        }
    }

    /**
     * 更新资源的存储上限
     * @param {string} resourceId - 资源ID
     * @param {number} newCapacity - 新的存储上限
     */
    updateCapacity(resourceId, newCapacity) {
        if (this.resources[resourceId]) {
            this.resources[resourceId].capacity = newCapacity;
            // 如果当前数量超过新的上限，则调整为上限值
            if (this.resources[resourceId].amount > newCapacity) {
                this.resources[resourceId].amount = newCapacity;
            }
            this.triggerUpdate();
        }
    }

    /**
     * 触发资源更新事件
     * 通知UI更新显示
     */
    triggerUpdate() {
        // 创建自定义事件
        const event = new CustomEvent('resourceUpdate', {
            detail: this.resources
        });
        // 触发事件
        document.dispatchEvent(event);
    }

    /**
     * 每帧更新
     * 处理资源的自动产出
     * @param {number} deltaTime - 距离上一帧的时间（秒）
     */
    update(deltaTime) {
        // 更新每个资源的数量（基于产量）
        Object.entries(this.resources).forEach(([resourceId, resource]) => {
            if (resource.production > 0) {
                // 计算这一帧产出的资源量
                const produced = resource.production * deltaTime;
                // 增加资源（考虑存储上限）
                this.addResource(resourceId, produced);
            }
        });
    }
} 