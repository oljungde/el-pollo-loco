class SmallChicken extends MovableObject {
    posY = 380;
    height = 70;
    width = 50;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.posX = 200 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.1;
        this.animate();
    }


    /**
     * animation of the chicken when it is walking
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 500);
        setStoppableInterval(() => {
            // this.moveLeft()
        }, 1000 / 60);
    }
}