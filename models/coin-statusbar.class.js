class CoinStatusbar extends DrawableObject {
    IMAGES_COIN_STATUSBAR = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_STATUSBAR);
        this.width = 198;
        this.height = 53;
        this.posX = 8;
        this.posY = 80;
        this.setCoinValue(0);
    }


    setCoinValue(coinValue) {
        this.coinValue = coinValue;
        let imagePath = this.IMAGES_COIN_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath]
    }


    /**
     * @returns fill value of statusbar 
     */
    resolveImageIndex() {
        if (this.coinValue == 10) {
            return 5;
        } else if (this.coinValue >= 8) {
            return 4;
        } else if (this.coinValue >= 6) {
            return 3;
        } else if (this.coinValue >= 4) {
            return 2;
        } else if (this.coinValue >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}