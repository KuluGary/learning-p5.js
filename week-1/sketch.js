const drops = [];
let start;

let palette = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#f368e0"];
let dropMinSize = 10;
let dropMaxSize = 50;

let colorPickers = [];
let minSizeInput, maxSizeInput, applyBtn;

const tineLength = 80;
const tineCount = 16;

function setup() {
  createCanvas(600, 600);
  colorMode(RGB);

  minSizeInput = createInput(dropMinSize.toString(), "number");
  minSizeInput.position(420, height + 10);
  minSizeInput.size(50);

  maxSizeInput = createInput(dropMaxSize.toString(), "number");
  maxSizeInput.position(480, height + 10);
  maxSizeInput.size(50);

  for (let i = 0; i < palette.length; i++) {
    let picker = createColorPicker(palette[i]);
    picker.position(10 + i * 60, height + 10);
    colorPickers.push(picker);
  }

  applyBtn = createButton("Apply Settings");
  applyBtn.position(540, height + 10);
  applyBtn.mousePressed(updateSettings);
}

function draw() {
  background(220);

  for (const drop of drops) {
    drop.show();
  }
}

function tineLine(
  direction,
  mouseX,
  mouseY,
  length = tineLength,
  count = tineCount
) {
  for (let drop of drops) {
    drop.tine(direction, mouseX, mouseY, length, count);
  }
}

function mousePressed() {
  start = createVector(mouseX, mouseY);
}

function mouseReleased() {
  let end = createVector(mouseX, mouseY).sub(start).normalize();

  if (start.x === mouseX && start.y === mouseY) {
    dropInk(mouseX, mouseY, random(10, 50));
  } else {
    tineLine(end, mouseX, mouseY, 80, 16);
  }
}

function dropInk(x, y, radius) {
  const drop = new Drop(x, y, radius, random(palette));

  for (let otherDrop of drops) {
    otherDrop.marble(drop);
  }

  drops.push(drop);
}

function updateSettings() {
  palette = paletteInput
    .value()
    .split(",")
    .map((c) => c.trim());
  dropMinSize = parseFloat(minSizeInput.value()) || dropMinSize;
  dropMaxSize = parseFloat(maxSizeInput.value()) || dropMaxSize;
  console.log("Updated settings:", { palette, dropMinSize, dropMaxSize });
}
