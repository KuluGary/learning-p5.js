class MarchingSquares {
  increment = 0.2;
  zOffset = 0;
  zIncrement = 0.02;
  static linePatterns = {
    1: [["bottom", "left"]],
    2: [["right", "bottom"]],
    3: [["right", "left"]],
    4: [["top", "right"]],
    5: [
      ["top", "left"],
      ["right", "bottom"],
    ],
    6: [["top", "bottom"]],
    7: [["top", "left"]],
    8: [["top", "left"]],
    9: [["top", "bottom"]],
    10: [
      ["top", "right"],
      ["bottom", "left"],
    ],
    11: [["top", "right"]],
    12: [["right", "left"]],
    13: [["right", "bottom"]],
    14: [["bottom", "left"]],
  };

  /**
   * Creates a MarchingSquares instance.
   *
   * @param {number} rows - Number of rows in the scalar field.
   * @param {number} cols - Number of columns in the scalar field.
   * @param {number} resolution - Pixel size of each grid cell.
   * @param {number[][]} fields - 2D array storing scalar values (e.g. noise).
   */
  constructor(rows, cols, resolution, fields) {
    this.noise = new OpenSimplexNoise(Date.now());
    this.rows = rows;
    this.cols = cols;
    this.resolution = resolution;
    this.fields = fields;
  }

  drawLine(pointA, pointB) {
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }

  updateFields() {
    let xOffset = 0;

    for (let i = 0; i < this.cols; i++) {
      let yOffset = 0;

      for (let j = 0; j < this.rows; j++) {
        this.fields[i][j] = float(
          this.noise.noise3D(xOffset, yOffset, this.zOffset)
        );
        yOffset += this.increment;
      }
      xOffset += this.increment;
    }

    this.zOffset += this.zIncrement;
  }

  getCorners(x, y) {
    const size = this.resolution;
    return {
      top: createVector(x + size * 0.5, y),
      right: createVector(x + size, y + size * 0.5),
      bottom: createVector(x + size * 0.5, y + size),
      left: createVector(x, y + size * 0.5),
    };
  }

  getState(topLeft, topRight, bottomRight, bottomLeft) {
    return topLeft * 8 + topRight * 4 + bottomRight * 2 + bottomLeft * 1;
  }

  show() {
    this.updateFields();

    for (let i = 0; i < this.cols - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        const x = i * this.resolution;
        const y = j * this.resolution;

        const corners = this.getCorners(x, y);
        const state = this.getState(
          ceil(this.fields[i][j]),
          ceil(this.fields[i + 1][j]),
          ceil(this.fields[i + 1][j + 1]),
          ceil(this.fields[i][j + 1])
        );

        strokeWeight(0.4 * this.resolution);
        stroke(255, 200, 255, 255);

        const patterns = MarchingSquares.linePatterns[state];
        if (!patterns) continue;

        for (const [p1, p2] of patterns) {
          this.drawLine(corners[p1], corners[p2]);
        }
      }
    }
  }
}
