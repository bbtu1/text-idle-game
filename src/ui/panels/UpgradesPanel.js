import Panel from './Panel.js';
import Button from '../components/Button.js';

export default class UpgradesPanel extends Panel {
    constructor(game) {
        super('upgrades-panel', '升级');
        this.game = game;
        this.upgrades = [];
        this.setupPanel();
    }

    setupPanel() {
        // 创建升级列表容器
        this.upgradesContainer = document.createElement('div');
        this.upgradesContainer.className = 'upgrades-container';
        this.element.appendChild(this.upgradesContainer);
    }

    createUpgradeElement(upgrade) {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade-item';
        
        // 升级信息
        const info = document.createElement('div');
        info.className = 'upgrade-info';
        info.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p class="upgrade-desc">${upgrade.description || ''}</p>
            <p class="upgrade-effect">效果: ${upgrade.effect}</p>
        `;
        
        // 购买按钮
        const buyButton = new Button({
            id: `upgrade-${upgrade.id}`,
            text: `升级 (${upgrade.cost}金币)`,
            type: 'warning',
            size: 'small',
            onClick: () => this.purchaseUpgrade(upgrade.id)
        });

        // 如果升级已经购买，禁用按钮
        if (upgrade.purchased) {
            buyButton.disable();
            buyButton.setText('已升级');
        }

        upgradeElement.appendChild(info);
        upgradeElement.appendChild(buyButton.getElement());
        
        return upgradeElement;
    }

    purchaseUpgrade(upgradeId) {
        if (this.game.upgradeManager) {
            this.game.upgradeManager.purchaseUpgrade(upgradeId);
            this.update(this.game.upgradeManager.getAvailableUpgrades());
        }
    }

    render() {
        this.update(this.upgrades);
    }

    update(upgrades) {
        this.upgrades = upgrades;
        this.upgradesContainer.innerHTML = '';
        
        upgrades.forEach(upgrade => {
            const upgradeElement = this.createUpgradeElement(upgrade);
            this.upgradesContainer.appendChild(upgradeElement);
        });
    }
} 