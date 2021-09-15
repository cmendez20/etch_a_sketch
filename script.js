const container = document.querySelector('.container');
const resetBtn = document.querySelector('.btn__reset');

const addGrid = () => {
  for (i = 0; i <= 255; i++) {
    // Create DIV
    const newDiv = document.createElement('div');

    // Add box style to newDiv
    newDiv.classList.add('grid__cell');

    // add to OG DIV in HTML
    container.append(newDiv);
  }
};

document.body.onload = addGrid;

container.addEventListener('mouseover', e => {
  console.log(e.target);
  if (e.target.className === 'grid__cell') {
    e.target.classList.add('hover');
  }
});

resetBtn.addEventListener('click', () => {
  const grid = document.querySelectorAll('.grid__cell');
  grid.forEach(cell => {
    cell.classList.remove('hover');
  });
});
