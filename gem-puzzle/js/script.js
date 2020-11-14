let boardSize = 4;
const empty = {
    //epmty chip pozition
    value: 0,
    top: boardSize - 1,
    left: boardSize - 1,
    step: 0,
};
const nav = document.createElement('nav');
nav.className = 'nav';
document.body.append(nav);

const board = document.createElement('div');
board.className = 'board';

const startButton = document.createElement('button');
startButton.className = 'button__start on';
startButton.innerText = 'Pause';
nav.append(startButton);

// const newButton = document.createElement('button');
// newButton.className = 'button__new';
// newButton.innerText = 'New';
// nav.append(newButton);

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

function generateBoard(boardSize = 4) {
    board.style.width = `${boardSize * 100}px`;
    board.style.height = `${boardSize * 100}px`;
    document.body.append(board);
}

const chip = document.querySelector('.chip');

const chipsize = 100;

let numbers = [];

const chips = []; //storage for chips positions
chips.push(empty);

function playSound(url) {
    let audio = document.createElement('audio');
    audio.src = url;
    audio.load();
    audio.play();
    audio = undefined;
}

function generataSolvebaleGame() {
    let arrayLength = boardSize * boardSize - 1;
    console.log(arrayLength);
    numbers = [...Array(arrayLength).keys()];
    //.sort(() => Math.random() - 0.5); //array of random numbers
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
    sum = sum + boardSize; //add row number of empty chip
    console.log('sum is: ', sum);
    if (boardSize % 2 !== 0) {
        if (sum % 2 === 0) {
            //if not solvable, randomize again
            console.log('cant solve');
            generataSolvebaleGame(boardSize);
        }
    } else if (boardSize % 2 === 0) {
        if (sum % 2 !== 0) {
            //if not solvable, randomize again
            console.log('cant solve');
            generataSolvebaleGame(boardSize);
        }
    }
}

function createBoard(boardSize) {
    generataSolvebaleGame();

    for (let i = 0; i <= boardSize * boardSize - 2; i++) {
        const chip = document.createElement('div');
        chip.className = 'chip chip__image';
        const value = numbers[i] + 1;
        chip.innerHTML = value; //get chip index from array of ramdom numbers

        const left = i % boardSize;
        const top = (i - left) / boardSize;

        chips.push({
            value: value,
            left: left,
            top: top,
            element: chip,
        });

        chip.style.left = `${left * chipsize}px`;
        chip.style.top = `${top * chipsize}px`;

        chip.style.backgroundSize = `${boardSize * chipsize}px`;
        chip.style.backgroundPositionX = `${
      -((value - 1) % boardSize) * chipsize
    }px`;
        chip.style.backgroundPositionY = `${
      (-(value - 1 - ((value - 1) % boardSize)) / boardSize) * chipsize
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

    const emptyLeft = empty.left; //bufer chip position
    const emptyTop = empty.top;
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
        console.log(chip.value, chip.top, chip.left);
        return chip.value === chip.top * boardSize + chip.left + 1;
    });
    if (isFinished) {
        const congratulation = document.createElement('div');
        congratulation.className = 'modal';
        congratulation.innerHTML = `Ура! Вы решили головоломку за  ${empty.step} ходов`;
        board.append(congratulation);
        timeTicker.stop();
        if (soundButton.classList.contains('on')) {
            playSound(`./assets/sounds/win.wav`);
        }
    }
}

function greeting() {
    const modalGreeting = document.createElement('div');
    modalGreeting.className = 'modal__greeting';
    modalGreeting.innerHTML = `<div class="button__new greeting__button" id="button__new">New Game</div>
  <div class="button__load greeting__button">Load Game</div>
  <div class="button__score greeting__button">Score</div>`;
    board.append(modalGreeting);
    const newButton = document.getElementById("button__new");
    newButton.addEventListener("click", chooseBoard)
}


function clearBoard() {
    const myNode = document.querySelector(".board");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

}


function startGame(n) {
    boardSize = n;
        clearBoard();
        empty.top = n-1
        empty.left = n-1;
        generateBoard(n)
        createBoard(n);
        timeTicker.start()

}

function chooseBoard() {
    const modalChooseBoard = document.createElement('div');
    modalChooseBoard.className = 'modal__choose_board';
    modalChooseBoard.innerHTML = `<div class="button__choose_board resume" id="resume">Resume</div>
    <div class="button__choose_board three-x-tree" id="x3">3x3</div>
    <div class="button__choose_board four-x-four" id="x4">4x4</div>
    <div class="button__choose_board five-x-five" id="x5">5x5</div>
    <div class="button__choose_board six-x-six" id="x6">6x6</div>
    <div class="button__choose_board seven-x-seven" id="x7">7x7</div>
    <div class="button__choose_board eight-x-eight" id="x8">8x8</div>`;
    document.querySelector(".modal__greeting").remove();

    board.append(modalChooseBoard);

    const threeBoard = document.getElementById("x3");
    threeBoard.addEventListener("click", () => startGame(3));

    const fourBoard = document.getElementById("x4");
    fourBoard.addEventListener("click", () => startGame(4));

    const fiveBoard = document.getElementById("x5");
    fiveBoard.addEventListener("click", () => startGame(5));

    const sixBoard = document.getElementById("x6");
    sixBoard.addEventListener("click", () => startGame(6));

    const sevenBoard = document.getElementById("x7");
    sevenBoard.addEventListener("click", () => startGame(7));
    
    const eightBoard = document.getElementById("x8");
    eightBoard.addEventListener("click", () => startGame(8));
}



window.addEventListener('DOMContentLoaded', generateBoard(), createBoard(), greeting());

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
    if (startButton.classList.contains('on')) {
        startButton.classList.remove('on');
        startButton.innerText = 'Resume';
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<div>Game is paused!</div>`;
        board.append(modal);
        timeTicker.stop();
    } else {
        startButton.classList.add('on');
        startButton.innerText = 'Pause';
        let modal = document.querySelector('.modal');
        modal.parentNode.removeChild(modal);
        timeTicker.start();
    }
});

