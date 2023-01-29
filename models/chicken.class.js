class Chicken extends MovableObject {
    posY = 370;
    height = 80;
    width = 60;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentImage = 0;


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.posX = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.8;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    }
}