class CoinStatusbar extends DrawableObject {
    IMAGES = {
        IMAGES_COIN_STATUSBAR: [
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        ]
    }


    constructor() {
        super();
        super.loadAllImages(this.IMAGES);
        this.width = 198;
        this.height = 53;
        this.posX = 8;
        this.posY = 80;
        this.setCoinValue(0);
    }


    /**
     * show the right images of the statusbar according to fill status
     * @param {number} coinValue is the value to show on the statusbar of collected coins
     */
    setCoinValue(coinValue) {
        this.coinValue = coinValue;
        let imagePath = this.IMAGES.IMAGES_COIN_STATUSBAR[this.resolveImageIndex()];
        this.img = new Image();
        this.img.src = imagePath;
    }


    /**
     * @returns fill value of statusbar 
     */
    resolveImageIndex() {
        if (this.coinValue == 6) {
            return 5;
        } else if (this.coinValue >= 5) {
            return 4;
        } else if (this.coinValue >= 4) {
            return 3;
        } else if (this.coinValue >= 3) {
            return 2;
        } else if (this.coinValue >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}