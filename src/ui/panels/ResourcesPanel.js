import Panel from './Panel.js';
import Button from '../components/Button.js';
import ResourceItem from '../components/ResourceItem.js';
import { ResourceConfig } from '../../config/resources.js';

/**
 * 资源面板类
 * 用于显示和管理游戏中的各种资源（如金币、木材等）
 * 继承自Panel基础类
 */
export default class ResourcesPanel extends Panel {
    /**
     * 构造函数
     * @param {Object} game - 游戏核心实例的引用，用于访问游戏数据和功能
     */
    constructor(game) {
        // 调用父类构造函数，设置面板ID和标题
        super('resources-panel', '资源');
        // 保存游戏实例的引用
        this.game = game;
        // 初始化资源组件映射
        this.resourceItems = new Map();
        // 设置面板的基本结构和内容
        this.setupPanel();
        this.setupEventListeners();
    }

    /**
     * 设置面板的基本结构和内容
     * 创建资源显示容器和采集按钮
     */
    setupPanel() {
        // 创建一个容器来显示资源列表
        this.resourcesContainer = document.createElement('div');
        // 添加CSS类名，用于样式设置
        this.resourcesContainer.className = 'resources-container';
        // 将容器添加到面板中
        this.element.appendChild(this.resourcesContainer);

        // 初始化所有资源项
        Object.entries(ResourceConfig).forEach(([resourceId, config]) => {
            // 创建资源项组件
            const resourceItem = new ResourceItem(resourceId, config);
            // 保存到Map中以便后续更新
            this.resourceItems.set(resourceId, resourceItem);
            // 如果资源默认可见，则添加到容器中
            if (config.visible) {
                this.resourcesContainer.appendChild(resourceItem.getElement());
            }
        });
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 监听资源更新事件
        document.addEventListener('resourceUpdate', (event) => {
            this.handleResourceUpdate(event.detail);
        });
    }

    /**
     * 处理资源更新事件
     * @param {Object} resources - 更新后的资源数据
     */
    handleResourceUpdate(resources) {
        // 更新每个资源的显示
        Object.entries(resources).forEach(([resourceId, data]) => {
            const resourceItem = this.resourceItems.get(resourceId);
            if (resourceItem) {
                // 如果资源已解锁但尚未显示，则添加到容器中
                if (data.unlocked && !this.resourcesContainer.contains(resourceItem.getElement())) {
                    this.resourcesContainer.appendChild(resourceItem.getElement());
                }
                // 更新资源数据显示
                resourceItem.update(data.amount, data.capacity, data.production);
            }
        });
    }

    /**
     * 更新面板
     */
    update() {
        // 获取最新的资源数据
        const resources = this.game.resourceManager.getResources();
        this.handleResourceUpdate(resources);
    }
} 