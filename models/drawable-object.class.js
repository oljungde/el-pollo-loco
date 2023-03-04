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
            this.img.src = path;
            // console.log(path);
        });
    }


    /**
     * draw the object to the canvas
     * @param {object} ctx is the context of the canvas
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image ', e);
            console.log('Could not load image , ', this.img.src);
        }

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

    async loadImages(imageCache) {
        for (let i = 0; i < imageCache.length; i++) {
            const path = imageCache[i];
            await this.loadImageFromPath(path);
            // console.log('loaded ' + path)
            if (path.includes('./img/2_character_pepe/1_idle/long_idle/I-20.png')) {
                console.log('Alles fertig geladen!');
                allAssetsAreLoaded = true;
            }
        }
    }


    /**
 * loads all images in the arry imageCache of one object for animation
 * @param {array} imageCache is the array of all images from one movable object
 */
    async loadImageFromPath(path) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                this.imageCache[path].loaded = true;
                this.imageCache[path].error = false;
                resolve();
            };
            img.onerror = () => {
                this.imageCache[path].loaded = true;
                this.imageCache[path].error = truth;
                reject(`Image ${path} for ${typeof this} could not be loaded`);
            };
            this.imageCache[path] = { img, loaded: false, error: false };
            img.src = path;
        });
    }


    async loadAllImages(images) {
        for (const status in images) {
            await this.loadImages(images[status]);
        }
    }
}