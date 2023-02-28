class DrawableObject {
    posX = 120;
    posY = -40;
    img;
    height = 300;
    width = 150;
    imageCache = {};
    currentImage = 0;


    /**
     * shows a single image of the object
     * @param {string} path of the image from the object to show
     */
    loadImage(path) {
        return new Promise((resolve, reject) => {
            this.img = new Image();
            this.img.onload = () => resolve(this.img.height);
            this.img.onerror = reject;
            this.img.src = path;
            console.log(path);
        });
    }


    /**
     * draw the object to the canvas
     * @param {object} ctx is the context of the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin
            || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.posX + this.offsetX / 2, this.posY + this.offsetY, this.width - this.offsetX, this.height - this.offsetY);
            ctx.stroke();
        }
    }


    /**
 * loads all images in the arry imageCache of one object for animation
 * @param {array} imageCache is the array of all images from one movable object
 */
    async loadImages(imageCache) {
        for (let i = 0; i < imageCache.length; i++) {
            await this.loadImage(path);
        }
    }
}