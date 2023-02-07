class Level {
    endboss;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    levelEndPosX = 1200;


    constructor(endboss, enemies, clouds, backgroundObjects, bottles) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}
