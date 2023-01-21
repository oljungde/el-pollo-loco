class Cloud extends MovableObject {
    height = 240;
    width = 360;
    posY = 25;


    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.posX = 0 + Math.random() * 500;
    }
}