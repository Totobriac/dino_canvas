import {
  Tool
} from "./tool.js";

import {
  points
} from "../control.js";

import { mouse } from "../control.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var onionSprite = new Image();
onionSprite.src = "../assets/kitchen_level/onion.png";

var onionPeeledSprite = new Image();
onionPeeledSprite.src = "../assets/kitchen_level/onion_peeled.png";

class Onion extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.state = "intact";
    this.angle = 0;
  }
  draw() {

    super.draw();

    if (this.inPlace && (this.state === "intact" || this.state === "cut half")) {

      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeStyle = "red";

      this.ctx.beginPath();
      this.ctx.moveTo(505, 265);
      this.ctx.lineTo(505, 350);
      this.ctx.stroke();
      this.ctx.closePath();

      this.halfOnion();
    }

    if (this.inPlace && this.state === "halfed") {
      this.sprite = onionSprite;
      this.width = 55;
      this.height = 55;
    }

    if (this.inPlace && this.state === "halfed" && this.isSelected === true) {
      this.state = "to peel";
    }

    if (this.inPlace && this.state === "to peel") {
      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
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

    if (this.inPlace && (this.state === "peeled" && this.knife.isSelected || this.state === "to chop" || this.state === "can be beheaded")) {

      this.knife.isSelected = true;
      this.knife.isChopping = true;

      this.state = "to chop";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);

      var coef = 0.65;

      var x = canvas.width / 2;
      var y = canvas.height / 2;

      this.ctx.save();
      this.ctx.translate(x, y);

      this.ctx.rotate((Math.PI / 180) * this.angle);

      var xOffset = - (548 * coef) / 2;
      var yOffset = - (600 * coef) / 2;

      this.ctx.drawImage(onionPeeledSprite, xOffset, yOffset, 548 * coef, 600 * coef);

      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeStyle = "red";

      if (this.state !== "beheaded") {
        this.ctx.beginPath();
        this.ctx.moveTo(-180, -80);
        this.ctx.lineTo(180, -80);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      this.ctx.restore();
      this.beheading();
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
    var dist = Math.sqrt((mouse.x - 1100) * (mouse.x - 1100) + (mouse.y - 300) * (mouse.y - 300));
    if (dist < 40) {
      this.inPlace = false;
      this.state = "peeled";
      this.sprite = onionPeeledSprite;
      var backPic = document.getElementById("back");
      backPic.style.background = "none";
    }
  }
  halfOnion() {
    if (this.inPlace && this.knife.isSelected === true && (this.state === "intact" || this.state === "can be halfed")) {
      if (mouse.x > 508 && mouse.x < 515) {
        this.state = "cut half";
      }
      else {
        this.state = "intact";
      }
    }
  }
  splitOnion() {
    this.state = "halfed";
  }
  spinOnion(angle) {
    this.angle = angle;
  }
  beheading() {
    if ((this.angle === 90 && mouse.x > 690 && mouse.x < 694) ||
        (this.angle === 270 && mouse.x > 529 && mouse.x < 534)) {
        this.state = "can be beheaded";
      }
      else {
        this.state = "to chop";
      }
  }
  beheadOnion() {
    onionPeeledSprite.src = "../assets/kitchen_level/onion_beheaded.png";
    this.state = "beheaded";
  }
}


export {
  Onion
}
