class Character extends MovableObject {
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    speed = 8;
    walkingAudio = new Audio('./../audio/walking.mp3')


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walkingAudio.pause();
            if (this.world.keyboard.RIGHT && this.posX < this.world.level.levelEndPosX) {
                this.posX += this.speed;
                this.otherDirection = false;
                this.walkingAudio.play();
            }
            if (this.world.keyboard.LEFT && this.posX > 102) {
                this.posX -= this.speed;
                this.otherDirection = true;
                this.walkingAudio.play();
            }
            this.world.cameraPosX = -this.posX + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 150);
    }


    jump() {

    }
}