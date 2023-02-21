class Coin extends MovableObject {
    height = 60;
    width = 60;
    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    coinCollectedAudio = new Audio('./audio/coin-collected.mp3');

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.posY = 80 + Math.random() * 100;
        this.posX = 200 + Math.random() * 1000;
        this.animate();
    }


    /**
     * play the animation of coins, pulsing on canvas
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 400)
    }
}