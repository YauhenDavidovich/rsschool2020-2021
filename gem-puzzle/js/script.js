const board = document.createElement('div');
board.className = 'board';
document.body.append(board);
const chip = document.querySelector('.chip');

const chipsize = 100;

const empty = {
  //epmty chip pozition
  value: 0,
  top: 3,
  left: 3,
  step: 0,
};

function playSound(url) {
  let audio = document.createElement('audio');
  audio.src = url;
  audio.load();
  audio.play();
  audio = undefined;
}

const numbers = [...Array(15).keys()];
// .sort(() => Math.random() - 0.5); //array of random numbers

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

  for (let i = 1; i < chips.length; i++) {
    //check whether all chips on their places
    if (chips[i].value !== chip.top * 4 + chip.left + 1) {
      continue;
    } else if (chips[i].value === chip.top * 4 + chip.left + 1) {
      const congratulation = document.createElement('div');
      congratulation.className = 'congrat';
      congratulation.innerHTML = `Ура! Вы решили головоломку за  ${empty.step} ходов`;
      board.append(congratulation);
      playSound(`./assets/sounds/win.wav`);
    }
  }
}

const chips = []; //storage for chips positions
chips.push(empty);

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
  //   console.log(value, top, left);

  board.append(chip);

  chip.addEventListener('click', () => {
    //move chip to empty place
    move(i);
  });
}
