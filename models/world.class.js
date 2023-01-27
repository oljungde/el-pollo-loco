class World {
    character = new Character();
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
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Collision with character, energy', this.character.energy);
                };
            });
        }, 200);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraPosX, 0);

        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);
        this.addObjectsToCanvas(this.level.enemies);
        this.addToCanvas(this.character);

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