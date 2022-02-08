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
}

function onTop(tool) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].name === tool) {
      var tool = tools[i];
      tools.splice(i, 1);
      tools.push(tool);
    }
  }
}

export {
  Grater
};
