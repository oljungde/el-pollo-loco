class BottleStatusbar extends DrawableObject {
    IMAGES = {
        IMAGES_BOTTLE_STATUSBAR: [
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
        ]
    }


    constructor() {
        super();
        super.loadAllImages(this.IMAGES);
        this.width = 198;
        this.height = 53;
        this.posX = 8;
        this.posY = 42;
        this.setBottleValue(0);
    }


    /**
     * show the right images of the statusbar according to fill status
     * @param {number} bottleValue is the value to show on the statusbar of collected bottles
     */
    setBottleValue(bottleValue) {
        this.bottleValue = bottleValue;
        let imagePath = this.IMAGES.IMAGES_BOTTLE_STATUSBAR[this.resolveImageIndex()];
        this.img = new Image();
        this.img.src = imagePath;
    }


    /**
     * @returns fill value of statusbar 
     */
    resolveImageIndex() {
        if (this.bottleValue == 9) {
            return 5;
        } else if (this.bottleValue >= 8) {
            return 4;
        } else if (this.bottleValue >= 6) {
            return 3;
        } else if (this.bottleValue >= 4) {
            return 2;
        } else if (this.bottleValue >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}