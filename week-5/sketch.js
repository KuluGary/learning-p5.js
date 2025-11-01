let worley;
let paletteSelect;

const PALETTES = {
  Fire: ["#000000", "#ff3300", "#ffff66"],
  Ocean: ["#00111a", "#0074d9", "#00ffff"],
  Pastel: ["#f8b195", "#f67280", "#6c5b7b"],
  Grayscale: ["#000000", "#777777", "#ffffff"],
  Cyberpunk: ["#0d0221", "#ff0054", "#00f6ed", "#fbb13c", "#9a031e"],
};

function setupCanvas() {
  createCanvas(100, 100);
  pixelDensity(1);
  noSmooth();
  background(0);
}

function setup() {
  setupCanvas();

  // --- UI controls ---
  createP("Palette:");
  paletteSelect = createSelect();
  for (let name in PALETTES) paletteSelect.option(name);
  paletteSelect.changed(updateWorley);

  // --- Worley initialization ---
  worley = new WorleyNoise({
    width,
    height,
    pointCount: 25,
    palette: PALETTES["Fire"].map((c) => color(c)),
  });
}

function draw() {
  loadPixels();
  worley.update(frameCount);
  updatePixels();
}

function updateWorley() {
  const selectedPalette = PALETTES[paletteSelect.value()] || PALETTES["Fire"];
  worley.palette = selectedPalette.map((c) => color(c));
}
