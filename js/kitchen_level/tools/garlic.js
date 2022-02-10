import {
  Tool
} from "./tool.js";


import { mouse } from "../control.js";

var splitGarlicSprite = new Image();
splitGarlicSprite.src = "../assets/kitchen_level/garlic_split.png";

var singleCloveSprite = new Image();
singleCloveSprite.src = "../assets/kitchen_level/single_clove.png";


class Garlic extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.single = false;
  }
  draw() {

    if (this.inPlace) {
      this.sprite = splitGarlicSprite;
      this.width = 122;
      this.height = 81;
      this.perfX = 440;
      this.perfY = 270;
      this.x = 440;
      this.y = 270;
    }

    if (this.single) {
      this.sprite = singleCloveSprite;
    }

    super.draw();

  }
  singleClove() {
    if (!this.single) {
      this.single = true;
      this.width = 88;
      this.height = 113;
      this.x = mouse.x;
      this.y = mouse.y;
      this.perfX = undefined;
      this.perfY = undefined;
      this.shadow = {
        x: undefined,
        y: undefined,
        r: undefined,
      }
    }
  }
}


export {
  Garlic
};