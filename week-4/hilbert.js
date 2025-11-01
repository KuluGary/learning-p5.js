class Hilbert {
  constructor({ order = 6, palette = [] } = {}) {
    this.order = order;
    this.numberOfPoints = int(pow(2, this.order));
    this.totalPoints = this.numberOfPoints * this.numberOfPoints;
    this.pointsDrawnCount = 0;

    this.palette = palette;
  }

  buildPath() {
    this.path = [];
    const stepSize = width / this.numberOfPoints;

    for (let i = 0; i < this.totalPoints; i++) {
      const vector = this.hilbertVector(i);
      vector.mult(stepSize);
      vector.add(stepSize / 2, stepSize / 2);
      this.path.push(vector);
    }
  }

  update() {
    noFill();
    strokeWeight(2 * -this.order);
    const paletteSize = this.palette.length;

    for (let i = 1; i < this.pointsDrawnCount; i++) {
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

    this.pointsDrawnCount++;

    if (this.pointsDrawnCount >= this.path.length) noLoop();
  }

  reset(newOrder = this.order) {
    this.order = newOrder;
    this.numberOfPoints = int(pow(2, this.order));
    this.totalPoints = this.numberOfPoints * this.numberOfPoints;
    this.pointsDrawnCount = 0;
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

    let vector = base[index & 3].copy();

    for (let i = 1; i < this.order; i++) {
      index = index >>> 2;
      const quadrant = index & 3;
      const length = pow(2, i);

      switch (quadrant) {
        case 0:
          [vector.x, vector.y] = [vector.y, vector.x];
          break;
        case 1:
          vector.y += length;
          break;
        case 2:
          vector.x += length;
          vector.y += length;
          break;
        case 3:
          const temp = vector.x;
          vector.x = length - 1 - vector.y + length;
          vector.y = length - 1 - temp;
          break;
      }
    }

    return vector;
  }
}
