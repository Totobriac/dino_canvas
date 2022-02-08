import { Tool } from  "./tool.js";
import { burners } from "./stove.js";

var onionChoppedSprite = new Image();
onionChoppedSprite.src = "../assets/kitchen_level/onion_chopped.png";

class Pan extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butterPlate) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.pieceWidth = 20;
    this.pieceHeight = 23;
    this.xOffset = 0;
    this.yOffset = 0;
    this.radius = 0;
    this.butter = butterPlate;
    this.hasOnion = false;
  }
  draw () {
    super.draw();
    if (this.butter.isCut === true) this.buttMelt();
    if (this.hasOnion === true) this.addOnion();
  }
  buttMelt() {
    if (burners[2].isOn === true && this.inPlace === true && this.pieceWidth > 0) {
      this.xOffset += 0.1;
      this.yOffset += 0.1;
      this.pieceWidth -= 0.1;
      this.pieceHeight -= 0.1;
      this.radius += 0.15;
    }

    this.ctx.fillStyle = "rgb(236,210,137)";
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2 + this.xOffset + this.pieceWidth / 2,
    this.y + this.height / 3 + this.pieceHeight / 2,
    this.radius * 0.3, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2 + this.pieceWidth / 2,
    this.y + this.height / 3 + this.yOffset + this.pieceHeight / 3,
    this.radius * 0.7, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2 + this.xOffset * 1.2 + this.pieceWidth / 3,
    this.y + this.height / 3 + this.yOffset * 2 + this.pieceHeight / 2,
    this.radius * 0.4, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.x + this.width / 2 + this.xOffset + this.pieceWidth / 3,
    this.y + this.height / 3 + this.yOffset + this.pieceHeight / 3,
    this.radius * 0.5, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.fillStyle = "rgb(248,232,183)";
    this.ctx.fillRect(this.x + this.width / 2 , this.y + this.height  /3, this.pieceWidth, this.pieceHeight);
  }
  addOnion() {
    this.ctx.drawImage(onionChoppedSprite, this.x + this.width / 2, this.y + this.height/ 10, 60, 60);
  }
}

export { Pan };
