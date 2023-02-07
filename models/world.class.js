class World {
    character = new Character();
    characterEnergyStatusbar = new CharacterStatusbar();
    bottleStatusbar = new BottleStatusbar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraPosX = 0;
    bottlesToThrow = [];
    isBottleThrown = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) || this.character.isColliding(this.level.endboss)) {
                this.character.hit();
                console.log('Collision with character, energy', this.character.energy);
                this.characterEnergyStatusbar.setEnergyValue(this.character.energy);
            };
        });
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle) && this.character.collectedBottles.length < 10) {
                this.character.collectedBottles.push(bottle);
                this.level.bottles.splice(indexOfBottles, 1);
                this.bottleStatusbar.setBottleValue(this.character.collectedBottles.length);
            }
        })
        this.bottlesToThrow.forEach((bottle, bottleIndex) => {
            if (this.level.endboss.isColliding(bottle)) {
                console.log('endboss bottle');
                this.level.endboss.hit();
                console.log(this.level.endboss.energy);
            }
        })
    }


    checkThrowObjects() {
        if (this.keyboard.THROW && this.character.collectedBottles.length > 0 && !this.isBottleThrown) {
            if (!this.character.otherDirection) {
                this.bottleToThrow = new ThrowableObject(this.character.posX + 80, this.character.posY + 100);
            } else {
                this.bottleToThrow = new ThrowableObject(this.character.posX + 20, this.character.posY + 100);
            }
            this.bottlesToThrow.push(this.bottleToThrow);
            this.character.collectedBottles.splice(0, 1);
            this.bottleStatusbar.setBottleValue(this.character.collectedBottles.length);
            this.bottleToThrow.throw();
            this.isBottleThrown = true;
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraPosX, 0);

        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);
        this.addToCanvas(this.level.endboss);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.bottles);
        this.addToCanvas(this.character);

        this.ctx.translate(-this.cameraPosX, 0);
        this.addToCanvas(this.characterEnergyStatusbar);
        this.addToCanvas(this.bottleStatusbar);
        this.ctx.translate(this.cameraPosX, 0);

        this.addObjectsToCanvas(this.bottlesToThrow);
        this.ctx.translate(-this.cameraPosX, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    /**
     * loop through an array and call the function to dray the entry on canvas
     * @param {array} objects is the array of all objects from one class e.g. enemies
     */
    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        })
    }


    /**
     * draw every object from an array (e.g. enemies), to the canvas
     * @param {object} mo is a moveable object from an array
     */
    addToCanvas(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffset(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.posX = mo.posX * -1;
    }


    flipImageBack(mo) {
        mo.posX = mo.posX * -1;
        this.ctx.restore();
    }
}