class ThrowableObject extends MovableObject {
    constructor(posX, posY) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');;
        this.posX = posX;
        this.posY = posY;
        this.width = 80;
        this.height = 80;
        this.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.posX += 10;
        }, 50);
    }
}