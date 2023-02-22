class Level {
    endboss;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    levelEndPosX = 2965;


    constructor(endboss, enemies, clouds, backgroundObjects, bottles, coins) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}
