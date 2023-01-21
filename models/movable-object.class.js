class MovableObject {
    posX = 120;
    posY = 165;
    img;
    height = 300;
    width = 150;
    imageCache = {};


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * loads all images in the arry imageCache of one movable object
     * @param {array} imageCache is the array of all images from one movable object
     */
    loadImages(imageCache) {
        imageCache.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }


    moveRight() {
        console.log('moving right');
    }


    moveLeft() {

    }
}