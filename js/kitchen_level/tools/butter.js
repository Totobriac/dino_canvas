import {
  Tool
} from "./tool.js";

import {
  burners
} from "./stove.js";

var butterCutSprite = new Image();
butterCutSprite.src = "../assets/kitchen_level/butter_sm_cut.png";

var points = [];

var frame = 0;
var maxFrame = 12;
var maxRadius = 0;

var radiusFrame = 0;

var maxPoints = 50;

class Butter extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isCut = false;
    this.pan = pan;
    this.pieceWidth = 20;
    this.pieceHeight = 23;
    this.xOffset = 0;
    this.yOffset = 0;
    this.radius = 0;
  }
  draw() {
    super.draw();

    if (this.isCut === true) {
      this.sprite = butterCutSprite;
    }
  }
  melt() {

    if (burners[2].isOn === true && this.pan.inPlace === true && this.pieceWidth > 0) {
      this.xOffset += 0.1;
      this.yOffset += 0.1;
      this.pieceWidth -= 0.1;
      this.pieceHeight -= 0.1;
      this.radius += 0.15;
    }

    this.ctx.fillStyle = "rgb(236,210,137)";
    this.ctx.beginPath();
    this.ctx.arc(this.pan.x + this.pan.width / 2 + this.xOffset + this.pieceWidth / 2,
      this.pan.y + this.pan.height / 3 + this.pieceHeight / 2,
      this.radius * 0.3, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.pan.x + this.pan.width / 2 + this.pieceWidth / 2,
      this.pan.y + this.pan.height / 3 + this.yOffset + this.pieceHeight / 3,
      this.radius * 0.7, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.pan.x + this.pan.width / 2 + this.xOffset * 1.2 + this.pieceWidth / 3,
      this.pan.y + this.pan.height / 3 + this.yOffset * 2 + this.pieceHeight / 2,
      this.radius * 0.4, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.pan.x + this.pan.width / 2 + this.xOffset + this.pieceWidth / 3,
      this.pan.y + this.pan.height / 3 + this.yOffset + this.pieceHeight / 3,
      this.radius * 0.5, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.fillStyle = "rgb(248,232,183)";
    this.ctx.fillRect(this.pan.x + this.pan.width / 2 + this.xOffset, this.pan.y + this.pan.height / 3 + this.yOffset, this.pieceWidth, this.pieceHeight);

  }

}

export {
  Butter
};
