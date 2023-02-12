class MovableObject extends DrawableObject {
    offsetY;
    offsetX;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy;
    lastHit = 0;


    /**
     * plays an animation
     * @param {array} images is the array with all single images to play a animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * moves the object to right
     */
    moveRight() {
        this.posX += this.speed;
    }


    /**
     * moves the object to left
     */
    moveLeft() {
        this.posX -= this.speed;
    }


    /**
     * moves object in the air for jumping
     */
    jump() {
        this.speedY = 25;
    }


    /**
     * Add gravity to move the object towards the ground, as the speed of the jump is reduced with each interval call
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /** checks if the object is above groundlevel on the y axis */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.posY < 365;
        } else {
            return this.posY < 150;
        }
    }

    /**
     * checks colliding with other objects
     * @param {object} mo ist another instance of the this class and the extendet
     * @returns a boolean 
     */
    isColliding(mo) {
        return (this.posX - this.offsetX / 2 + this.width) >= mo.posX &&
            (this.posY + this.offsetY + this.height) >= mo.posY &&
            (this.posX - this.offsetX / 2) <= (mo.posX + mo.width) &&
            (this.posY + this.offsetY) <= (mo.posY + mo.height)
    }


    /**
     * checks for hitting and reduces the energy 
     */
    hit() {
        this.energy -= 2;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * @returns true if the time between a hit ist less than a second, for play the hurt animation
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * @returns true if the energy og the object is zero
     */
    isDead() {
        return this.energy == 0;
    }
}