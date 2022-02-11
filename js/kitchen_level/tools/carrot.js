import {
  Tool
} from "./tool.js";

import {
  tools,
  deleteTool,
  onTop
} from "../tools.js";

import { mouse } from "../control.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var graterUpSprite = new Image();
graterUpSprite.src = "../assets/kitchen_level/grater_up.png";

var carrotSprite = new Image();
carrotSprite.src = "../assets/kitchen_level/carrot.png";

var gratedCarrotSprite = new Image();
gratedCarrotSprite.src = "../assets/kitchen_level/grated_carrot.png";

var peels = [];

class Peel {
  constructor(carrotY, carrotH) {
    this.x = 315 + Math.floor(Math.random() * 180);
    this.y = carrotY + carrotH / 2 - 90 + Math.floor(Math.random() * 180);
    this.angle = - 30 + Math.floor(Math.random() * 60);
    this.color = 28 + Math.floor(Math.random() * 9);
  }
}

class Carrot extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, grater, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.grater = grater;
    this.pan = pan;
    this.toBeGrated = false;
    this.oldX = 0;
    this.cut = 0;
    this.isGrated = false;
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


      for (let i = 0; i < peels.length; i++) {
        this.ctx.save();
        this.ctx.fillStyle = "hsl(" + peels[i].color + ", 100%, 50%)";
        this.ctx.translate(peels[i].x, peels[i].y);
        this.ctx.rotate(peels[i].angle * Math.PI / 180);
        this.ctx.fillRect(0, 0, 12, 6);
        this.ctx.restore();
      }

      this.ctx.drawImage(graterUpSprite, 330, 10, 280, 380);
      this.width = 524;
      this.height = 110;
      this.shadow = {
        x: undefined,
        y: undefined,
        r: 40
      };

      this.ctx.drawImage(
        carrotSprite,
        this.cut,
        0,
        this.width - this.cut,
        this.height,
        this.x,
        this.y,
        this.width - this.cut,
        this.height
      );

      if (this.isSelected === true) {
        if (mouse.x != this.oldX && (this.oldX < mouse.x || this.oldX > mouse.x)
          && (this.x > 405 && this.x < 485) && (this.y > 60 && this.y < 230)) {
          this.oldX = mouse.x;
          this.cut += 0.6;
          this.generatePeel();
        }
        if (this.cut > 490) {
          this.toBeGrated = false;
          this.isGrated = true;
          this.sprite = gratedCarrotSprite;
          tools.forEach((tool, i) => {
            tool.isSelected = false;
          });
          this.width = 50;
          this.height = 50;
          this.x = 475;
          this.y = 275;
          this.perfX = this.pan.x + this.pan.width / 3;
          this.perfY = this.pan.y + this.pan.height / 4;
          this.shadow = {
            x: this.perfX + 28,
            y: this.perfY + 28,
            r: 28
          }
          this.grater.resetPosition();
        };
      }
    }
    else {
      if (this.inPlace === true && this.isGrated === true) {
        this.pan.hasCarrot = true;
        deleteTool("carrot");
      }
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
  generatePeel() {
    for (let i = 0; i < 3; i++) {
      var peel = new Peel(this.y, this.height);
      if (distance(peel, { x: 405, y: this.y + this.height / 2 }) < 90) {
        peels.push(peel);
      }
    }
  }
}

function distance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
    (obj1.y - obj2.y) * (obj1.y - obj2.y))
}

export {
  Carrot
};
