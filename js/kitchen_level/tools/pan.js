import { Tool } from  "./tool.js";
import { burners } from "./stove.js";

class Pan extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butterPlate) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.pieceWidth = 20;
    this.pieceHeight = 23;
    this.xOffset = 0;
    this.yOffset = 0;
    this.radius = 0;
    this.butter = butterPlate;
  }
  draw () {
    super.draw();
    if (this.butter.isCut === true) this.buttMelt();
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
    console.log(this.x + this.width / 2 ,this.y + this.height  /3  );
    //this.ctx.fillRect(this.x + this.width / 2 + this.xOffset, this.y + this.height / 3 + this.yOffset, this.pieceWidth, this.pieceHeight);
    this.ctx.fillRect(this.x + this.width / 2 , this.y + this.height  /3, this.pieceWidth, this.pieceHeight);
    //this.ctx.fillRect(450,85,25,25)

  }
}

export { Pan };
