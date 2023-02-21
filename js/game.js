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


/**
 * Creates an interval and pushes in an array, so it is possible to all invals in this array
 * @param {object} fn is the code of the function of the created interval
 * @param {number} time is milliseconds to execute the interval
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


/**
 * starts the game after initilisation of the world
 */
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
    world.playAudio();
    canvas.classList.remove('display-none');
    startscreen.classList.add('display-none');
    document.getElementById('btn-info').classList.add('display-none');
}


/**
 * function to restart the game after one run
 */
function restartGame() {
    document.getElementById('restart-btn').classList.add('display-none');
    document.getElementById('loading-btn').classList.remove('display-none');
    setTimeout(() => {
        init();
        startGame();
        resetEndscreen();
    }, 1500);
}


/**
 * function to reset the endscreen, blending off endscreen an blend in the game navigation for touchdevices
 */
function resetEndscreen() {
    document.getElementById('restart-btn').classList.remove('display-none');
    document.getElementById('loading-btn').classList.add('display-none');
    document.getElementById('game-ends').classList.add('display-none');
    document.getElementById('game-ends').classList.remove('endscreen-boss');
    document.getElementById('game-ends').classList.remove('endscreen-pepe');
    document.getElementById('info-btns-container').classList.remove('display-none');
    document.getElementById('play-btns-container').classList.remove('display-none');
}


/**
 * clear all intervals from array allIntervals to stop all game animation
 */
function stopGame() {
    allIntervals.forEach(clearInterval);
    world.stopAudio();
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


/**
 * changes the buttom for fullscreen mode, and executes the function to get the fullscreen mode
 */
function fullscreen() {
    let content = document.getElementById('content');
    let fullscreenBtn = document.getElementById('btn-fullscreen');
    enterFullscreen(content);
    fullscreenBtn.innerHTML = /*html*/`<img onclick="closeFullscreen()" src="./img/small-screen.png" alt="normal view" class="img">`;
}


/**
 * blend off the interface from the browser
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * changes the buttom for fullscreen mode back, and executes the function to leave the fullscreen mode
 */
function closeFullscreen() {
    let fullscreenBtn = document.getElementById('btn-fullscreen');
    fullscreenBtn.innerHTML = /*html*/`<img onclick="fullscreen()" src="./img/expand-screen.png" alt="normal view" class="img">`;
    exitFullscreen();
}


/**
 * leave the fullscreen mode, and blends in the browser interface
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * show the game info overlay on start screen
 */
function showInfo() {
    document.getElementById('startscreen').classList.add('blur');
    document.getElementById('info-btns-container').classList.add('blur');
    document.getElementById('play-btns-container').classList.add('blur');
    document.getElementById('info').classList.remove('display-none');
}


/**
 * hides the game info overlay on start screen
 */
function closeInfo() {
    document.getElementById('startscreen').classList.remove('blur');
    document.getElementById('info-btns-container').classList.remove('blur');
    document.getElementById('play-btns-container').classList.remove('blur');
    document.getElementById('info').classList.add('display-none');
}