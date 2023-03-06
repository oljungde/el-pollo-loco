class Coin extends MovableObject {
    height = 60;
    width = 60;
    IMAGES = {
        IMAGES_COINS: [
            './img/8_coin/coin_1.png',
            './img/8_coin/coin_2.png'
        ]
    }
    coinCollectedAudio = new Audio('./audio/coin-collected.mp3');

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        super.loadAllImages(this.IMAGES).then(this.assetsAreLoaded = true);
        this.posY = 80 + Math.random() * 100;
        this.posX = 200 + Math.random() * 2500;
        this.animate();
    }


    /**
     * play the animation of coins, pulsing on canvas
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES.IMAGES_COINS);
        }, 400)
    }


    muteCoinAudio() {
        this.coinCollectedAudio.muted = true;

    }


    unmuteCoinAudio() {
        this.coinCollectedAudio.muted = false;
    }
}