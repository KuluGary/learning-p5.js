class Grid {
  /**
   * Creates a Grid instance.
   * @param {number} resolution - resolution - Pixel size of each grid cell.
   */
  constructor(resolution) {
    this.resolution = resolution;
    this.cols = 1 + width / this.resolution;
    this.rows = 1 + height / this.resolution;
    this.fields = [];

    for (let i = 0; i < this.cols; i++) {
      let k = [];

      for (let j = 0; j < this.rows; j++) {
        k.push(0);
      }

      this.fields.push(k);
    }
  }

  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        stroke(255, 255, 255, 1);
        point(i * this.resolution, j * this.resolution);
      }
    }
  }

  drawLine(vector1, vector2) {
    line(vector1.x, vector1.y, vector2.x, vector2.y);
  }

  drawGrid() {
    stroke(255);
    colorMode(HSB, 255, 255, 255);

    for (let i = 0; i < this.cols - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        let x = i * this.resolution;
        let y = j * this.resolution;

        stroke(255, 50);
        strokeWeight(0.1 * this.resolution);
        noFill();
        square(x, y, this.resolution);
        strokeWeight(4);
      }
    }
  }
}
