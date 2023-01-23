class MovableObject {
    posX = 120;
    posY = 165;
    img;
    height = 300;
    width = 150;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


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
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log('moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.posX -= this.speed;
        }, 1000 / 60);
    }
}