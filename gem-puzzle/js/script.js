const board = document.createElement('div');
board.className = 'board';
document.body.append(board);
const chip = document.querySelector('.chip');

const chipsize = 100;

let numbers = []

const empty = {
  //epmty chip pozition
  value: 0,
  top: 3,
  left: 3,
  step: 0,
};

const chips = []; //storage for chips positions
chips.push(empty);7

function playSound(url) {
  let audio = document.createElement('audio');
  audio.src = url;
  audio.load();
  audio.play();
  audio = undefined;
}


function generataSolvebaleGame() {
    numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5); //array of random numbers
    let sum = 0;  
  for (let i = 0; i < numbers.length; i++) {      
      let k = i + 1;
      while (k < numbers.length) {
        if (numbers[k] < numbers[i]) {
          sum ++;
        };
        k++;
      };
      
    
  };
  sum = sum + 4;  
  console.log('sum is: ', sum);
  if (sum % 2 !== 0) {
    //if not solvable, randomize again
    console.log('cant solve');
    generataSolvebaleGame();
  };

}

function startGame() {

generataSolvebaleGame()



for (let i = 0; i <= 14; i++) {
    const chip = document.createElement('div');
    chip.className = 'chip';
    const value = numbers[i] + 1;
    chip.innerHTML = value; //get chip index from array of ramdom numbers
  
    const left = i % 4;
    const top = (i - left) / 4;
  
    chips.push({
      value: value,
      left: left,
      top: top,
      element: chip,
    });
  
    chip.style.left = `${left * chipsize}px`;
    chip.style.top = `${top * chipsize}px`;
    chip.setAttribute('draggable', true); 
    board.append(chip);
  
  
    chip.addEventListener('click', () => {
      //move chip to empty place
      move(i);
    });
  }
}




function move(index) {
  const chip = chips[index + 1];
  const leftDiff = Math.abs(empty.left - chip.left);
  const toptDiff = Math.abs(empty.top - chip.top);
  console.log(chip.value, chip.top, chip.left);

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
  playSound(`./assets/sounds/move.wav`);

  const isFinished = chips.slice(1).every((chip) => {
    console.log(chip.value, chip.top, chip.left);
    return chip.value === chip.top * 4 + chip.left + 1;
  });
  if (isFinished) {
    const congratulation = document.createElement('div');
    congratulation.className = 'congrat';
    congratulation.innerHTML = `Ура! Вы решили головоломку за  ${empty.step} ходов`;
    board.append(congratulation);
  }
}






startGame()


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