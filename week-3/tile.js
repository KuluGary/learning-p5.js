class Tile {
  constructor() {
    this.collapsed = false;
    this.tileDefaults = new TileDefaults();
    this.options = Object.keys(this.tileDefaults.rules);
  }

  collapse() {
    this.collapsed = true;
    this.options = [random(this.options)];
  }

  updateOptions(grid, i, j) {
    if (this.collapsed) return; // no need to update if already collapsed

    let newOptions = Object.values(this.tileDefaults.directions);

    // Check each of the four directions:
    const dim = grid.dimensions;

    // --- UP ---
    if (j > 0) {
      const neighbor = grid.tiles[i + (j - 1) * dim];
      let valid = [];
      for (const nOpt of neighbor.options) {
        valid = valid.concat(this.tileDefaults.rules[nOpt][2]); // neighbor's DOWN rules
      }
      checkValid(newOptions, valid);
    }

    // --- RIGHT ---
    if (i < dim - 1) {
      const neighbor = grid.tiles[i + 1 + j * dim];
      let valid = [];
      for (const nOpt of neighbor.options) {
        valid = valid.concat(this.tileDefaults.rules[nOpt][3]); // neighbor's LEFT rules
      }
      checkValid(newOptions, valid);
    }

    // --- DOWN ---
    if (j < dim - 1) {
      const neighbor = grid.tiles[i + (j + 1) * dim];
      let valid = [];
      for (const nOpt of neighbor.options) {
        valid = valid.concat(this.tileDefaults.rules[nOpt][0]); // neighbor's UP rules
      }
      checkValid(newOptions, valid);
    }

    // --- LEFT ---
    if (i > 0) {
      const neighbor = grid.tiles[i - 1 + j * dim];
      let valid = [];
      for (const nOpt of neighbor.options) {
        valid = valid.concat(this.tileDefaults.rules[nOpt][1]); // neighbor's RIGHT rules
      }
      checkValid(newOptions, valid);
    }

    this.options = newOptions;
  }

  draw(index, dimensions) {
    const x = (index % dimensions) * (width / dimensions);
    const y = floor(index / dimensions) * (height / dimensions);

    stroke(255);
    noFill();
    rect(x, y, width / dimensions, height / dimensions); // grid outline

    if (this.collapsed) {
      const type = this.options[0];
      const img = this.tileDefaults.images[type];
      image(img, x, y, width / dimensions, height / dimensions);
    }
  }

  reset() {
    this.collapsed = false;
    this.options = Object.keys(this.tileDefaults.rules);
  }
}
