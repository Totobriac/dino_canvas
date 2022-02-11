import {
  Tool
} from "./tool.js";

import {
  tools,
  displayTool,
  onTop,
} from "../tools.js";

import {
  mouse
} from "../control.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var topSprite = new Image();
topSprite.src = "../assets/kitchen_level/press_top.png";

var bottomSprite = new Image();
bottomSprite.src = "../assets/kitchen_level/press_bottom.png";

class GarlicPress extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, garlic) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.garlic = garlic;
    this.pressIt = false;
    this.angle = -90;
  }
  draw() {

    if (this.inPlace && this.garlic.inPlace === true) this.pressMe();

    if (this.pressIt) {

      onTop("garlic");

      displayTool(["garlic","garlicPress"])

      this.garlic.singleClove();

      this.garlic.setBundaries();

      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);

      this.ctx.save();

      this.ctx.translate(500, 300);
      this.ctx.rotate(-40 * Math.PI / 180);
      this.ctx.drawImage(bottomSprite, 0, 0, 329, 281);

      this.ctx.restore();

      this.ctx.save();

      this.ctx.translate(503, 283);
      this.ctx.rotate(this.angle * Math.PI / 180)
      this.x = -14;
      this.y = -55;
      super.draw();

      this.ctx.restore();

      this.ctx.fillRect(503, 283, 2,2)
    }
    else {
      super.draw();
    }
  }
  pressMe() {
    this.pressIt = true;
    this.sprite = topSprite;
    this.x = 490;
    this.y = 137;
    this.width = 442;
    this.height = 103;
    this.shadow = {
      x: undefined,
      y: undefined,
      r: undefined
    }
  }
}

export {
  GarlicPress
};
