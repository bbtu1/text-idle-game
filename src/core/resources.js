// src/core/resources.js 扩展
addAutoProduction() {
    setInterval(() => {
        this.buildings.forEach(building => {
            this.resources[building.outputType] += building.quantity * building.outputRate;
        });
        this._triggerUpdate();
    }, 1000); // 每秒自动生产
}