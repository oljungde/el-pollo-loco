class EndbossStatusbar extends DrawableObject {
    IMAGES_ENDBOSS_STATUSBAR = [
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/0.png',
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/20.png',
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/40.png',
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/60.png',
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/80.png',
        './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/100.png',
    ];
    energyValue = 20;


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS_STATUSBAR);
        this.width = 198;
        this.height = 53;
        this.posX = 514;
        this.posY = 0;
        this.setEnergyValue(20);
    }


    /**
     * show the right images of the statusbar according to fill status
     * @param {number} bottleValue is the value to show on the statusbar of collected bottles
     */
    setEnergyValue(energyValue) {
        this.energyValue = energyValue;
        let imagePath = this.IMAGES_ENDBOSS_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath]
    }


    /**
     * @returns fill value of statusbar 
     */
    resolveImageIndex() {
        if (this.energyValue == 20) {
            return 5;
        } else if (this.energyValue >= 16) {
            return 4;
        } else if (this.energyValue >= 12) {
            return 3;
        } else if (this.energyValue >= 8) {
            return 2;
        } else if (this.energyValue >= 4) {
            return 1;
        } else {
            return 0;
        }
    }
}