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
    touchEventsStart();
    touchEventsEnd();
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

    document.getElementById('btn-info').classList.add('display-none');
}


function restartGame() {
    init();
    startGame();
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


function touchEventsStart() {
    document.getElementById('btn-left').addEventListener('touchstart', (ev) => {
        // ev.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-right').addEventListener('touchstart', (ev) => {
        // ev.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (ev) => {
        // ev.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btn-throw').addEventListener('touchstart', (ev) => {
        // ev.preventDefault();
        keyboard.THROW = true;
    });
}


function touchEventsEnd() {
    document.getElementById('btn-left').addEventListener('touchend', (ev) => {
        // ev.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btn-right').addEventListener('touchend', (ev) => {
        // ev.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (ev) => {
        // ev.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('btn-throw').addEventListener('touchend', (ev) => {
        // ev.preventDefault();
        keyboard.THROW = false;
    });
}


function fullscreen() {
    let content = document.getElementById('content');
    let fullscreenBtn = document.getElementById('btn-fullscreen');
    enterFullscreen(content);
    fullscreenBtn.innerHTML = /*html*/`<img onclick="closeFullscreen()" src="./img/small-screen.png" alt="normal view" class="img">`;
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function closeFullscreen() {
    let fullscreenBtn = document.getElementById('btn-fullscreen');
    fullscreenBtn.innerHTML = /*html*/`<img onclick="fullscreen()" src="./img/expand-screen.png" alt="normal view" class="img">`;
    exitFullscreen();
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function showInfo() {
    document.getElementById('startscreen').classList.add('blur');
    document.getElementById('info-btns-container').classList.add('blur');
    document.getElementById('play-btns-container').classList.add('blur');
    document.getElementById('info').classList.remove('display-none');
}


function closeInfo() {
    document.getElementById('startscreen').classList.remove('blur');
    document.getElementById('info-btns-container').classList.remove('blur');
    document.getElementById('play-btns-container').classList.remove('blur');
    document.getElementById('info').classList.add('display-none');
}