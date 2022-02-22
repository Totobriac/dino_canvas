import {
  Tool
} from "./tool.js";

var pastaSprite = new Image();
pastaSprite.src = "../assets/kitchen_level/pasta.png";

class Pasta extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isUp = true;
  }
  draw() {
    if(this.isSelected ) this.isUp = false;
    if (!this.isUp) {
      this.sprite = pastaSprite;
      super.draw();
    }
    else{
      super.draw();
    }
  }
}

export { Pasta };
