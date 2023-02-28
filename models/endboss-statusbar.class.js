class EndbossStatusbar extends DrawableObject {
    IMAGES = {
        IMAGES_ENDBOSS_STATUSBAR: [
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/0.png',
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/20.png',
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/40.png',
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/60.png',
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/80.png',
            './img/7_statusbars/2_statusbar_endboss/1_statusbar_endboss/100.png',
        ]
    }
    energyValue = 80;


    constructor() {
        super();
        super.loadAllImages(this.IMAGES).then(this.assetsAreLoaded = true);
        this.width = 198;
        this.height = 53;
        this.posX = 514;
        this.posY = 40;
        this.setEnergyValue(80);
    }


    /**
     * show the right images of the statusbar according to fill status
     * @param {number} bottleValue is the value to show on the statusbar of energy from endboss
     */
    setEnergyValue(energyValue) {
        this.energyValue = energyValue;
        let imagePath = this.IMAGES.IMAGES_ENDBOSS_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath]
    }


    /**
     * @returns fill value of statusbar 
     */
    resolveImageIndex() {
        if (this.energyValue == 80) {
            return 5;
        } else if (this.energyValue >= 64) {
            return 4;
        } else if (this.energyValue >= 48) {
            return 3;
        } else if (this.energyValue >= 32) {
            return 2;
        } else if (this.energyValue >= 16) {
            return 1;
        } else {
            return 0;
        }
    }
}
