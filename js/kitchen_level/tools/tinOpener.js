import {
  Tool,
} from "./tool.js";

import {
  onTop,
  displayTool,
} from "../tools.js";

import {
  mouse
} from "../control.js";

var handleSprite = new Image();
handleSprite.src = "../assets/kitchen_level/handle_tin_opener.png";

var crankSprite = new Image();
crankSprite.src = "../assets/kitchen_level/crank_tin_opener.png";

class TinOpener extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isOpening = false;
    this.angle = 0;
  }
  draw() {
    if (this.isOpening) {

      this.isSelected = true;

      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 3;
      this.ctx.ellipse(600, 125, 25, 106, 90 * Math.PI / 180,  0 ,-this.angle /2 * Math.PI / 180,true);
      this.ctx.stroke();

      this.ctx.drawImage(handleSprite, 530, 100, 396, 105);

      this.ctx.save();
      this.ctx.translate(600, 150);
      this.ctx.rotate(-this.angle * Math.PI / 180);

      this.ctx.drawImage(crankSprite, -80, -22, 160, 44)

      this.ctx.restore();

      if (distance(mouse, {
          x: 600,
          y: 150
        }) < 50) {
        if (mouse.x < 600 && mouse.y > 150) {
          if (mouse.moveX > 0 && mouse.moveY > 0) {
            this.angle++;
            this.tin.rotate();
          }
        } else if (mouse.x < 600 && mouse.y < 150) {
          if (mouse.moveX < 0 && mouse.moveY > 0) {
            this.angle++;
            this.tin.rotate();
          }
        } else if (mouse.x > 600 && mouse.y > 150) {
          if (mouse.moveX > 0 && mouse.moveY < 0) {
            this.angle++;
            this.tin.rotate();
          }
        } else if (mouse.x > 600 && mouse.y < 150) {
          if (mouse.moveX < 0 && mouse.moveY < 0) {
            this.angle++;
            this.tin.rotate();
          }
        }
      }

      if (this.angle > 740) this.isOpening = false
    } else {
      super.draw();
    }
  }
}

function distance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
    (obj1.y - obj2.y) * (obj1.y - obj2.y))
}

export {
  TinOpener
};
