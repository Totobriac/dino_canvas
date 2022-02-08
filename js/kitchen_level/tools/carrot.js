import {
  Tool
} from "./tool.js";

import {tools} from "../tools.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var graterUpSprite = new Image();
graterUpSprite.src = "../assets/kitchen_level/grater_up.png";

class Carrot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, grater) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.grater = grater;
  }
  draw() {
    super.draw();

    if (this.inPlace === true && this.grater.inPlace === true) {
      onTop("carrot");
      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204 , 0, 810, 531);
      this.ctx.drawImage(graterUpSprite, 340, 10, 280, 380);
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
  Carrot
};
