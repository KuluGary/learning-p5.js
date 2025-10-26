class TileDefaults {
  constructor() {
    this.directions = {
      BLANK: 0,
      UP: 1,
      RIGHT: 2,
      DOWN: 3,
      LEFT: 4,
    };

    this.rules = [
      // BLANK
      [
        [this.directions.BLANK, this.directions.UP],
        [this.directions.BLANK, this.directions.RIGHT],
        [this.directions.BLANK, this.directions.DOWN],
        [this.directions.BLANK, this.directions.LEFT],
      ],
      // UP
      [
        [this.directions.RIGHT, this.directions.LEFT, this.directions.DOWN],
        [this.directions.LEFT, this.directions.UP, this.directions.DOWN],
        [this.directions.BLANK, this.directions.DOWN],
        [this.directions.RIGHT, this.directions.UP, this.directions.DOWN],
      ],
      // RIGHT
      [
        [this.directions.RIGHT, this.directions.LEFT, this.directions.DOWN],
        [this.directions.LEFT, this.directions.UP, this.directions.DOWN],
        [this.directions.RIGHT, this.directions.LEFT, this.directions.UP],
        [this.directions.BLANK, this.directions.LEFT],
      ],
      // DOWN
      [
        [this.directions.BLANK, this.directions.UP],
        [this.directions.LEFT, this.directions.UP, this.directions.DOWN],
        [this.directions.RIGHT, this.directions.LEFT, this.directions.UP],
        [this.directions.RIGHT, this.directions.UP, this.directions.DOWN],
      ],
      // LEFT
      [
        [this.directions.RIGHT, this.directions.LEFT, this.directions.DOWN],
        [this.directions.BLANK, this.directions.RIGHT],
        [this.directions.RIGHT, this.directions.LEFT, this.directions.UP],
        [this.directions.UP, this.directions.DOWN, this.directions.RIGHT],
      ],
    ];

    this.images = [
      // BLANK:
      loadImage("tiles/blank.png"),
      // UP:
      loadImage("tiles/up.png"),
      // RIGHT:
      loadImage("tiles/right.png"),
      // DOWN:
      loadImage("tiles/down.png"),
      // LEFT:
      loadImage("tiles/left.png"),
    ];
  }
}
