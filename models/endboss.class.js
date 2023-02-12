class Endboss extends MovableObject {
    width = 400;
    height = 343;
    posY = 130;
    energy = 18;
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


    /**
     * move the endboss and play the walking animation
     */
    animate() {
        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() >= 400) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            if (this.distanceCharacterEndboss() < 120) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 150);

        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() < 400) {
                this.playAnimation(this.IMAGES_WALK);
                this.endbossMove();
            }
        }, 500);
    }


    /**
     * @returns the distance between the endboss an the character
     */
    distanceCharacterEndboss() {
        return this.posX - world.character.posX;
    }


    /**
     * the endboss is moving if the distance to the character is less then 450px
     */
    endbossMove() {
        let movingEndboss = setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() < 400)
                this.moveLeft()
            if (this.distanceCharacterEndboss() > 400) {
                clearInterval(movingEndboss);
            }
        }, 1000 / 60);
    }
}