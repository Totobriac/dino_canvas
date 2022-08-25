import { Tool } from "./tool.js";
import { addStep } from "../tools.js";
import { mouse } from "../control.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var canOpeningSound = new sound("../assets/3_kitchen/sounds/can_opening.mp3", false);

var handleSprite = new Image();
handleSprite.src = "./assets/3_kitchen/handle_tin_opener.png";

var crankSprite = new Image();
crankSprite.src = "./assets/3_kitchen/crank_tin_opener.png";

class TinOpener extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
    this.isOpening = false;
    this.angle = 730;
  }
  draw() {
    if (this.isOpening) {

      this.isSelected = true;

      this.ctx.beginPath();
      this.ctx.setLineDash([4,3]);
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
            playSound(canOpeningSound, 0.3);
          }
        } else if (mouse.x < 600 && mouse.y < 150) {
          if (mouse.moveX < 0 && mouse.moveY > 0) {
            this.angle++;
            this.tin.rotate();
            playSound(canOpeningSound, 0.3);
          }
        } else if (mouse.x > 600 && mouse.y > 150) {
          if (mouse.moveX > 0 && mouse.moveY < 0) {
            this.angle++;
            this.tin.rotate();
            playSound(canOpeningSound, 0.3);
          }
        } else if (mouse.x > 600 && mouse.y < 150) {
          if (mouse.moveX < 0 && mouse.moveY < 0) {
            this.angle++;
            this.tin.rotate();
            playSound(canOpeningSound, 0.3);
          }
        } else {
          stop(canOpeningSound);
        }
      }

      if (this.angle > 740) {
        stop(canOpeningSound);
        this.isOpening = false;
        this.isSelected = false;
        this.tin.open();
        this.x = 852;
        this.y = 50;
        addStep(15);
      }
    } else {
      super.draw();
    }
  }
}

function distance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
    (obj1.y - obj2.y) * (obj1.y - obj2.y))
}

export { TinOpener };
