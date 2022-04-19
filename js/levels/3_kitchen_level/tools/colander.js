import { Tool } from "./tool.js";
import { onTop, addStep } from "../tools.js";

class Colander extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
    this.hasPastas = false;
  }
  draw() {
    super.draw();
    if (this.hasPastas && this.isSelected) onTop("pasta");
    if( this.hasPastas) {
      addStep(17);
      this.perfX = undefined;
      this.perfY = undefined;
      this.shadow = {
        x: undefined,
        y: undefined,
        r: undefined,
      };
    }
  }
}

export { Colander };
