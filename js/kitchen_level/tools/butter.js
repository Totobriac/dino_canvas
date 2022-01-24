import {
  Tool
} from "./tool.js";


var butterCutSprite = new Image();
butterCutSprite.src = "../assets/kitchen_level/butter_sm_cut.png";

class Butter extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isCut = false;
    this.pan = pan;
  }
  draw() {
    super.draw();

    if (this.isCut === true ) {
      this.sprite = butterCutSprite;

      this.ctx.fillStyle = "rgb(236,210,137)";
      this.ctx.fillRect(this.pan.x + this.pan.width/2, this.pan.y + this.pan.height/3, 20,23);
    }
  }
}

export { Butter };
