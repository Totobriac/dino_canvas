import { Tool } from "./tool.js";

import { deleteTool, addStep } from "../tools.js";

var meatSprite = new Image();
meatSprite.src = "./assets/kitchen_level/meat.png";

class Meat extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, spoon, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, spoon);
    this.minced = false;
    this.pieces = [];
    this.piecesNum = 0;
    this.break = false;
    this.spoon = spoon;
    this.canCrush = true;
    this.isCrushed = false;
    this.pan = pan;
  }
  draw() {
    if (this.inPlace && !this.minced) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          this.pieces.push({
            picX: 33 * j,
            picY: 33 * i,
            x: 934 + 6 * j,
            y: 190 + 6 * i,
          })
          this.minced = true;
        }
      }
    } else if (this.x === 934 && this.y === 190 && this.minced) {
      this.inPlace = true;
      this.break = true;
      this.pieces.forEach((piece, i) => {
        this.ctx.drawImage(meatSprite, piece.picX, piece.picY, 33, 33, piece.x, piece.y, 6, 6);
      });
    } else {
      super.draw();
    }
  }
  selectedPiece(x, y) {
    if (this.pieces.length > 0) {
      this.pan.canBeSelected = false;
      this.canBeSelected = false;
      for (let i = 0; i < this.pieces.length; i++) {
        if (
          x < this.pieces[i].x ||
          x > this.pieces[i].x + 6 ||
          y < this.pieces[i].y ||
          y > this.pieces[i].y + 6
        ) {
          continue;
        } else {
          if (this.canCrush) this.crushMeat(i);
        }
      }
    }
  }
  crushMeat(i) {
    this.piecesNum++;
    var pLin = Math.floor(i / 10);
    var pCol = i - pLin * 10;

    for (let j = 0; j < this.pieces.length; j++) {
      if (j >= pLin * 10) {
        this.pieces[j].y += 0.5;
      } else {
        this.pieces[j].y -= 0.5;
      }

      for (let h = pCol; h < 10; h++) {
        for (let k = 0; k < 10; k++) {
          this.pieces[h + k * 10].x += 0.009;
        }
      }

      for (let i = 0; i < pCol; i++) {
        for (let m = 0; m < 10; m++) {
          this.pieces[i + m * 10].x -= 0.009;
        }
      }
    }
    if (this.piecesNum > 18) {
      this.canCrush = false;
      this.isCrushed = true;
      this.break = false;
      addStep(12);
      deleteTool("meat");
    };
  }
}

export { Meat };
