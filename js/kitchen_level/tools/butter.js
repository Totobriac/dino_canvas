import {
  Tool
} from "./tool.js";


var butterCutSprite = new Image();
butterCutSprite.src = "../assets/kitchen_level/butter_sm_cut.png";

var maxPoints = 50;

class Butter extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isCut = false;
  }
  draw() {
    super.draw();

    if (this.isCut === true) {
      this.sprite = butterCutSprite;
    }
  }

}

export {
  Butter
};
