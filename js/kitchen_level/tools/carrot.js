import {
  Tool
} from "./tool.js";

import {
  tools
} from "../tools.js";

import { mouse } from "../control.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var graterUpSprite = new Image();
graterUpSprite.src = "../assets/kitchen_level/grater_up.png";

var carrotSprite = new Image();
carrotSprite.src = "../assets/kitchen_level/carrot.png";

class Carrot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, grater) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.grater = grater;
    this.toBeGrated = false;
    this.oldX = 0;
    this.cut = 0;
  }
  draw() {

    if (this.inPlace === true && this.grater.inPlace === true && this.toBeGrated === false) {
      this.grateMe();
    }
    else if (this.toBeGrated === true) {

      onTop("carrot");
      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);
      this.ctx.drawImage(graterUpSprite, 330, 10, 280, 380);
      this.width = 524;
      this.height = 110;
      this.shadow = {
        x: undefined,
        y: undefined,
        r: 40
      }

      this.ctx.drawImage(
        carrotSprite,
        this.cut,
        0,
        this.width - this.cut,
        this.height,       
        this.x, 
        this.y, 
        this.width - this.cut, 
        this.height);

      if (this.isSelected === true) {
        if(mouse.x != this.oldX && (this.oldX < mouse.x || this.oldX > mouse.x) 
            && (this.x > 405 && this.x < 485) && (this.y > 60 && this.y < 230)) {
          this.oldX = mouse.x;
          this.cut += 0.6;
          console.log(this.cut);
        }
      }
    }
    else {
      super.draw();
    }
  }
  grateMe() {
    this.isSelected = false;
    this.toBeGrated = true;
    this.perfX = undefined;
    this.perfY = undefined;
    this.y = 170;
    this.x = 650;
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
