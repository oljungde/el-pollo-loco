class Character extends MovableObject {
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]
    world;
    speed = 8;
    walkingAudio = new Audio('./../audio/walking.mp3')


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
            this.walkingAudio.pause();
            if (this.world.keyboard.RIGHT && this.posX < this.world.level.levelEndPosX) {
                this.moveRight();
                this.otherDirection = false;
                this.walkingAudio.play();
            }
            if (this.world.keyboard.LEFT && this.posX > 102) {
                this.moveLeft();
                this.otherDirection = true;
                this.walkingAudio.play();
            }
            this.world.cameraPosX = -this.posX + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
        }, 150);
    }
}