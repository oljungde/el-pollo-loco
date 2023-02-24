class Cloud extends MovableObject {
    height = 240;
    width = 360;
    posY = 25;


    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/2.png');
        this.posX = 0 + Math.random() * 3500;
        this.posY = this.posY + Math.random() * 10;
        this.speed = this.speed + Math.random() * 0.10;

    }


    /**
     * play the animation to move the clounds from right to left
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}