const container = document.querySelector('.container');
const drawBtn = document.querySelector('.btn__draw');
const eraseBtn = document.querySelector('.btn__eraser');
const resetBtn = document.querySelector('.btn__reset');
let draw = true;
let size = 16;

const createGrid = size => {
  for (i = 0; i < size * size; i++) {
    // Create single Grid Cell
    const square = document.createElement('div');

    // Add box style to square
    square.classList.add('grid__square');

    square.style.padding = `${720 / size / 2 - 1}px`;

    // add to OG DIV in HTML
    container.append(square);
    console.log('CREATING GRID', performance.now());
  }
  container.addEventListener('mouseover', colorSquare);
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

const clearGrid = () => {
  container.removeEventListener('mouseover', colorSquare);
  container.removeEventListener('mouseover', removeSquare);

  while (container.firstChild) {
    container.removeChild(container.firstChild);
    console.log('CLEARING GRID WHILE LOOP', performance.now());
  }
  console.log('CLEARING GRID END', performance.now());
};

const colorSquare = e => {
  if (e.target.className === 'grid__square' && draw) {
    e.target.classList.add('hover');
  }
  console.log('HOVER', performance.now());
};

const removeSquare = e => {
  if (e.target.classList.contains('hover') && !draw) {
    e.target.classList.remove('hover');
    console.log('REMOVE', performance.now());
  }
};

drawBtn.addEventListener('click', () => {
  container.removeEventListener('mouseover', removeSquare);
  container.addEventListener('mouseover', colorSquare);
  draw = true;
  drawBtn.classList.add('btn--active');
  eraseBtn.classList.remove('btn--active');
});

eraseBtn.addEventListener('click', () => {
  container.removeEventListener('mouseover', colorSquare);
  draw = false;
  eraseBtn.classList.add('btn--active');
  drawBtn.classList.remove('btn--active');
  container.addEventListener('mouseover', removeSquare);
});

resetBtn.addEventListener('click', () => {
  // resetBtn.classList.toggle('btn--active');
  eraseBtn.classList.remove('btn--active');
  drawBtn.classList.add('btn--active');
  const pixels = document.querySelectorAll('.hover');
  pixels.forEach(pixel => {
    pixel.classList.remove('hover');
  });
  draw = true;
  size = -1;

  while (size > 100 || size < 1) {
    size = Number(
      prompt(
        'Please input your desired size of grid with a whole number. (max num avaible is 100)',
        '16'
      )
    );
  }

  // Remove old grid to make room for new one
  clearGrid();

  // Create new grid with user's desired size.
  createGrid(size);
});

document.body.onload = createGrid(size);
