class ThrowableObject extends Bottle {
    IMAGES = {
        IMAGES_THROWN: [
            './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        ],
        IMAGES_SPLASH: [
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ]
    }
    speed = 42;
    speedY = 30;
    acceleration = 2.25;


    constructor(posX, posY) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.posX = posX;
        this.posY = posY;
        super.loadAllImages(this.IMAGES);
        this.animate();
    }


    /**
     * play animations of a thrown salsa bottle
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES.IMAGES_THROWN);
            if (world.level.endboss.isCollided || !this.isAboveGround()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES.IMAGES_SPLASH);
            }
        }, 100);
    }


    /**
     * function for throwing a salsa bottle in right or left deriction
     */
    throw() {
        this.applyGravity();
        if (!world.isBottleThrown) {
            if (!world.character.otherDirection) {
                setStoppableInterval(() => {
                    this.posX += 8;
                }, 1000 / 40);
            } else if (world.character.otherDirection) {
                setStoppableInterval(() => {
                    this.posX -= 8;
                }, 1000 / 40);
            } else if (this.speed == 0) {
                setStoppableInterval(() => {
                    this.posX += 0;
                }, 1000 / 40);
            }
        }
    }
}