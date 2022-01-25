import {
  Tool
} from "./tool.js";

import {
  points
} from "../control.js";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var onionSprite = new Image();
onionSprite.src = "../assets/kitchen_level/onion.png";

var onionPeeledSprite = new Image();
onionPeeledSprite.src = "../assets/kitchen_level/onion_peeled.png";

class Onion extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.beeingUsed = false;
    this.isPeeled = false;
  }
  draw() {
    if (this.beeingUsed === false) super.draw();

    if (this.inPlace && this.isPeeled === false) {
      this.beeingUsed = true;
      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)"
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);
      var coef = 0.65;
      this.ctx.drawImage(onionSprite, (1200 - 548 * coef) / 2, 10, 548 * coef, 600 * coef);

      this.ctx.fillStyle = "green";
      this.ctx.beginPath();
      this.ctx.arc(1100, 300, 40, 0, 2 * Math.PI);
      this.ctx.fill();
      this.peel();
    }
  }
  peel() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = "rgba(0,0,0,1)"
    for (let i = 0; i < points.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(points[i].x, points[i].y, 30, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
  donePeeling(mouse) {
    if (this.beeingUsed === true) {
      var dist = Math.sqrt((mouse.x - 1100) * (mouse.x - 1100) + (mouse.y - 300) * (mouse.y - 300));

      if (dist < 40 ) {
        console.log(dist)
        this.beeingUsed = false;
        this.inPlace = false;
        this.isPeeled = true;
        this.sprite = onionPeeledSprite;
      }
    }
  }
}
export {
  Onion
}
