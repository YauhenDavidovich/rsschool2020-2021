const board = document.createElement('div');
board.className = 'board'
document.body.append(board);
const chip = document.querySelector('.chip');

const chipsize = 100;


const empty = {  //epmty chip pozition
    value: 0,
    top: 0,
    left: 0,
    step: 0,
}

const numbers = [...Array(15).keys()]  //array of random numbers
//.sort(() => Math.random()-0.5)

function move(index) {
    const chip = chips[index]
    const leftDiff = Math.abs(empty.left - chip.left);
    const toptDiff = Math.abs(empty.top - chip.top);

    if (leftDiff + toptDiff > 1) {
        return
    } 
    chip.element.style.left = `${empty.left*chipsize}px`;
    chip.element.style.top = `${empty.top*chipsize}px`;


    const emptyLeft = empty.left; //bufer chip position
    const emptyTop = empty.top;
    empty.left = chip.left;
    empty.top = chip.top;
    chip.left = emptyLeft;
    chip.top = emptyTop;
    empty.step ++;
    console.log(empty.step)

    const isFinished = chips.every(chip => {
        console.log(chip.value, chip.top, chip.left)
        return chip.value === chip.top * 4 + chip.left;
    })
    if (isFinished) {
        const congratulation = document.createElement('div');
congratulation.className = 'congrat';
congratulation.innerHTML = `Ура! Вы решили головоломку за  ${empty.step} ходов`;
        board.append(congratulation);
    }
}




const chips = [] //storage for chips positions
chips.push(empty)

for (let i=1; i<=15; i++) {    
    const chip = document.createElement('div');
    chip.className = 'chip';
    const value = numbers[i-1] + 1;
    chip.innerHTML = value; //get chip index from array of ramdom numbers

    const left = i % 4;
    const top = (i - left)/4;

    chips.push({
        value: value,
        left: left,
        top: top,
        element: chip
    });


    chip.style.left = `${left*chipsize}px`;
    chip.style.top = `${top*chipsize}px`;

    board.append(chip);


    chip.addEventListener('click', () => {  //move chip to empty place
        move(i)
    })
}

