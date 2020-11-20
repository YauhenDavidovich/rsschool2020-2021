
let chipsize = 100;

const empty = {
    //epmty chip pozition
    value: 0,
    boardSize: 4,
    top: 3,
    left: 3,
    step: 0,
    gameStart: false,
    showImage: true,
    chipsImage: 1,
};
const nav = document.createElement('nav');
nav.className = 'nav';
document.body.append(nav);

const board = document.createElement('div');
board.className = 'board';

const startButton = document.createElement('div');
startButton.className = 'button__start on';
startButton.innerText = 'Pause';
nav.append(startButton);

let eleTimer = document.createElement('div');
eleTimer.className = 'stopwatch';
eleTimer.innerHTML = '00 : 00 : 00';
nav.append(eleTimer);

const counter = document.createElement('div');
counter.className = 'counter';
counter.innerHTML = `<span class="description">Moves </span><span class="counter">${empty.step}</span></div>`;
nav.append(counter);

const soundButton = document.createElement('i');
soundButton.className = 'material-icons button__sound on';
soundButton.innerText = 'volume_down';
nav.append(soundButton);

const imageButton = document.createElement('i');
imageButton.className = 'material-icons button__image on';
imageButton.innerText = 'image';
nav.append(imageButton);

function generateBoard() {
    board.style.width = `${empty.boardSize * chipsize}px`;
    board.style.height = `${empty.boardSize * chipsize}px`;
    document.body.append(board);
}

const chip = document.querySelector('.chip');

let numbers = [];

let chips = []; //storage for chips positions
chips.push(empty);

function playSound(url) {
    let audio = document.createElement('audio');
    audio.src = url;
    audio.load();
    audio.play();
    audio = undefined;
}

