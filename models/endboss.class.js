class Endboss extends MovableObject {
    width = 400;
    height = 343;
    posY = 100;
    energy = 80;
    speed = 0.12;
    offsetY = 50;
    offsetX = 80;
    isCollided = false;
    IMAGES = {
        IMAGES_ALERT: [
            './img/4_enemie_boss_chicken/2_alert/G5.png',
            './img/4_enemie_boss_chicken/2_alert/G6.png',
            './img/4_enemie_boss_chicken/2_alert/G7.png',
            './img/4_enemie_boss_chicken/2_alert/G8.png',
            './img/4_enemie_boss_chicken/2_alert/G9.png',
            './img/4_enemie_boss_chicken/2_alert/G10.png',
            './img/4_enemie_boss_chicken/2_alert/G11.png',
            './img/4_enemie_boss_chicken/2_alert/G12.png'
        ],
        IMAGES_WALK: [
            './img/4_enemie_boss_chicken/1_walk/G1.png',
            './img/4_enemie_boss_chicken/1_walk/G2.png',
            './img/4_enemie_boss_chicken/1_walk/G3.png',
            './img/4_enemie_boss_chicken/1_walk/G4.png'
        ],
        IMAGES_ATTACK: [
            './img/4_enemie_boss_chicken/3_attack/G13.png',
            './img/4_enemie_boss_chicken/3_attack/G14.png',
            './img/4_enemie_boss_chicken/3_attack/G15.png',
            './img/4_enemie_boss_chicken/3_attack/G16.png',
            './img/4_enemie_boss_chicken/3_attack/G17.png',
            './img/4_enemie_boss_chicken/3_attack/G18.png',
            './img/4_enemie_boss_chicken/3_attack/G19.png',
            './img/4_enemie_boss_chicken/3_attack/G20.png',
        ],
        IMAGES_HURT: [
            './img/4_enemie_boss_chicken/4_hurt/G21.png',
            './img/4_enemie_boss_chicken/4_hurt/G22.png',
            './img/4_enemie_boss_chicken/4_hurt/G23.png',
        ],
        IMAGES_DEAD: [
            './img/4_enemie_boss_chicken/5_dead/G24.png',
            './img/4_enemie_boss_chicken/5_dead/G25.png',
            './img/4_enemie_boss_chicken/5_dead/G26.png'
        ]
    }
    alertAudio = new Audio('./audio/endboss-alert.mp3');
    attackAudio = new Audio('./audio/endboss-attack.mp3');
    isHurtAudio = new Audio('./audio/endboss-hurt.mp3');
    isDeadAudio = new Audio('./audio/endboss-dying.mp3');


    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        super.loadAllImages(this.IMAGES);
        this.endbossAudio();
        this.posX = 3100;
    }


    muteEndbossAudio() {
        this.alertAudio.muted = true;
        this.attackAudio.muted = true;
        this.isHurtAudio.muted = true;
        this.isDeadAudio.muted = true;
    }


    unmuteEndbossAudio() {
        this.alertAudio.muted = false;
        this.attackAudio.muted = false;
        this.isHurtAudio.muted = false;
        this.isDeadAudio.muted = false;
    }


    /**
     * move the endboss and play the walking animation
     */
    animate() {
        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() >= 400 && !this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_ALERT);
            }
            if (this.distanceCharacterEndboss() < 100 && !this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_ATTACK);
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES.IMAGES_HURT);
            }
            if (this.isDead()) {
                this.endbossDead();
            }
        }, 100);

        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() < 400) {
                this.playAnimation(this.IMAGES.IMAGES_WALK);
                this.endbossMove();
            }
        }, 250);
    }


    endbossDead() {
        this.playAnimation(this.IMAGES.IMAGES_DEAD);
        setTimeout(() => {
            stopGame();
        }, 125);

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
            if (this.distanceCharacterEndboss() < 400 && this.distanceCharacterEndboss() > 100 && !this.isDead())
                this.moveLeft()
            if (this.distanceCharacterEndboss() > 400) {
                clearInterval(movingEndboss);
            }
        }, 1000 / 60);
    }


    /**
     * plays and stops several sounds of the endboss
     */
    endbossAudio() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.audioEndbossDead();
            } else if (this.isHurt()) {
                this.audioEndbossHurt();
            } else if (this.distanceCharacterEndboss() < 100 && !this.isHurt()) {
                this.audioEndbossAttak();
            } else if (this.distanceCharacterEndboss() < 600 && this.distanceCharacterEndboss() > 400) {
                this.audioEndbossAlert();
            }
        }, 150)
    }


    audioEndbossDead() {
        this.alertAudio.pause();
        this.alertAudio.currentTime = 0;
        this.attackAudio.pause();
        this.attackAudio.currentTime = 0;
        this.isHurtAudio.pause();
        this.isHurtAudio.currentTime = 0;
        this.isDeadAudio.play();
    }


    audioEndbossHurt() {
        this.alertAudio.pause();
        this.alertAudio.currentTime = 0;
        this.attackAudio.pause();
        this.attackAudio.currentTime = 0;
        this.isHurtAudio.play();
    }


    audioEndbossAttak() {
        this.alertAudio.pause();
        this.alertAudio.currentTime = 0;
        this.isHurtAudio.pause();
        this.isHurtAudio.currentTime = 0;
        this.attackAudio.play();
    }


    audioEndbossAlert() {
        this.attackAudio.pause();
        this.attackAudio.currentTime = 0;
        this.isHurtAudio.pause();
        this.isHurt.currentTime = 0;
        this.alertAudio.play();
    }
}