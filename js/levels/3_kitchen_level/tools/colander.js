import { Tool } from "./tool.js";
import { onTop, addStep, deleteTool } from "../tools.js";

class Colander extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
    this.hasPastas = false;
  }
  draw() {
    super.draw();
    if (this.hasPastas && this.isSelected) onTop("pasta");
    if (this.hasPastas) {
      addStep(17);
      this.perfX = this.pan.x + this.pan.width / 2;
      this.perfY = this.pan.y + this.pan.height / 10;
      this.shadow = {
        x: this.perfX + 28,
        y: this.perfY + 28,
        r: 28
      }
    }
    if (this.hasPastas && this.inPlace && this.x != 120) {
      this.pan.hasPastas = true;
      deleteTool("pasta");
    }
  }
}

export { Colander };
