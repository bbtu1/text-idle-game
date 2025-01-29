/**
 * 资源类型枚举
 * 用于对资源进行分类
 */
export const ResourceType = {
    BASIC: 'basic',           // 基础资源
    MATERIAL: 'material',     // 材料资源
    ADVANCED: 'advanced',     // 高级资源
    SPECIAL: 'special'        // 特殊资源
};

/**
 * 资源配置
 * 定义游戏中所有资源的基础属性
 */
export const ResourceConfig = {
    wood: {
        name: '木材',           // 资源名称
        description: '基础建筑材料', // 资源描述
        baseCapacity: 100,     // 基础存储上限
        baseProduction: 0,     // 基础产量（每秒）
        visible: true,         // 是否默认可见
    },
    stone: {
        name: '石头',
        description: '坚固的建筑材料',
        baseCapacity: 50,
        baseProduction: 0,
        visible: false
    },
    food: {
        name: '食物',
        description: '维持人口所需的基础资源',
        baseCapacity: 200,
        baseProduction: 0,
        visible: false
    },
    // 材料资源
    plank: {
        id: 'plank',
        name: '木板',
        type: ResourceType.MATERIAL,
        description: '由木材加工而成',
        baseCapacity: 50,
        baseProduction: 0,
        color: '#DEB887',
        visible: false,
        order: 101,
        requires: ['wood']    // 需要解锁的前置资源
    }
    // 可以继续添加更多资源...
};

/**
 * 资源显示格式化配置
 */
export const ResourceDisplayConfig = {
    // 数值格式化配置
    formatNumber: (value) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(2) + 'M';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(2) + 'K';
        }
        return Math.floor(value);
    },
    
    // 产量格式化配置
    formatProduction: (value) => {
        const formatted = value >= 0 ? '+' + value.toFixed(1) : value.toFixed(1);
        return `${formatted}/s`;
    }
}; 