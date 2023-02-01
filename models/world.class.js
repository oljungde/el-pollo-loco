class World {
    character = new Character();
    characterEnergyStatusbar = new CharacterStatusbar();
    bottleStatusbar = new BottleStatusbar();
    throwableObjects = [];
    collectedBottles = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraPosX = 0;


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
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                console.log('Collision with character, energy', this.character.energy);
                this.characterEnergyStatusbar.setEnergyValue(this.character.energy);
            };
        });
        this.level.bottles.forEach((bottle, bottleIndex) => {
            if (this.character.isColliding(bottle) && this.collectedBottles.length != 10) {
                const bottle = this.level.bottles[bottleIndex];
                this.collectedBottles.push(bottle);
                this.level.bottles.splice(bottleIndex, 1);
                this.character.collectBottle();
                console.log('gesammelte Flaschen: ', this.character.bottleCount);
                this.bottleStatusbar.setBottleValue(this.character.bottleCount);
                this.draw();
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.THROW) {
            // let bottle = new ThrowableObject(this.character.posX + 80, this.character.posY + 100);
            // this.throwableObjects.push(bottle);
            let bottle = this.collectedThrowableObjects[0];
            console.log(bottle.posX);
            bottle.posX = this.character.posX + 80;
            console.log(bottle.posX);
            bottle.posY = this.character.posY + 100;
            bottle.throw();
            console.log('Flasche wurde geworfen')
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraPosX, 0);

        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.bottles);
        this.addToCanvas(this.character);

        this.ctx.translate(-this.cameraPosX, 0);
        this.addToCanvas(this.characterEnergyStatusbar);
        this.addToCanvas(this.bottleStatusbar);
        this.addObjectsToCanvas(this.throwableObjects);
        this.ctx.translate(this.cameraPosX, 0);

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