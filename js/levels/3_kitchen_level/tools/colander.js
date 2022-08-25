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
      this.perfX = this.pan.x + 18 ;
      this.perfY = this.pan.y -10 ;
      this.shadow = {
        x: this.pan.x + this.pan.width / 2 + 28,
        y: this.pan.y + this.pan.height / 2 - 28,
        r: 50,
      };
      this.isClose();
      if (this.inPlace) {
        this.pan.hasPastas = true;
        deleteTool("pasta");
      }
    }
  }
}

export { Colander };
