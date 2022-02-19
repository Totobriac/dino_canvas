import {
  Tool
} from "./tool.js";

import {
  mouse
} from "../control.js";

import {
  meat
} from "../tools.js";

var spoonSprite = new Image();
spoonSprite.src = "../assets/kitchen_level/spoon.png";


class Spoon extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.breakMeat = false
  }
  draw() {
    if (this.isSelected) {
      this.ctx.save();
      this.ctx.translate(mouse.x, mouse.y);
      this.ctx.rotate((Math.PI / 180) * 150);
      this.ctx.drawImage(spoonSprite, -16, 0, 40, 213);
      this.ctx.restore();
    }
    if (this.isSelected && meat.inPlace){
      this.breakMeat = true;
    }
    if(this.breakMeat) {
      this.ctx.save();
      this.ctx.translate(mouse.x, mouse.y);
      this.ctx.rotate((Math.PI / 180) * 150);
      this.ctx.drawImage(spoonSprite, -16, 0, 40, 213);
      this.ctx.restore();
      this.isSelected = true;
    }
    else {
      super.draw();
    }
  }
}

export {
  Spoon
};
