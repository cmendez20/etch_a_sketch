const container = document.querySelector('.container');

const addGrid = () => {
  for (i = 0; i <= 255; i++) {
    // Create DIV
    const newDiv = document.createElement('div');

    // Add box style to newDiv
    newDiv.classList.add('grid_cell');

    // add to OG DIV in HTML
    container.append(newDiv);
  }
};

document.body.onload = addGrid;

container.addEventListener('mouseover', e => {
  console.log(e.target);
  if (e.target.className === 'grid_cell') {
    e.target.classList.add('hover');
  }
});
