class Endboss extends MovableObject {
    width = 400;
    height = 343;
    posY = 130;
    // speed = 15;
    energy = 20;
    offsetY = 50;
    offsetX = 8;
    isCollided = false;

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];



    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK)
        this.posX = 1200;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() >= 450) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 350);

        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() < 450) {
                this.playAnimation(this.IMAGES_WALK);
                this.endbossMove();
            }
        }, 500);
    }


    distanceCharacterEndboss() {
        return this.posX - world.character.posX;
    }


    endbossMove() {
        let movingEndboss = setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() < 450)
                this.moveLeft()
            if (this.distanceCharacterEndboss() > 450) {
                clearInterval(movingEndboss);
            }
        }, 1000 / 60);
    }
}