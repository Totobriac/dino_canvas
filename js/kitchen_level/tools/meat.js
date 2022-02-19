import {
  Tool
} from "./tool.js";

var meatSprite = new Image();
meatSprite.src = "../assets/kitchen_level/meat.png";

class Meat extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.minced = false;
    this.pieces = [];
  }
  draw() {
    if (this.inPlace && !this.minced) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          this.pieces.push({
            picX: 33 * j,
            picY: 33 * i,
            x: 934 + 6 * j ,
            y: 190 + 6 * i ,
          })
          this.minced = true;
        }
      }
    }
    else if (this.x === 934 && this.y === 190 && this.minced) {
    this.pieces.forEach((piece, i) => {
        this.ctx.drawImage(meatSprite, piece.picX, piece.picY, 33, 33, piece.x , piece.y , 6, 6);
      });
    } else {
      super.draw();
    }
  }
}

export {
  Meat
};
