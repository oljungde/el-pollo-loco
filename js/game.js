let canvas;
let startscreen;
let world;
let allIntervals = [];
let keyboard = new Keyboard();


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


function startGame() {
    startscreen = document.getElementById('startscreen');
    world.character.animate();
    world.level.endboss.animate();
    world.level.enemies.forEach(enemy => {
        enemy.animate();
    });
    world.level.clouds.forEach(cloud => {
        cloud.animate();
    });
    canvas.classList.remove('display-none');
    startscreen.classList.add('display-none');
}


function restartGame() {
    init();
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