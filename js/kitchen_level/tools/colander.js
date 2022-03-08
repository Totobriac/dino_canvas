import {
  Tool
} from "./tool.js";
import {
  onTop
} from "../tools.js";

class Colander extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.hasPastas = false;
  }
  draw() {
    super.draw();
    if (this.hasPastas && this.isSelected) onTop("pasta");
    if( this.hasPastas) {
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

export {
  Colander
};
