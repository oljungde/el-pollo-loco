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


    constructor(posX, posY) {
        // super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        super();
        this.posX = posX;
        this.posY = posY;
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
    }


    animate() {
        let test = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
            if (!this.isAboveGround() || world.level.endboss.isHurt()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_SPLASH);
                setTimeout(() => {
                    world.bottlesToThrow.splice(0, 1);
                    clearInterval(test);
                    world.isBottleThrown = false;
                }, 100);
            }
        }, 100);
    }


    throw() {
        if (!world.isBottleThrown) {
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
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