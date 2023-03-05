class Character extends MovableObject {
    posY = 140;
    offsetY = 120;
    offsetX = 80;
    IMAGES = {
        IMAGES_WALKING: [
            './img/2_character_pepe/2_walk/W-21.png',
            './img/2_character_pepe/2_walk/W-22.png',
            './img/2_character_pepe/2_walk/W-23.png',
            './img/2_character_pepe/2_walk/W-24.png',
            './img/2_character_pepe/2_walk/W-25.png',
            './img/2_character_pepe/2_walk/W-26.png'
        ],
        IMAGES_JUMPING: [
            './img/2_character_pepe/3_jump/J-31.png',
            './img/2_character_pepe/3_jump/J-32.png',
            './img/2_character_pepe/3_jump/J-33.png',
            './img/2_character_pepe/3_jump/J-34.png',
            './img/2_character_pepe/3_jump/J-35.png',
            './img/2_character_pepe/3_jump/J-36.png',
            './img/2_character_pepe/3_jump/J-37.png',
            './img/2_character_pepe/3_jump/J-38.png',
            './img/2_character_pepe/3_jump/J-39.png'
        ],
        IMAGES_HURT: [
            './img/2_character_pepe/4_hurt/H-41.png',
            './img/2_character_pepe/4_hurt/H-42.png',
            './img/2_character_pepe/4_hurt/H-43.png'
        ],
        IMAGES_DEAD: [
            './img/2_character_pepe/5_dead/D-51.png',
            './img/2_character_pepe/5_dead/D-52.png',
            './img/2_character_pepe/5_dead/D-53.png',
            './img/2_character_pepe/5_dead/D-54.png',
            './img/2_character_pepe/5_dead/D-55.png',
            './img/2_character_pepe/5_dead/D-56.png',
            './img/2_character_pepe/5_dead/D-57.png'
        ],
        IMAGES_IDLE: [
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
        ],
        IMAGES_SLEEPING: [
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
        ]
    }

    world;
    energy = 300;
    speed = 8;
    speedY = 4;
    idleTimeout = 0;
    collectedBottles = [];
    collectedCoins = 0;
    jumpOnEnemy = false;
    walkingAudio = new Audio('./audio/walking.mp3');
    hurtAudio = new Audio('./audio/hurt-character.mp3');
    collectBottleAudio = new Audio('./audio/bottle-collected.mp3');
    dyingAudio = new Audio('./audio/dying.mp3');
    jumpAudio = new Audio('./audio/jump.mp3');



    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        super.loadAllImages(this.IMAGES);
        this.applyGravity();
    }


    /**
     * function to animate the character
     */
    animate() {
        this.characterMove();
        this.characterAnimation();
    }


    /**
     * moves the character on the x axis to the right or left
     */
    characterMove() {
        setStoppableInterval(() => {
            this.walkingAudio.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.world.cameraPosX = -this.posX + 100;
        }, 1000 / 60);
    }


    /**
     * moves the character to right
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.posX < this.world.level.levelEndPosX) {
            this.moveRight();
            this.otherDirection = false;
            this.walkingAudio.play();
        }
    }


    /**
     * moves the character to left
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.posX > 110) {
            this.moveLeft();
            this.otherDirection = true;
            this.walkingAudio.play();
        }
    }


    /**
     * play all needed anitmations of the chracter
     */
    characterAnimation() {
        setStoppableInterval(() => {
            this.characterIdle();
            this.animationCharacterDead();
            this.animationCharacterWalking();
            this.animationCharacterJump();
            this.animationCharacterThrowBottle();
            this.animationCharacterIsHurt();
        }, 150)
    }


    /**
     * play animation when character fall to sleep, when he is do nothing for 5 seconds
     */
    characterIdle() {
        // this.playAnimation(this.IMAGES_IDLE);
        this.playAnimation(this.IMAGES.IMAGES_IDLE);
        this.idleTimeout += 150;
        if (this.idleTimeout >= 5000) {
            this.playAnimation(this.IMAGES.IMAGES_SLEEPING);
        }
    }


    /**
     * play dieing animation when the character lost all his energy
     */
    animationCharacterDead() {
        if (this.isDead()) {
            this.idleTimeout = 0;
            this.playAnimation(this.IMAGES.IMAGES_DEAD);
            this.dyingAudio.play();
        }
    }


    /**
     * play walking animation if character moves left or right
     */
    animationCharacterWalking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.idleTimeout = 0;
            this.playAnimation(this.IMAGES.IMAGES_WALKING);
        }
    }


    /**
     * play jumping animation
     */
    animationCharacterJump() {
        if (this.isAboveGround()) {
            this.idleTimeout = 0;
            this.playAnimation(this.IMAGES.IMAGES_JUMPING);
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.idleTimeout = 0;
            this.jump();
            this.jumpAudio.play();
        }
    }


    /**
     * play the trowing animation if chracter throws a salsa bottle
     */
    animationCharacterThrowBottle() {
        if (this.world.keyboard.THROW) {
            this.idleTimeout = 0;
        }
    }


    /**
     * play hurt animation if chracter is collided with an enemy
     */
    animationCharacterIsHurt() {
        if (this.isHurt()) {
            this.idleTimeout = 0;
            this.playAnimation(this.IMAGES.IMAGES_HURT);
        }
    }
}