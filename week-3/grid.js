class Grid {
  constructor(width, height) {
    this.w = width / this.dimensions;
    this.h = height / this.dimensions;
    this.dimensions = 10;
    this.tiles = [];
    this.createTiles();
  }

  fill() {
    this.tiles = [];
    for (let j = 0; j < this.dimensions; j++) {
      for (let i = 0; i < this.dimensions; i++) {
        this.tiles.push(new Tile());
      }
    }
  }

  createTiles() {
    for (let i = 0; i < this.dimensions ** 2; i++) {
      this.tiles.push(new Tile());
    }
  }

  update() {
    const active = this.tiles.filter((t) => !t.collapsed);
    if (active.length === 0) return;

    const next = this.selectLowestEntropy(active);
    next.collapse();

    this.propagateConstraints();
  }

  selectLowestEntropy(cells) {
    cells.sort((a, b) => a.options.length - b.options.length);

    const smallest = cells.filter(
      (c) => c.options.length === cells[0].options.length
    );

    return random(smallest);
  }

  propagateConstraints() {
    for (let j = 0; j < this.dimensions; j++) {
      for (let i = 0; i < this.dimensions; i++) {
        let index = i + j * this.dimensions;
        this.tiles[index].updateOptions(this, i, j);
      }
    }
  }

  draw() {
    this.tiles.forEach((tile, index) => tile.draw(index, this.dimensions));
  }

  reset() {
    this.tiles.forEach((t) => t.reset());
  }
}