//stopwatch
let eleBtnStart = document.querySelector('#btnStart');
let eleBtnStop = document.querySelector('#btnStop');
let eleBtnReset = document.querySelector('#btnReset');

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

// eleBtnReset.addEventListener('click', () => {
//   timeTicker.reset();
// })

// chip.onmousedown = function(event) {
//     console.log('start drag & drop')

//     let shiftX = event.clientX - chip.getBoundingClientRect().left;
//     let shiftY = event.clientY - chip.getBoundingClientRect().top;

//     chip.style.position = 'absolute';
//     chip.style.zIndex = 1000;
//     board.append(chip);

//     moveAt(event.pageX, event.pageY);

//     // переносит мяч на координаты (pageX, pageY),
//     // дополнительно учитывая изначальный сдвиг относительно указателя мыши
//     function moveAt(pageX, pageY) {
//       chip.style.left = pageX - shiftX + 'px';
//       chip.style.top = pageY - shiftY + 'px';
//     }

//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY);
//     }

//     // передвигаем мяч при событии mousemove
//     document.addEventListener('mousemove', onMouseMove);

//     // отпустить мяч, удалить ненужные обработчики
//     chip.onmouseup = function() {
//       document.removeEventListener('mousemove', onMouseMove);
//       chip.onmouseup = null;
//     };

//   };

//   chip.ondragstart = function() {
//     return false;
//   };

// // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
// let currentDroppable = null;

// function onMouseMove(event) {
//   moveAt(event.pageX, event.pageY);

//   chip.hidden = true;
//   let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//   chip.hidden = false;

//   // событие mousemove может произойти и когда указатель за пределами окна
//   // (мяч перетащили за пределы экрана)

//   // если clientX/clientY за пределами окна, elementFromPoint вернёт null
//   if (!elemBelow) return;

//   // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
//   let droppableBelow = elemBelow.closest('.chip');

//   if (currentDroppable != droppableBelow) {
//     // мы либо залетаем на цель, либо улетаем из неё
//     // внимание: оба значения могут быть null
//     //   currentDroppable=null,
//     //     если мы были не над droppable до этого события (например, над пустым пространством)
//     //   droppableBelow=null,
//     //     если мы не над droppable именно сейчас, во время этого события

//     if (currentDroppable) {
//       // логика обработки процесса "вылета" из droppable (удаляем подсветку)
//       leaveDroppable(currentDroppable);
//     }
//     currentDroppable = droppableBelow;
//     if (currentDroppable) {
//       // логика обработки процесса, когда мы "влетаем" в элемент droppable
//       enterDroppable(currentDroppable);
//     }
//   }
// }