import { Tool } from "./tool.js";
import { addStep, sink } from "../tools.js";
import { butterBig } from "../toolGeneration.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var cutSound = new sound("./assets/3_kitchen/sounds/butter_cut.mp3", false);

class ButterKnife extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butter) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.butter = butter;
    this.move = 0;
    this.direction = 1.2;
  }
  checkButter() {
    this.perfX = this.butter.x + this.butter.width / 2;
    this.perfY = this.butter.y + this.butter.height / 2;
    this.shadow = {
      x: this.butter.x + this.butter.width / 2,
      y: this.butter.y + this.butter.height / 2,
      r: 20
    }
  }
  draw() {
    super.draw();

    if (this.inPlace === true) {

      sink.faucet = false;

      this.move += this.direction;

      if (this.move > 100 || this.move < 0) this.changeDirection();

      this.ctx.fillStyle = "rgba(0,0,0,80%)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      butterBig.draw();

      this.ctx.save();

      this.ctx.setLineDash([10, 10]);
      this.ctx.strokeStyle = "red";

      this.ctx.beginPath();
      this.ctx.moveTo(550, 65);
      this.ctx.lineTo(550, 350);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.moveTo(530, 65);
      this.ctx.lineTo(530, 350);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.restore();

      this.ctx.fillStyle = "black";
      this.ctx.fillRect(500 + this.move, 80, 6, 319);

      var grd = this.ctx.createLinearGradient(0, 0, 0, 600);
      grd.addColorStop(0, "white");
      grd.addColorStop(1, "black");

      this.ctx.fillStyle = grd;
      this.ctx.fillRect(501 + this.move, 81, 4, 319);
    }
  }
  changeDirection() {
    this.direction === 1.2 ? this.direction = -1.2 : this.direction = 1.2;
  }
  checkCut() {
    if (this.move > 30 && this.move < 50 ) {
      playSound(cutSound, 0.3);
      this.butter.isCut = true;
      this.x = 720;
      this.y = 255;
      sink.faucet = true;
      addStep(5);
    }
  }
}

export { ButterKnife };
