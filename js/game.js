let canvas;
let startscreen;
let world;
let allIntervals = [];
let keyboard = new Keyboard();
let allAssetsAreLoaded = false;


/**
 * init game by initialize a new world
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchEventsStart();
    touchEventsEnd();
}


/**
 * blends off the loading spinner, blends in the buttons for info and buttons for mobile control
 */
window.addEventListener('load', () => {
    document.getElementById('loader-box').classList.add('display-none');
    document.getElementById('info-btns-container').classList.remove('display-none');
    document.getElementById('play-btns-container').classList.remove('display-none');
});


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
    document.getElementById('loader-box').classList.remove('display-none');
    let startGameAnimations = setInterval(() => {
        if (allAssetsAreLoaded) {
            document.getElementById('loader-box').classList.add('display-none');
            startAnimations();
            world.playBackgroundAudio();
            canvas.classList.remove('display-none');
            document.getElementById('startscreen').classList.add('display-none');
            clearInterval(startGameAnimations);
            allAssetsAreLoaded = false;
        }
    }, 200);
}


function startAnimations() {
    world.character.animate();
    world.level.endboss.animate();
    world.level.enemies.forEach(enemy => {
        enemy.animate();
    });
    // world.level.clouds.forEach(cloud => {
    //     cloud.animate();
    // });
}


/**
 * function to restart the game after one run
 */
function restartGame() {
    document.getElementById('loader-box').classList.remove('display-none');
    setTimeout(() => {
        resetEndscreen();
        init();
        startGame();
        document.getElementById('info-btns-container').classList.remove('display-none');
        document.getElementById('play-btns-container').classList.remove('display-none');
    }, 2000);

}


/**
 * function to reset the endscreen, blending off endscreen and restart button
 */
function resetEndscreen() {
    document.getElementById('restart-btn-boss').classList.add('display-none');
    document.getElementById('restart-btn-character').classList.add('display-none');
    document.getElementById('character_lost').style.removeProperty('visibility');
    document.getElementById('character_won').style.removeProperty('visibility');
}


/**
 * clear all intervals from array allIntervals to stop all game animation, reset sound button
 */
function stopGame() {
    allIntervals.forEach(clearInterval);
    world.stopBackgroundAudio();
    document.getElementById('btn-mute').classList.remove('display-none');
    document.getElementById('btn-unmute').classList.add('display-none');
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
        keyboard.LEFT = true;
        ev.preventDefault();
    });
    document.getElementById('btn-right').addEventListener('touchstart', (ev) => {
        keyboard.RIGHT = true;
        ev.preventDefault();
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (ev) => {
        keyboard.UP = true;
        ev.preventDefault();
    });
    document.getElementById('btn-throw').addEventListener('touchstart', (ev) => {
        keyboard.THROW = true;
        ev.preventDefault();
    });
}


function touchEventsEnd() {
    document.getElementById('btn-left').addEventListener('touchend', (ev) => {
        keyboard.LEFT = false;
        ev.preventDefault();
    });
    document.getElementById('btn-right').addEventListener('touchend', (ev) => {
        keyboard.RIGHT = false;
        ev.preventDefault();
    });
    document.getElementById('btn-jump').addEventListener('touchend', (ev) => {
        keyboard.UP = false;
        ev.preventDefault();
    });
    document.getElementById('btn-throw').addEventListener('touchend', (ev) => {
        keyboard.THROW = false;
        ev.preventDefault();
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
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
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


function muteAllAudio() {
    document.getElementById('btn-mute').classList.add('display-none');
    document.getElementById('btn-unmute').classList.remove('display-none');
    world.muteWorldAudio();
    world.character.muteCharacterAudio();
    world.level.coins.forEach(coin => {
        coin.muteCoinAudio();
    });
    world.level.endboss.muteEndbossAudio();
}


function unmuteAllAudio() {
    document.getElementById('btn-mute').classList.remove('display-none');
    document.getElementById('btn-unmute').classList.add('display-none');
    world.unmuteWorldAudio();
    world.character.unmuteCharacterAudio();
    world.level.coins.forEach(coin => {
        coin.unmuteCoinAudio();
    });
    world.level.endboss.unmuteEndbossAudio();
}


/**
 * show the game info overlay on start screen
 */
function showInfo() {
    stopGame();
    document.getElementById('startscreen').classList.add('blur');
    document.getElementById('info-btns-container').classList.add('blur');
    document.getElementById('play-btns-container').classList.add('blur');
    document.getElementById('info').classList.remove('display-none');
}


/**
 * hides the game info overlay on start screen
 */
function closeInfo() {
    startAnimations();
    world.run();
    document.getElementById('startscreen').classList.remove('blur');
    document.getElementById('info-btns-container').classList.remove('blur');
    document.getElementById('play-btns-container').classList.remove('blur');
    document.getElementById('info').classList.add('display-none');
}