class Food {
  #position;
  #type;
  #potential;
  constructor(position, type) {
    this.#position = position.slice();
    this.#type = type;
    this.#potential = type == "specialFood" ? 10 : 5;
  }

  get position() {
    return this.#position.slice();
  }

  get type() {
    return this.#type;
  }

  get status() {
    const food = {};
    food.position = this.#position;
    food.type = this.#type;
    return food;
  }

  get point() {
    return this.#potential;
  }
}
