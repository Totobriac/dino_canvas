import {Tool} from "./tool.js";

class ButterKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butter) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.butter = butter;
  }
  checkButter() {
    this.perfX =this.butter.x + this.butter.width/2;
    this.perfY = this.butter.y + this.butter.height/2;
    this.shadow = { x: this.butter.x + this.butter.width/2, y: this.butter.y + this.butter.height/2, r: 20 }
  }
}

export { ButterKnife };
