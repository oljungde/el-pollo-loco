class MovableObject {
    posX = 120;
    posY = 165;
    img;
    height = 300;
    width = 150;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('moving right');
    }


    moveLeft() {

    }
}