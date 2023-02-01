class Bottle extends ThrowableObject {
    posY = 370;

    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.posX = 200 + Math.random() * 1000;
    }
}