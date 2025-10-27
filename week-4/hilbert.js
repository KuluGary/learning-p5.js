class Hilbert {
  constructor({ order = 6, palette = [] } = {}) {
    this.order = order;
    this.N = int(pow(2, this.order));
    this.total = this.N * this.N;
    this.counter = 0;

    this.palette = palette;
  }

  buildPath() {
    this.path = [];
    const len = width / this.N;

    for (let i = 0; i < this.total; i++) {
      const v = this.hilbertVector(i);
      v.mult(len);
      v.add(len / 2, len / 2);
      this.path.push(v);
    }
  }

  update() {
    noFill();
    strokeWeight(2 * -this.order);
    const paletteSize = this.palette.length;

    for (let i = 1; i < this.counter; i++) {
      const t = i / this.path.length;
      const col = lerpColor(
        this.palette[floor(t * paletteSize) % paletteSize],
        this.palette[(floor(t * paletteSize) + 1) % paletteSize],
        (t * paletteSize) % 1
      );
      stroke(col);

      line(
        this.path[i].x,
        this.path[i].y,
        this.path[i - 1].x,
        this.path[i - 1].y
      );
    }

    this.counter++;

    if (this.counter >= this.path.length) noLoop();
  }

  reset(newOrder = this.order) {
    this.order = newOrder;
    this.N = int(pow(2, this.order));
    this.total = this.N * this.N;
    this.counter = 0;
    this.buildPath();

    loop();
  }

  hilbertVector(index) {
    const base = [
      createVector(0, 0),
      createVector(0, 1),
      createVector(1, 1),
      createVector(1, 0),
    ];

    let v = base[index & 3].copy();

    for (let j = 1; j < this.order; j++) {
      index = index >>> 2;
      const quad = index & 3;
      const len = pow(2, j);

      switch (quad) {
        case 0:
          [v.x, v.y] = [v.y, v.x];
          break;
        case 1:
          v.y += len;
          break;
        case 2:
          v.x += len;
          v.y += len;
          break;
        case 3:
          const temp = v.x;
          v.x = len - 1 - v.y + len;
          v.y = len - 1 - temp;
          break;
      }
    }

    return v;
  }
}
