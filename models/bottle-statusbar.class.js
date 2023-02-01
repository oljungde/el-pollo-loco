class BottleStatusbar extends DrawableObject {
    IMAGES_BOTTLE_STATUSBAR = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    bottleValue = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_STATUSBAR);
        this.width = 198;
        this.height = 53;
        this.posX = 8;
        this.posY = 42;
        this.setBottleValue(0);
    }


    setBottleValue(bottleValue) {
        this.bottleValue = bottleValue;
        let imagePath = this.IMAGES_BOTTLE_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex() {
        if (this.bottleValue == 10) {
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