class DeadChicken extends MovableObject {
    height = 90;
    width = 90;
    dyingAudio = new Audio('./audio/chicken-dead.mp3');


    constructor(posX, posY) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.posX = posX;
        this.posY = posY;
        this.dyingAudio.play();
    }
}