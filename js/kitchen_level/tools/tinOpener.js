import {
  Tool
} from "./tool.js";

var handleSprite = new Image();
handleSprite.src = "../assets/kitchen_level/handle_tin_opener.png";

class TinOpener extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isOpening = false;
  }
  draw() {
    if (this.isOpening) {
      this.ctx.drawImage(handleSprite,530,100,396,105)
    } else {
      super.draw();
    }
  }
}

export {
  TinOpener
};
