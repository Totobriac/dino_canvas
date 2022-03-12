import { Tool } from "./tool.js";

class Salt extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pot) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow)
    this.pot  = pot;
    this.reset = false;
  }
  draw() {
    super.draw();
    if( this.inPlace) {
      this.pot.addSalt();
      this.reset = true;
    }
    if(this.reset) {
      this.x = 1100;
      this.y = 20;
    }
  }
}

export { Salt };