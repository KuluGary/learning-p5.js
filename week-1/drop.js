const CIRCLE_RES = 50;

class Drop {
  /**
   * Creates a new drop.
   * @param {number} x - The x-coordinate of the drop's center.
   * @param {number} y - The y-coordinate of the drop's center.
   * @param {number} r - The radius of the drop.
   * @param {string} color - Color of the drop.
   */
  constructor(x, y, r, color) {
    this.center = createVector(x, y);
    this.radius = r;
    this.vertices = [];
    this.color = color;

    for (let i = 0; i < CIRCLE_RES * r; i++) {
      let angle = map(i, 0, CIRCLE_RES * 4, 0, TWO_PI);
      let vector = createVector(cos(angle), sin(angle));
      vector.mult(this.radius).add(this.center);

      this.vertices[i] = vector;
    }
  }

  /**
   * Draws the drop on the canvas.
   */
  show() {
    fill(this.color);
    noStroke();
    beginShape();
    for (const v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  /**
   * Applies a "marbling" distortion effect to the current drop,
   * influenced by another drop.
   * @param {Drop} otherDrop - Another drop whose shape influences this one.
   */
  marble(otherDrop) {
    for (let vertex of this.vertices) {
      let point = vertex.copy();
      point.sub(otherDrop.center);

      let root = Math.sqrt(1 + otherDrop.radius ** 2 / point.magSq());
      point.mult(root).add(otherDrop.center);
      vertex.set(point);
    }
  }

  /**
   * Applies a directional "tine" deformation (like a brush stroke or wave)
   * along a specified direction vector. The deformation strength decays
   * exponentially with distance from the deformation line.
   *
   * @param {p5.Vector} direction - The direction vector of the deformation (should be normalized).
   * @param {number} originX - The x-coordinate of the deformation’s origin.
   * @param {number} originY - The y-coordinate of the deformation’s origin.
   * @param {number} intensity - The amplitude (magnitude) of the deformation.
   * @param {number} curvature - Controls how sharply the deformation decays with distance.
   */
  tine(direction, originX, originY, intensity, curvature) {
    const decayRate = 1 / pow(2, 1 / curvature);

    const origin = createVector(originX, originY);

    for (const vertex of this.vertices) {
      const offsetFromOrigin = p5.Vector.sub(vertex, origin);
      const normal = direction.copy().rotate(HALF_PI);
      const distanceToLine = abs(offsetFromOrigin.dot(normal));
      const deformationAmount = intensity * pow(decayRate, distanceToLine);

      vertex.add(direction.copy().mult(deformationAmount));
    }
  }
}
