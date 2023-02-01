class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    levelEndPosX = 1200;


    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}
