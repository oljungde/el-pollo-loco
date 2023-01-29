class ThrowableObject extends MovableObject {
    posY = 370;
    posX = 200;

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.posX = this.posX + Math.random() * 1000;
        this.width = 75;
        this.height = 75;
        // thids.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.posX += 10;
        }, 50);
    }
}