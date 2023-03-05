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


    /**
     * loads all images of a class asynchronously, when the last image of the character is loaded the variable
     * allAssetsAreLoaded is set to true
     * @param {array} imageCache includes all images of a class
     */
    async loadImages(imageCache) {
        for (let i = 0; i < imageCache.length; i++) {
            const path = imageCache[i];
            await this.loadImageFromPath(path);
            if (path.includes('./img/2_character_pepe/1_idle/long_idle/I-20.png')) {
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


    /**
     * @param {JSON} images is the JSON arry with all images to load for a class
     */
    async loadAllImages(images) {
        for (const status in images) {
            await this.loadImages(images[status]);
        }
    }
}