/**
 * 面板基类
 * 这是所有游戏面板的基础类，提供了基本的面板功能
 * 其他具体的面板（如资源面板、建筑面板等）都继承自这个类
 */
export default class Panel {
    /**
     * 面板构造函数
     * @param {string} id - 面板的唯一标识符，用于在DOM中识别这个面板
     * @param {string} title - 面板的标题文本，如果不提供则为空字符串
     */
    constructor(id, title = '') {
        // 保存面板的唯一标识符
        this.id = id;
        // 保存面板的标题
        this.title = title;
        // 面板的DOM元素，初始为null，在initialize方法中创建
        this.element = null;
        // 初始化面板
        this.initialize();
    }

    /**
     * 初始化面板
     * 创建面板的DOM结构和基本样式
     */
    initialize() {
        // 创建一个div元素作为面板的容器
        this.element = document.createElement('div');
        // 设置面板的id，用于CSS选择和DOM操作
        this.element.id = this.id;
        // 添加panel类名，应用基本的面板样式
        this.element.className = 'panel';
        
        // 如果提供了标题，则创建标题元素
        if (this.title) {
            // 创建h2元素作为标题
            const titleElement = document.createElement('h2');
            // 添加panel-title类名，应用标题样式
            titleElement.className = 'panel-title';
            // 设置标题文本
            titleElement.textContent = this.title;
            // 将标题添加到面板中
            this.element.appendChild(titleElement);
        }
    }

    /**
     * 渲染面板内容
     * 这是一个抽象方法，需要由子类实现
     * 用于渲染面板的具体内容
     * @throws {Error} 如果子类没有实现这个方法，则抛出错误
     */
    render() {
        // 抛出错误，提醒开发者需要在子类中实现这个方法
        throw new Error('Panel render method must be implemented');
    }

    /**
     * 更新面板数据
     * 这是一个抽象方法，需要由子类实现
     * 用于更新面板显示的数据
     * @param {any} data - 要更新的数据
     * @throws {Error} 如果子类没有实现这个方法，则抛出错误
     */
    update(data) {
        // 抛出错误，提醒开发者需要在子类中实现这个方法
        throw new Error('Panel update method must be implemented');
    }

    /**
     * 获取面板的DOM元素
     * @returns {HTMLElement} 返回面板的DOM元素
     */
    getElement() {
        return this.element;
    }

    /**
     * 销毁面板
     * 从DOM中移除面板元素，清理资源
     */
    destroy() {
        // 如果面板元素存在，则从DOM中移除
        if (this.element) {
            this.element.remove();
        }
    }
} 