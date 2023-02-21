class ThrowableObject extends Bottle {
    IMAGES_THROWN = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    splashAudio = new Audio('./audio/bottle-splash.mp3');


    constructor(posX, posY) {
        // super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        super();
        this.posX = posX;
        this.posY = posY;
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
    }


    /**
     * play animations of a thrown salsa bottle
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
            if (world.level.endboss.isCollided || !this.isAboveGround()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 100);
    }


    /**
     * function for throwing a salsa bottle in right or left deriction
     */
    throw() {
        if (!world.isBottleThrown) {
            this.speedY = 30;
            this.applyGravity();
            setStoppableInterval(() => {
                if (this.speed == 0) {
                    this.posX += 0;
                }
                if (!world.character.otherDirection) {
                    this.posX += 10;
                }
                if (world.character.otherDirection) {
                    this.posX -= 10;
                }
            }, 50);
        }
    }
}