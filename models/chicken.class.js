class Chicken extends MovableObject {
    posY = 380;
    height = 80;
    width = 60;


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.posX = 200 + Math.random() * 500;
    }
}