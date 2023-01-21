class Chicken extends MovableObject {
    posY = 380;
    height = 80;
    width = 60;


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.posX = 200 + Math.random() * 500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.posX -= 0.25;
            this.loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        }, 1000 / 60);
    }
}