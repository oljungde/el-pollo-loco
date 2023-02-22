class Bottle extends MovableObject {
    height = 75;
    width = 75;
    imageToLoad = Math.floor(Math.random() * 2);


    constructor() {
        super();
        this.randomImageLoad();
        this.posY = 375;
        this.posX = 300 + Math.random() * 1000;
    }


    /**
     * randomly loads a picture of a collection bottle tilted to the left or right on the floor
     */
    randomImageLoad() {
        if (this.imageToLoad == 0) {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
    }
}