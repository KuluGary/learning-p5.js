// sketch.js
let grid;

function setup() {
  createCanvas(800, 800);
  randomSeed(1);

  grid = new Grid(width, height);
  grid.fill();
}

function mousePressed() {
  redraw();
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

function draw() {
  background(0);

  grid.draw();

  let gridCopy = grid.tiles
    .slice()
    .filter((a) => !a.collapsed)
    .sort((a, b) => a.options.length - b.options.length);

  if (grid.tiles.length === 0) return;

  let len = gridCopy[0].options.length;
  let stopIndex = 0;

  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);

  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  if (pick === undefined) {
    startOver();
    return;
  }
  cell.options = [pick];

  const nextGrid = [];

  for (let j = 0; j < grid.dimensions; j++) {
    for (let i = 0; i < grid.dimensions; i++) {
      let index = i + j * grid.dimensions;

      if (grid.tiles[index].collapsed) {
        nextGrid[index] = grid.tiles[index];
      } else {
        let options = Object.values(TileDefaults.DIRECTIONS);

        if (j > 0) {
          let up = grid.tiles[i + (j - 1) * grid.dimensions];
          let validOptions = [];

          for (let option of up.options) {
            let valid = TileDefaults.RULES[option][2];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        if (i < grid.dimensions - 1) {
          let right = grid.tiles[i + 1 + j * grid.dimensions];
          let validOptions = [];

          for (let option of right.options) {
            let valid = TileDefaults.RULES[option][3];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        if (j < grid.dimensions - 1) {
          let down = grid.tiles[i + (j + 1) * grid.dimensions];
          let validOptions = [];

          for (let option of down.options) {
            let valid = TileDefaults.RULES[option][0];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        if (i > 0) {
          let left = grid.tiles[i - 1 + j * grid.dimensions];
          let validOptions = [];

          for (let option of left.options) {
            let valid = TileDefaults.RULES[option][1];
            validOptions = validOptions.concat(valid);
          }

          checkValid(options, validOptions);
        }

        nextGrid[index] = new Tile(false, options);
      }
    }
  }

  grid.tiles = nextGrid;
}
// tile-defaults.js
class TileDefaults {
  static DIRECTIONS = {
    BLANK: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4,
  };

  static RULES = [
    // BLANK
    [
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.UP],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.RIGHT],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.LEFT],
    ],
    // UP
    [
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.LEFT, this.DIRECTIONS.UP, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.UP, this.DIRECTIONS.DOWN],
    ],
    // RIGHT
    [
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.LEFT, this.DIRECTIONS.UP, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.UP],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.LEFT],
    ],
    // DOWN
    [
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.UP],
      [this.DIRECTIONS.LEFT, this.DIRECTIONS.UP, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.UP],
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.UP, this.DIRECTIONS.DOWN],
    ],
    // LEFT
    [
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.DOWN],
      [this.DIRECTIONS.BLANK, this.DIRECTIONS.RIGHT],
      [this.DIRECTIONS.RIGHT, this.DIRECTIONS.LEFT, this.DIRECTIONS.UP],
      [this.DIRECTIONS.UP, this.DIRECTIONS.DOWN, this.DIRECTIONS.RIGHT],
    ],
  ];

  static IMAGES = [];

  loadImages() {
    this.IMAGES = [
      // BLANK:
      loadImage("tiles/blank.png"),
      // UP:
      loadImage("tiles/up.png"),
      // RIGHT:
      loadImage("tiles/right.png"),
      // DOWN:
      loadImage("tiles/down.png"),
      // LEFT:
      loadImage("tiles/left.png"),
    ];

    return this.IMAGES;
  }
}

// grid.js
class Grid {
  tiles = [];
  dimensions = 10;
  _images = new TileDefaults().loadImages();

  constructor(width, height) {
    this.w = width / this.dimensions;
    this.h = height / this.dimensions;
  }

  fill() {
    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.tiles[i] = new Tile();
    }
  }

  draw() {
    for (let i = 0; i < this.dimensions; i++) {
      for (let j = 0; j < this.dimensions; j++) {
        let cell = this.tiles[i + j * this.dimensions];

        if (cell.collapsed) {
          image(
            this._images[cell.options[0]],
            i * this.w,
            j * this.h,
            this.w,
            this.h
          );
        } else {
          fill(0);
          stroke(255);
          rect(i * this.w, j * this.h, this.w, this.h);
        }
      }
    }
  }

  set tiles(newTiles) {
    this.tiles = newTiles;
  }
}

// tile.js
class Tile {
  constructor(
    collapsed = false,
    options = Object.values(TileDefaults.DIRECTIONS)
  ) {
    this.collapsed = collapsed;
    this.options = options;
  }
}
