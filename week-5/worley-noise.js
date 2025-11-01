class WorleyNoise {
  constructor({
    width = 512,
    height = 512,
    pointCount = 20,
    palette = [],
  } = {}) {
    this.width = width;
    this.height = height;
    this.pointCount = pointCount;
    this.palette = palette;
    this.maxDistance = dist(0, 0, 0, width, height, width);
    this.contrastBoost = 3.5;
    this.brightnessBoost = 1.4;
    this._initPoints();
  }

  _initPoints() {
    this.points = [];
    for (let i = 0; i < this.pointCount; i++) {
      this.points.push(
        createVector(
          random(this.width),
          random(this.height),
          random(this.width)
        )
      );
    }
  }

  _computeDistances(x, y, z) {
    const distances = [];
    
    for (let v of this.points) {
      distances.push(dist(x, y, z, v.x, v.y, v.z));
    }
    return distances.sort((a, b) => a - b);
  }

  _mapDistance(d) {
    const n = constrain(d / this.maxDistance, 0, 1);
    return 1 - exp(-this.contrastBoost * n);
  }

  _colorize(sorted) {
    const d1 = this._mapDistance(sorted[0]);
    const d2 = this._mapDistance(sorted[1]);
    const mixVal = constrain(pow(d1, 0.5) - pow(d2, 1.2) + 0.5, 0, 1);

    const c1 = this.palette[0];
    const c2 = this.palette[1 % this.palette.length];
    const c3 = this.palette[2 % this.palette.length];

    const mixed = lerpColor(lerpColor(c1, c2, mixVal), c3, pow(mixVal, 2.5));

    return [
      constrain(red(mixed) * this.brightnessBoost, 0, 255),
      constrain(green(mixed) * this.brightnessBoost, 0, 255),
      constrain(blue(mixed) * this.brightnessBoost, 0, 255),
    ];
  }

  update(frameCount) {
    const z = frameCount % this.width;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const sorted = this._computeDistances(x, y, z);
        const [r, g, b] = this._colorize(sorted);
        const idx = (x + y * this.width) * 4;

        pixels[idx + 0] = r;
        pixels[idx + 1] = g;
        pixels[idx + 2] = b;
        pixels[idx + 3] = 255;
      }
    }
  }
}
