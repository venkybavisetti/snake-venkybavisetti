class ScoreCard {
  #scorePoints;
  constructor() {
    this.#scorePoints = 0;
  }
  update(points) {
    this.#scorePoints += points;
  }
  get status() {
    return this.#scorePoints;
  }
}
