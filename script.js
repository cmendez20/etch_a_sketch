const container = document.querySelector('.container');
const drawBtn = document.querySelector('.btn__draw');
const eraseBtn = document.querySelector('.btn__eraser');
const resetBtn = document.querySelector('.btn__reset');
let draw = true;

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
  if (e.target.className === 'grid__cell' && draw) {
    e.target.classList.add('hover');
  }
});

drawBtn.addEventListener('click', () => (draw = true));

eraseBtn.addEventListener('click', () => {
  draw = false;
  container.addEventListener('mouseover', e => {
    if (e.target.classList.contains('hover') && !draw) {
      e.target.classList.remove('hover');
    }
  });
});

resetBtn.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.hover');
  pixels.forEach(pixel => {
    pixel.classList.remove('hover');
  });
  draw = true;
});
