const container = document.querySelector('.container');
const buttons = document.querySelectorAll('.btn');
const drawBtn = document.querySelector('.btn__draw');
const rgbBtn = document.querySelector('.btn__rgb');
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
    // console.log('CREATING GRID', performance.now());
  }
  container.addEventListener('mouseover', drawSquare);
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
};

const clearGrid = () => {
  container.removeEventListener('mouseover', drawSquare);
  container.removeEventListener('mouseover', removeSquare);

  while (container.firstChild) {
    container.removeChild(container.firstChild);
    // console.log('CLEARING GRID WHILE LOOP', performance.now());
  }
  // console.log('CLEARING GRID END', performance.now());
};

const generateRandNum = () => Math.floor(Math.random() * 255);

const drawSquare = e => {
  if (e.target.className === 'grid__square' && draw) {
    e.target.classList.add('hover');
    e.target.style.backgroundColor = `burlywood`;
  }
  // console.log('HOVER', performance.now());
};

const colorSquare = e => {
  if (e.target.className === 'grid__square' && draw) {
    e.target.style.backgroundColor = `rgb(${generateRandNum()}, ${generateRandNum()}, ${generateRandNum()})`;
    e.target.classList.add('hover');
  }
};

const removeSquare = e => {
  if (e.target.classList.contains('hover') && !draw) {
    e.target.classList.remove('hover');
    e.target.style.backgroundColor = `#fff`;
    // console.log('REMOVE', performance.now());
  } else {
  }
};

const changeActiveBtn = e => {
  if (e.target.classList.contains('btn__reset')) {
    console.log('here');
    eraseBtn.classList.remove('btn--active');
    rgbBtn.classList.remove('btn--active');
    drawBtn.classList.add('btn--active');
  } else {
    buttons.forEach(btn => {
      if (btn.classList.contains('btn--active')) {
        btn.classList.remove('btn--active');
      }
    });
    e.target.classList.add('btn--active');
  }
};

drawBtn.addEventListener('click', e => {
  container.removeEventListener('mouseover', removeSquare);
  container.addEventListener('mouseover', drawSquare);
  draw = true;
  changeActiveBtn(e);
});

rgbBtn.addEventListener('click', e => {
  container.removeEventListener('mouseover', removeSquare);
  container.removeEventListener('mouseover', drawSquare);
  container.addEventListener('mouseover', colorSquare);
  draw = true;
  changeActiveBtn(e);
});

eraseBtn.addEventListener('click', e => {
  container.removeEventListener('mouseover', drawSquare);
  container.removeEventListener('mouseover', colorSquare);
  draw = false;
  changeActiveBtn(e);
  container.addEventListener('mouseover', removeSquare);
});

resetBtn.addEventListener('click', e => {
  changeActiveBtn(e);
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
