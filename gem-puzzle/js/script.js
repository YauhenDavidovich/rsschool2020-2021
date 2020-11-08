const board = document.createElement('div');
board.className = 'board'
document.body.append(board);
const chip = document.querySelector('.chip');

const empty = {  //epmty chip pozition
    top: 0,
    left: 0
}

for (let i=1; i<=15; i++) {
    const chipsize = 100;
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.innerHTML = i;
    const left = i % 4;
    const top = (i - left)/4;
    chip.style.left = `${left*chipsize}px`;
    chip.style.top = `${top*chipsize}px`;
    board.append(chip);
}