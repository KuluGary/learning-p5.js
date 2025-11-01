let hilbert;
const PALETTES = {
  Warm: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
  Cool: ["#00b4d8", "#0077b6", "#03045e", "#caf0f8", "#90e0ef"],
  Pastel: ["#f7b7a3", "#fcd5ce", "#fae1dd", "#f8edeb", "#e8e8e4"],
  Cyberpunk: ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"],
};

function setupCanvas() {
  createCanvas(512, 512);
  colorMode(HSB, 360, 255, 255);
  background(0);
}

function setup() {
  setupCanvas();

  // --- UI controls ---
  createP("Palette:");
  let paletteSelect = createSelect();
  for (let name in PALETTES) paletteSelect.option(name);
  paletteSelect.changed(updateHilbert);

  // --- Hilbert initialization ---
  hilbert = new Hilbert({
    order: 6,
    palette: PALETTES["Warm"].map((c) => color(c)),
  });

  hilbert.buildPath();
}

function draw() {
  hilbert.update();
}

function keyPressed() {
  if (key === "r" || key === "R") {
    clear(0);
    setupCanvas();
    hilbert.reset(random([4, 5, 6, 7]));
  }
}

function updateHilbert() {
  const selectedPalette = PALETTES[paletteSelect.value()] || PALETTES["Warm"];
  hilbert.palette = selectedPalette.map((c) => color(c));
  clear(0);
  setupCanvas();
  hilbert.reset();
}
