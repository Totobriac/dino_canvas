import {
  Tool
} from "./tool.js";

var splitGarlicSprite = new Image();
splitGarlicSprite.src = "../assets/kitchen_level/garlic_split.png";


class Garlic extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
  }
  draw() {

    if (this.inPlace) {
      this.sprite = splitGarlicSprite;
      this.width = 122;
      this.height = 81;
      this.x = 440;
      this.y = 270;
    }

    super.draw();

  }
}


export {
  Garlic
};