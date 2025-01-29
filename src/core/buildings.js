// src/core/buildings.js
export default class BuildingSystem {
    constructor() {
        this.buildings = [
            { 
                id: 'mine',
                name: '石矿场',
                baseCost: 10,
                costGrowth: 1.15,
                quantity: 0,
                output: 1
            }
        ];
    }

    purchaseBuilding(playerResources, buildingId) {
        const building = this.getBuilding(buildingId);
        const cost = this.calculateCurrentCost(building);
        
        if (playerResources.gold >= cost) {
            playerResources.gold -= cost;
            building.quantity++;
            return true;
        }
        return false;
    }

    calculateCurrentCost(building) {
        return Math.floor(building.baseCost * Math.pow(building.costGrowth, building.quantity));
    }
}