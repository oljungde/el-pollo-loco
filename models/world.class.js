class World {
    character = new Character();
    characterEnergyStatusbar = new CharacterStatusbar();
    bottleStatusbar = new BottleStatusbar();
    endbossStatusbar = new EndbossStatusbar();
    coinStatusbar = new CoinStatusbar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraPosX = 0;
    bottlesToThrow = [];
    isBottleThrown = false;
    deadEnemies = [];
    backgroundAudio = new Audio('./audio/background.mp3');
    backgroundChickenAudio = new Audio('./audio/chicken-background.mp3');
    chickenDyingAudio = new Audio('./audio/chicken-dead.mp3');
    smallChickenDyingAudio = new Audio('./audio/small-chicken-dead.mp3');
    splashBottleAudio = new Audio('./audio/bottle-splash.mp3');
    winAudio = new Audio('./audio/win2.mp3');
    lostAudio = new Audio('./audio/lost.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * makes it possible to access the world from other objects (classes)
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * starts the interval for start the game
     */
    run() {
        setStoppableInterval(() => {
            this.isGameOver();
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60);
    }


    playBackgroundAudio() {
        this.backgroundAudio.play();
        this.backgroundAudio.loop = true;
        this.backgroundChickenAudio.play();
        this.backgroundChickenAudio.loop = true;
    }


    stopBackgroundAudio() {
        this.backgroundAudio.pause();
        this.backgroundChickenAudio.pause();
    }


    muteWorldAudio() {
        this.stopBackgroundAudio();
        this.chickenDyingAudio.muted = true;
        this.smallChickenDyingAudio.muted = true;
        this.splashBottleAudio.muted = true;
        this.winAudio.muted = true;
        this.lostAudio.muted = true;
    }


    unmuteWorldAudio() {
        this.playBackgroundAudio();
        this.chickenDyingAudio.muted = false;
        this.smallChickenDyingAudio.muted = false;
        this.splashBottleAudio.muted = false;
        this.winAudio.muted = false;
        this.lostAudio.muted = false;
    }


    /**
     * checks collisions between items in the world
     */
    checkCollisions() {
        this.checkCollisionJumpOnEnemies();
        this.checkCollisionBottlesToCollect();
        this.checkCollisionTrownBottles();
        this.checkCollisionCoinsCharacter();
        this.checkCollisionEnemiesCharacter();
        this.checkCollisionEndbossCharacter()
    }


    /**
     * checks collisons from chickens with the character
     */
    checkCollisionEnemiesCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.jumpOnEnemy && this.character.isColliding(enemy)) {
                this.characterIsInjured();
            };
        });
    }


    checkCollisionEndbossCharacter() {
        if (this.character.isColliding(this.level.endboss)) {
            this.characterIsInjured();
        }
    }


    characterIsInjured() {
        if (this.character.energy > 0) {
            this.character.hit();
            this.character.hurtAudio.play();
        }
        this.characterEnergyStatusbar.setEnergyValue(this.character.energy);
    }


    /**
     * checks collisions of collectable salsa bottle with the character
     */
    checkCollisionBottlesToCollect() {
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle) && this.character.collectedBottles.length < 10) {
                this.character.collectBottleAudio.play();
                this.character.collectedBottles.push(bottle);
                this.level.bottles.splice(indexOfBottles, 1);
                this.bottleStatusbar.setBottleValue(this.character.collectedBottles.length);
            }
        });
    }


    /**
     * checks collisions of a thrown salsa bottle with the ground and the endboss 
     */
    checkCollisionTrownBottles() {
        this.bottlesToThrow.forEach((bottle, bottleIndex) => {
            this.checkCollisionTrownBottleEndboss(bottle, bottleIndex);
            this.checkCollisionThrownBottleGround(bottle, bottleIndex);
        });
    }


    /**
     * checks the collision of a thrown bottle with the endboss and removes the collided bottle from the array of all throwable bottles
     * @param {object} bottle is the entry of thrown bottle of all collected bottles
     * @param {number} bottleIndex is the index of the array of collected bottles
     */
    checkCollisionTrownBottleEndboss(bottle, bottleIndex) {
        if (this.level.endboss.isColliding(bottle)) {
            this.splashBottleAudio.play();
            this.level.endboss.hit();
            this.level.endboss.isCollided = true;
            this.endbossStatusbar.setEnergyValue(this.level.endboss.energy);
            setTimeout(() => {
                this.bottlesToThrow.splice(bottleIndex);
                this.isBottleThrown = false;
                this.level.endboss.isCollided = false;
            }, 100);
        }
    }


    /**
     * checks the collision of a thrown bottle with the ground and removes the collided bottle from the array of all throwable bottles
     * @param {object} bottle is the entry of thrown bottle of all collected bottles
     * @param {number} bottleIndex is the index of the array of collected bottles
     */
    checkCollisionThrownBottleGround(bottle, bottleIndex) {
        if (!bottle.isAboveGround()) {
            this.splashBottleAudio.play();
            setTimeout(() => {
                this.bottlesToThrow.splice(bottleIndex);
                this.isBottleThrown = false;
            }, 100);
        }
    }


    /**
     * checks collissions of collectable coins with the character
     */
    checkCollisionCoinsCharacter() {
        this.level.coins.forEach((coin, indexOfCoins) => {
            if (this.character.isColliding(coin)) {
                coin.coinCollectedAudio.play();
                this.level.coins.splice(indexOfCoins, 1);
                this.character.collectedCoins++;
                this.coinStatusbar.setCoinValue(this.character.collectedCoins);
            }
        });
    }


    /**
     * checks if the character is jumping on an enemy
     */
    checkCollisionJumpOnEnemies() {
        this.level.enemies.forEach((enemy, indexOfEnemies) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.jumpOnEnemy = true;
                this.checkKindOfEnemy(enemy, indexOfEnemies);
                setTimeout(() => {
                    this.deadEnemies.splice(this.deadEnemy);
                    this.character.jumpOnEnemy = false;
                }, 700);
            }
        });
    }


    /**
     * checks if a normal chicken or a small chicken is collided with the character and pushes the right dead variant
     * to the array deadEnemies 
     * @param {object} enemy who is collided with the character
     * @param {number} indexOfEnemies of the array with all enemies in the world
     */
    checkKindOfEnemy(enemy, indexOfEnemies) {
        let deadEnemy;
        if (enemy instanceof Chicken) {
            deadEnemy = new DeadChicken(enemy.posX, enemy.posY);
            this.chickenDyingAudio.play();
        } else {
            deadEnemy = new DeadSmallChicken(enemy.posX, enemy.posY);
            this.smallChickenDyingAudio.play();
        }
        this.deadEnemies.push(deadEnemy);
        this.level.enemies.splice(indexOfEnemies, 1);
    }


    /**
     * checks if a collected bottle is thrown, if a bottle is thrown a new instance of the class throwableObject 
     * is created and a bottle is removed from the collected bottles 
     */
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


    /**
     * draws all objects of the world to canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawWorld();
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    /**
     * draws all movable objects of the world an the canvas
     */
    drawWorld() {
        this.ctx.translate(this.cameraPosX, 0);
        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);
        this.addToCanvas(this.character);
        this.addToCanvas(this.level.endboss);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.bottles);
        this.addObjectsToCanvas(this.level.coins);
        this.drawStatusBars();
        this.addObjectsToCanvas(this.bottlesToThrow);
        this.addObjectsToCanvas(this.deadEnemies);
        this.ctx.translate(-this.cameraPosX, 0);
    }


    /**
     * draws the statusbars for character, salsa bottles, collected coins and the endbos to the canvas
     */
    drawStatusBars() {
        this.ctx.translate(-this.cameraPosX, 0);
        this.addToCanvas(this.characterEnergyStatusbar);
        this.addToCanvas(this.bottleStatusbar);
        if (this.level.endboss.posX - this.character.posX < 600) {
            this.addToCanvas(this.endbossStatusbar);
        }
        this.addToCanvas(this.coinStatusbar);
        this.ctx.translate(this.cameraPosX, 0);
    }


    /**
     * loop through the array of several objects and call the function to dray the entry on canvas for animation
     * @param {array} objects is the array of all objects from one class e.g. enemies
     */
    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        })
    }


    /**
     * draw every object from the array of single object (e.g. enemies), to the canvas
     * @param {object} mo is a moveable object from an array
     */
    addToCanvas(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * flips the image of the character if it changes the direction walking to left
     * @param {object} mo is an instance of the class movableObject and their extended classes
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.posX = mo.posX * -1;
    }


    /**
     * flips the image of the character back if it changes the direction walking to right
     * @param {object} mo is an instance of the class movableObject and their extended classes
     */
    flipImageBack(mo) {
        mo.posX = mo.posX * -1;
        this.ctx.restore();
    }


    /**
     * checks if pepe or the endboss is dead, stops the game animations and clear the array of all stoped intervals
     */
    isGameOver() {
        if (this.character.isDead() || this.level.endboss.isDead()) {
            this.character.walkingAudio.pause();
            setTimeout(() => {
                stopGame();
                allIntervals = [];
                this.whoWins();
                this.canvas.classList.add('display-none');
                document.getElementById('info-btns-container').classList.add('display-none');
                document.getElementById('play-btns-container').classList.add('display-none');
            }, 2000);
        }
    }


    /**
     * choose which endscreen to show, game won or game lost
     */
    whoWins() {
        if (this.character.isDead()) {
            document.getElementById('character_lost').style.visibility = 'visible';
            this.lostAudio.play();
            setTimeout(() => {
                document.getElementById('restart-btn-boss').classList.remove('display-none');
            }, 5000);
        } else {
            document.getElementById('character_won').style.visibility = 'visible';
            this.winAudio.play();
            setTimeout(() => {
                document.getElementById('restart-btn-character').classList.remove('display-none');
            }, 5000);
        }
    }
}