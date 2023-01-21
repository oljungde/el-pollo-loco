class World {
    character = new Character();
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToCanvas(this.backgroundObjects);
        this.addObjectsToCanvas(this.clouds);
        this.addObjectsToCanvas(this.enemies);
        this.addToCanvas(this.character);

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
        this.ctx.drawImage(mo.img, mo.posX, mo.posY, mo.width, mo.height);
    }
}