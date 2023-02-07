class Character extends MovableObject {
    posY = 160;
    offsetY = 70;
    offsetX = 35;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    energy = 100;
    speed = 8;
    walkingAudio = new Audio('./audio/walking.mp3');
    idleTimeout = 0;
    collectedBottles = [];


    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setStoppableInterval(() => {
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


        setStoppableInterval(() => {
            this.characterIdle();
            if (this.isDead()) {
                this.idleTimeout = 0;
                this.playAnimation(this.IMAGES_DEAD);
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.idleTimeout = 0;
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.isAboveGround()) {
                this.idleTimeout = 0;
                this.playAnimation(this.IMAGES_JUMPING);
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.idleTimeout = 0;
                this.jump();
            }
            if (this.world.keyboard.THROW) {
                this.idleTimeout = 0;
            }
            if (this.isHurt()) {
                this.idleTimeout = 0;
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 150)
    }

    characterIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleTimeout += 150;
        if (this.idleTimeout >= 5000) {
            this.playAnimation(this.IMAGES_SLEEPING);
        }
    }
}