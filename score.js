class ScoreCard {
  #scorePoints
  constructor() {
    this.#scorePoints = 0;
  }
  update(points) {
    this.#scorePoints += points;
  }
  getStatus() {
    return #this.scorePoints;
  }
}