function generataSolvebaleGame() {    
    let arrayLength = empty.boardSize * empty.boardSize - 1;    
    numbers = [...Array(arrayLength).keys()]
    .sort(() => Math.random() - 0.5); //array of random numbers
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        let k = i + 1;
        while (k < numbers.length) {
            if (numbers[k] < numbers[i]) {
                sum++;
            }
            k++;
        }
    }
    sum = sum + empty.boardSize; //add row number of empty chip    
    if (empty.boardSize % 2 !== 0) {
        if (sum % 2 === 0) {
            //if not solvable, randomize again
            console.log('cant solve, new layaot was generated');
            generataSolvebaleGame(empty.boardSize);
        }
    } else if (empty.boardSize % 2 === 0) {
        if (sum % 2 !== 0) {
            //if not solvable, randomize again
            console.log('cant solve, new layaot was generated');
            generataSolvebaleGame(empty.boardSize);
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createBoard(n) {  
    let backgroundImage = getRandomInt(1, 21);
    empty.chipsImage = backgroundImage;

    for (let i = 0; i <= empty.boardSize * empty.boardSize - 2; i++) {
        const chip = document.createElement('div');
        chip.className = 'chip chip__image';

        if (!empty.showImage) {
            chip.style.backgroundImage = `url('assets/images/0.jpg')`;
        } else {
            chip.style.backgroundImage = `url('assets/images/${backgroundImage}.jpg')`;
        }

console.log(numbers)
        const value = numbers[i] + 1;
        chip.innerHTML = value; //get chip index from array of ramdom numbers

        const left = i % empty.boardSize;
        const top = (i - left) / empty.boardSize;        

        chips.push({
            value: value,
            left: left,
            top: top,
            element: chip,
        });
        
        chip.style.width = `${chipsize}px`;
        chip.style.height = `${chipsize}px`;

        chip.style.left = `${left * chipsize}px`;
        chip.style.top = `${top * chipsize}px`;

        chip.style.backgroundSize = `${empty.boardSize * chipsize}px`;
        chip.style.backgroundPositionX = `${
      -((value - 1) % empty.boardSize) * chipsize
    }px`;
        chip.style.backgroundPositionY = `${
      (-(value - 1 - ((value - 1) % empty.boardSize)) / empty.boardSize) * chipsize
    }px`;

        board.append(chip);

        chip.addEventListener('click', () => {
            //move chip to empty place
            move(i);
            //timeTicker.start();
        });
    }
}

function move(index) {
    const chip = chips[index + 1];    
    const leftDiff = Math.abs(empty.left - chip.left);
    const toptDiff = Math.abs(empty.top - chip.top);

    if (leftDiff + toptDiff > 1) {
        console.log('cant move');
        return;
    }
    chip.element.style.left = `${empty.left * chipsize}px`;
    chip.element.style.top = `${empty.top * chipsize}px`;

    let emptyLeft = empty.left; //bufer chip position
    let emptyTop = empty.top;
    empty.left = chip.left;
    empty.top = chip.top;
    chip.left = emptyLeft;
    chip.top = emptyTop;
    empty.step++;
    counter.innerHTML = `<span class="counter__description">Moves </span><span class="counter__count">${empty.step}</span></div>`;
    if (soundButton.classList.contains('on')) {
        playSound(`./assets/sounds/move.wav`);
    }

    const isFinished = chips.slice(1).every((chip) => {        
        return chip.value === chip.top * empty.boardSize + chip.left + 1;
    });
    if (isFinished) {
        const congratulation = document.createElement('div');
        congratulation.className = 'modal';
        congratulation.innerHTML = `Ура!<br> Вы решили головоломку <br>за ${eleTimer.innerHTML} мс <br> использовав ${empty.step} ходов`;
        board.append(congratulation);
        timeTicker.stop();
        if (soundButton.classList.contains('on')) {
            playSound(`./assets/sounds/win.wav`);
        }
    }
}

function greeting() {
    startButton.classList.add('dissabled');
    const modalGreeting = document.createElement('div');
    modalGreeting.className = 'modal__greeting';
    modalGreeting.innerHTML = `<div class="button__new greeting__button" id="button__new">New Game</div>
    <div class="button__save greeting__button" id="button__save">Save Game</div>
  <div class="button__load greeting__button" id="button__load">Load Game</div>
  <div class="button__score greeting__button" id="button__score">Score</div>`;
    board.append(modalGreeting);
    const newButton = document.getElementById('button__new');
    newButton.addEventListener('click', chooseBoard);
    if (empty.gameStart) {
        startButton.classList.remove('dissabled');
    }

    const saveButton = document.getElementById('button__save');
    saveButton.addEventListener('click', saveGame);

    const loadButton = document.getElementById('button__load');
    loadButton.addEventListener('click', loadgame);

    const scoreButton = document.getElementById('button__score');
    scoreButton.addEventListener('click', showScoree);
    
}

function loadgame() {    
    alert("Load game function is not enable now");

}


function saveGame() {    
    alert("Save game function is not enable now");

}

function showScoree() {    
    alert("Score is not enable now");

}

function clearBoard() {
    const myNode = document.querySelector('.board');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    numbers = [];
    chips = [];
    chips.push(empty);
}


function startGame(n) {
    clearBoard();
    empty.boardSize = n;    
    chipsize = parseFloat((100 * 4) / n);    
    empty.top = n - 1;
    empty.left = n - 1;
    empty.step = 0;
    counter.innerHTML = `<span class="counter__description">Moves </span><span class="counter__count">${empty.step}</span></div>`;    
    generateBoard();
    generataSolvebaleGame(n);
    createBoard(n);
    empty.gameStart = true;
    timeTicker.reset();
    timeTicker.start();
    startButton.classList.remove('dissabled');
    startButton.classList.add('on');
    startButton.innerText = 'Pause';
}

function chooseBoard() {
    const modalChooseBoard = document.createElement('div');
    modalChooseBoard.className = 'modal__choose_board';
    modalChooseBoard.innerHTML = `<div class="button__choose_board resume" id="resume">Back</div>
    <div class="button__choose_board three-x-tree" id="x3">3x3</div>
    <div class="button__choose_board four-x-four" id="x4">4x4</div>
    <div class="button__choose_board five-x-five" id="x5">5x5</div>
    <div class="button__choose_board six-x-six" id="x6">6x6</div>
    <div class="button__choose_board seven-x-seven" id="x7">7x7</div>
    <div class="button__choose_board eight-x-eight" id="x8">8x8</div>`;
    document.querySelector('.modal__greeting').remove();
    board.append(modalChooseBoard);
    startButton.classList.add('dissabled');

    const backFromBoardSize = document.getElementById('resume');

    backFromBoardSize.addEventListener('click', () => {
        document.querySelector('.modal__choose_board').remove();
        greeting();
    });

    const threeBoard = document.getElementById('x3');
    threeBoard.addEventListener('click', () => startGame(3));

    const fourBoard = document.getElementById('x4');
    fourBoard.addEventListener('click', () => startGame(4));

    const fiveBoard = document.getElementById('x5');
    fiveBoard.addEventListener('click', () => startGame(5));

    const sixBoard = document.getElementById('x6');
    sixBoard.addEventListener('click', () => startGame(6));

    const sevenBoard = document.getElementById('x7');
    sevenBoard.addEventListener('click', () => startGame(7));

    const eightBoard = document.getElementById('x8');
    eightBoard.addEventListener('click', () => startGame(8));
}

window.addEventListener(
    'DOMContentLoaded',
    generateBoard(4),    
    greeting()
);

soundButton.addEventListener('click', () => {
    if (soundButton.classList.contains('on')) {
        soundButton.classList.remove('on');
        soundButton.innerHTML = `<i class="material-icons">volume_off</i>`;
    } else {
        soundButton.classList.add('on');
        soundButton.innerHTML = `<i class="material-icons">volume_down</i>`;
    }
});

startButton.addEventListener('click', () => {
    if (startButton.classList.contains('dissabled')) {
        return;
    } else if (startButton.classList.contains('on')) {
        startButton.classList.remove('on');
        startButton.innerText = 'Resume';
        greeting();
        timeTicker.stop();
    } else {
        startButton.classList.add('on');
        startButton.innerText = 'Pause';
        let modal = document.querySelector('.modal__greeting');
        modal.parentNode.removeChild(modal);
        timeTicker.start();
    }
});

//stopwatch
let timeTicker = (() => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let timerTick;
    return {
        start: () => {
            if (!timerTick) {
                timerTick = setInterval(() => {
                    seconds++;
                    if (seconds == 60) {
                        minutes += 1;
                        seconds = 0;
                        if (minutes == 60) {
                            hours += 1;
                            minutes = 0;
                        }
                    }
                    eleTimer.innerHTML = `
${hours.toString().length == 1 ? '0' + hours : hours}
: ${minutes.toString().length == 1 ? '0' + minutes : minutes}
: ${seconds.toString().length == 1 ? '0' + seconds : seconds}`;
                }, 25);
            }
        },
        stop: () => {
            if (timerTick) {
                console.log('stop clock');
                clearInterval(timerTick);
                timerTick = false;
                console.log('stop clock');
            }
        },

        reset: () => {
            seconds = minutes = hours = 0;
            clearInterval(timerTick);
            timerTick = false;
            eleTimer.innerHTML = `<br />0${hours} : 0${minutes} : 0${seconds}`;
        },
    };
})();


imageButton.addEventListener('click', () => {
    const chips = document.querySelector('.board').children;
    if (imageButton.classList.contains('on')) {
        imageButton.classList.remove('on');
        imageButton.innerText = 'image_not_supported';
        empty.showImage = false;
        for (let i = 0, chip; chip = chips[i]; i++) {
            chip.style.backgroundImage = `none`;
        }
    } else {
        imageButton.classList.add('on');
        imageButton.innerText = 'image';
        empty.showImage = true;
        for (let i = 0, chip; chip = chips[i]; i++) {
            chip.style.backgroundImage = `url('assets/images/${empty.chipsImage}.jpg')`;
        }

    }
});
