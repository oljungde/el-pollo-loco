class Coin extends MovableObject {
    height = 100;
    width = 100;
    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.posY = 100;
        this.posX = 200 + Math.random() * 1000;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 400)
    }
}