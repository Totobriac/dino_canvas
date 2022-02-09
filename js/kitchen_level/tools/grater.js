import {
  Tool
} from "./tool.js";

import {
  tools
} from "../tools.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";


class Grater extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
  }
  resetPosition() {
    this.x = 200;
    this.y = 250;
    this.perfX = undefined;
    this.perfY = undefined;
    this.shadow = {
      x: undefined,
      y: undefined,
      r: 28,
    }
  }
}


export {
  Grater
};
