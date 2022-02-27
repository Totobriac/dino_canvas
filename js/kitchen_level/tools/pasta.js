import {
  Tool
} from "./tool.js";

import {
  deleteTool,
} from "../tools.js";

var pastaSprite = new Image();
pastaSprite.src = "../assets/kitchen_level/pasta.png";

class Pasta extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isUp = true;
  }
  draw() {
    if (this.isSelected) this.isUp = false;
    if (!this.isUp) {
      this.sprite = pastaSprite;
      super.draw();
    }
    else {
      super.draw();
    }    
  }
  inPot() {
    var start = 0;
    var end = 2 * Math.PI;

    let step = 0;
    var totalSteps = 76;
    var stepSize = (end - start) / totalSteps;    

    for (let i = 0; i < 76; i++) {

      var angle = start + step++ * stepSize;

      this.ctx.save();
      this.ctx.strokeStyle = "hsla(57, 100%, 67%, 1)";
      this.ctx.lineWidth = 2;
      this.ctx.translate(1106, 173);
      this.ctx.rotate(+angle);

      this.ctx.beginPath();
      this.ctx.moveTo(10, -25);
      this.ctx.lineTo(-90, -5);
      this.ctx.stroke();

      this.ctx.restore();
    }
  }
}

export { Pasta };
