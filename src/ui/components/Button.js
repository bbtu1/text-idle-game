export default class Button {
    constructor({
        id = '',
        text = '',
        onClick = () => {},
        className = '',
        disabled = false,
        type = 'default', // default, primary, success, warning, danger
        size = 'medium',  // small, medium, large
        cooldown = 0      // 冷却时间（毫秒）
    }) {
        this.element = document.createElement('button');
        this.id = id;
        this.text = text;
        this.onClick = onClick;
        this.disabled = disabled;
        this.cooldown = cooldown;
        this.cooldownTimer = null;
        this.originalText = text;

        this.initialize(className, type, size);
        this.setupEventListeners();
    }

    initialize(className, type, size) {
        // 设置基本属性
        this.element.id = this.id;
        this.element.textContent = this.text;
        this.element.disabled = this.disabled;

        // 添加基本类名
        this.element.classList.add('game-btn');
        
        // 添加类型类名
        this.element.classList.add(`game-btn-${type}`);
        
        // 添加尺寸类名
        this.element.classList.add(`game-btn-${size}`);

        // 添加自定义类名
        if (className) {
            this.element.classList.add(className);
        }
    }

    setupEventListeners() {
        this.element.addEventListener('click', (e) => {
            if (this.disabled) return;

            // 执行点击回调
            this.onClick(e);

            // 如果设置了冷却时间，开始冷却
            if (this.cooldown > 0) {
                this.startCooldown();
            }
        });
    }

    startCooldown() {
        this.disabled = true;
        this.element.disabled = true;
        
        let remainingTime = this.cooldown;
        
        // 更新冷却时间显示
        const updateCooldown = () => {
            remainingTime -= 100;
            const seconds = (remainingTime / 1000).toFixed(1);
            this.element.textContent = `${this.originalText} (${seconds}s)`;

            if (remainingTime <= 0) {
                clearInterval(this.cooldownTimer);
                this.disabled = false;
                this.element.disabled = false;
                this.element.textContent = this.originalText;
            }
        };

        this.cooldownTimer = setInterval(updateCooldown, 100);
        updateCooldown();
    }

    // 设置按钮文本
    setText(text) {
        this.text = text;
        this.originalText = text;
        this.element.textContent = text;
    }

    // 启用按钮
    enable() {
        this.disabled = false;
        this.element.disabled = false;
    }

    // 禁用按钮
    disable() {
        this.disabled = true;
        this.element.disabled = true;
    }

    // 获取按钮元素
    getElement() {
        return this.element;
    }

    // 销毁按钮
    destroy() {
        if (this.cooldownTimer) {
            clearInterval(this.cooldownTimer);
        }
        this.element.remove();
    }
} 