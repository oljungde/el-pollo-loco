class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    levelEndPosX = 1200;


    constructor(enemies, clouds, backgroundObjects, throwableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
    }
}
