class Chicken extends MovableObject {
    posY = 345;
    height = 80;
    width = 60;
    IMAGES = {
        IMAGES_WALKING: [
            './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ]
    }


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.posX = 300 + Math.random() * 2500;
        super.loadAllImages(this.IMAGES).then(this.assetsAreLoaded = true);
        this.speed = this.speed + Math.random() * 0.1;
    }


    /**
     * animation of the chicken when it is walking
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES.IMAGES_WALKING)
        }, 500);
        setStoppableInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    }
}