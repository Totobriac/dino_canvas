import {
  Tool
} from "./tool.js";

var handleSprite = new Image();
handleSprite.src = "../assets/kitchen_level/handle_tin_opener.png";

var crankSprite = new Image();
crankSprite.src = "../assets/kitchen_level/crank_tin_opener.png";

class TinOpener extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isOpening = false;
    this.angle = 0;
  }
  draw() {
    if (this.isOpening) {
      this.angle ++;
      this.ctx.drawImage(handleSprite,530,100,396,105)

      this.ctx.save();
      this.ctx.translate(600,150);
      this.ctx.rotate(-this.angle * Math.PI / 180);

      this.ctx.drawImage(crankSprite,-80,-22,160,44)

      this.ctx.restore();

    } else {
      super.draw();
    }
  }
}

export {
  TinOpener
};
