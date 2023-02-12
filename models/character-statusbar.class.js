class CharacterStatusbar extends DrawableObject {
    IMAGES_ENERGY_STATUSBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    energyValue = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENERGY_STATUSBAR);
        this.width = 198;
        this.height = 53;
        this.posX = 8;
        this.posY = 0;
        this.setEnergyValue(100);
    }


    /**
     * show the right images of the statusbar according to fill status
     * @param {number} bottleValue is the value to show on the statusbar of character energy
     */
    setEnergyValue(energyValue) {
        this.energyValue = energyValue;
        let imagePath = this.IMAGES_ENERGY_STATUSBAR[this.resolveImageIndex()]
        this.img = this.imageCache[imagePath]
    }


    /**
    * @returns fill value of statusbar 
    */
    resolveImageIndex() {
        if (this.energyValue == 100) {
            return 5;
        } else if (this.energyValue > 80) {
            return 4;
        } else if (this.energyValue > 60) {
            return 3;
        } else if (this.energyValue > 40) {
            return 2;
        } else if (this.energyValue > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}