class Bottle extends MovableObject {
    height = 75;
    width = 75;
    posY = 375;

    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.posX = 200 + Math.random() * 1000;
    }
}