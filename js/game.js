let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}


window.addEventListener('keydown', (ev) => {
    if (ev.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (ev.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (ev.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (ev.key == ' ') {
        keyboard.SPACE = true;
    }
    if (ev.key == 'd') {
        keyboard.THROW = true;
    }
});


window.addEventListener('keyup', (ev) => {
    if (ev.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (ev.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (ev.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (ev.key == ' ') {
        keyboard.SPACE = false;
    }
    if (ev.key == 'd') {
        keyboard.THROW = false;
    }
});