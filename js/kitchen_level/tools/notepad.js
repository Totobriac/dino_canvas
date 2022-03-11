import { Tool } from "./tool.js";


class Notepad extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.big = false;
  }
  draw() {
    if (this.isSelected) {
      this.makeItBig();
    };    

    if (this.big) {
      this.width = 466;
      this.height = 600;
      this.x = 367;
      super.draw();
      this.ctx.fillStyle = "black";
      this.ctx.font = "30px Cooking";
      this.ctx.fillText("Pixeboy", this.x + 60, this.y + 54);
    }
    else {
      this.width = 69;
      this.height = 90;
      this.x = 296;
      this.y = 60;
      super.draw();
    };
  }
  makeItBig() {
    this.big = true;
  }
  reset(x, y) {
    if (x < 367 || x > 833 ||y < this.y ||y > this.y + this.height) {
      this.big = false;      
    }
  }
}

export { Notepad };
