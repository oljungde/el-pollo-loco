class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndPosX = 1200;


    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
