let canvas;
let world;
let allIntervals = [];
let keyboard = new Keyboard();


function init() {
    initLevel();
    let startscreen = document.getElementById('startscreen');
    let canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // world.addEventListener('load', () => {
    //     startscreen.classList.add('display-none');
    //     canvas.classList.remove('display-none');
    // });
    // startscreen.classList.add('display-none');
    // canvas.classList.remove('display-none');
    setTimeout(() => {
        startscreen.classList.add('display-none');
        canvas.classList.remove('display-none');
    }, 250);
    console.log('My character is', world.character);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


function stopGame() {
    allIntervals.forEach(clearInterval);
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