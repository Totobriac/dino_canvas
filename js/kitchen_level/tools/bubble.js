import { pot } from "../tools.js";


class Point {
  constructor() {
    this.x = pot.x + Math.random() * pot.width;
    this.y = pot.y + Math.random() * pot.height;
    this.dist = this.distance();
    this.radius = 0;
    this.color = "white";
  }
  distance() {
    return Math.sqrt(
      (this.x - (pot.x + pot.width / 2)) * (this.x - (pot.x + pot.width / 2)) +
      (this.y - (pot.y + pot.height / 2)) * (this.y - (pot.y + pot.height / 2))
    )
  }
}

export { Point }
