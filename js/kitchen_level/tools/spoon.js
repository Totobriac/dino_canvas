import {
  Tool
} from "./tool.js";

import {
  mouse
} from "../control.js";

var spoonSprite = new Image();
spoonSprite.src = "../assets/kitchen_level/spoon.png";


class Spoon extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);

  }
  draw() {
    if (this.isSelected) {
      console.log("oo")
      this.ctx.save();
      this.ctx.translate(mouse.x, mouse.y);

      this.ctx.rotate((Math.PI / 180) * 150);

      this.ctx.drawImage(spoonSprite, -20,  -20, 40, 213);

      this.ctx.restore();
    } else {
      super.draw();
    }
  }
}

export {
  Spoon
};
