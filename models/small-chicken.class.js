class SmallChicken extends MovableObject {
    posY = 355;
    height = 70;
    width = 50;
    IMAGES = {
        IMAGES_WALKING: [
            './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        ]
    }


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.posX = 300 + Math.random() * 2500;
        super.loadAllImages(this.IMAGES).then(this.assetsAreLoaded = true);
        this.speed = this.speed + Math.random() * 0.1;
    }


    /**
     * animation of the small chicken when it is walking
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