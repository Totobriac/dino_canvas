import { Tool } from "./tool.js";


class Grater extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
  }
  resetPosition() {
    this.x = 618;
    this.y = 250;
    this.perfX = undefined;
    this.perfY = undefined;
    this.shadow = {
      x: undefined,
      y: undefined,
      r: 28,
    }
  }
}

export { Grater };
