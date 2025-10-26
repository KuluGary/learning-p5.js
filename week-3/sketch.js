let grid;

function setup() {
  createCanvas(800, 800);
  randomSeed(new Date().getTime());
  grid = new Grid(width, height);
  grid.fill();
}

function draw() {
  background(0);
  grid.update();
  grid.draw();
}

function mousePressed() {
  grid.reset();
}
