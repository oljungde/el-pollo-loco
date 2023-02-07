class DrawableObject {
    posX = 120;
    posY = -40;
    img;
    height = 300;
    width = 150;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + this.offsetX / 2, this.posY + this.offsetY, this.width - this.offsetX, this.height - this.offsetY);
            ctx.stroke();
        }
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
}