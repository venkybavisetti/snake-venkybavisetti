class Food {
  #position;
  #type;
  constructor(position, type) {
    this.#position = position.slice();
    this.#type = type;
  }

  get position() {
    return this.#position;
  }

  get status() {
    const food = {};
    food.position = this.#position;
    food.type = this.#type;
    return food;
  }
}
