import {
  Tool
} from "./tool.js";

import {
  tools,
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
    this.angle = -30 ;
  }
  draw() {

    if (this.inPlace && this.garlic.inPlace === true) this.pressMe();

    if (this.pressIt) {

      onTop("garlic");

      this.garlic.singleClove();

      this.garlic.isSelected = true;

      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);   
      
      this.ctx.drawImage(bottomSprite, 500, 200, 329, 281);

      this.ctx.save();

      this.ctx.translate(502, 190);
      this.ctx.rotate(this.angle * Math.PI / 180)
      this.x = -14;
      this.y = -52;
      super.draw();

      this.ctx.restore();
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
  GarlicPress
};
