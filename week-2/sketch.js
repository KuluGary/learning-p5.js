let marchingSquares, grid;

function setup() {
  createCanvas(300, 300);
  grid = new Grid(10);
  marchingSquares = new MarchingSquares(
    grid.rows,
    grid.cols,
    grid.resolution,
    grid.fields
  );
}

function draw() {
  background(0);

  grid.drawGrid();
  marchingSquares.show();
}
