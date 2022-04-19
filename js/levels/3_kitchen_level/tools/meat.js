import { Tool } from "./tool.js";
import { deleteTool, addStep } from "../tools.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var fryingSound = new sound("../assets/3_kitchen/sounds/frying_onion.mp3", false);
var laySound = new sound("./assets/3_kitchen/sounds/lay.wav", false);

var meatSprite = new Image();
meatSprite.src = "./assets/3_kitchen/meat.png";

class Meat extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, spoon, pan) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
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

    if (this.inPlace) {
      playSound(fryingSound, 0.3);
    }
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
      this.pieces.forEach((piece) => {
        this.ctx.drawImage(meatSprite, piece.picX, piece.picY, 33, 33, piece.x, piece.y, 6, 6);
      });
    } else {
      super.draw();
    }
  }
  selectedPiece(e) {
    var x = e.offsetX;
    var y = e.offsetY;
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
          if (this.canCrush){
            stopSound(laySound);
            playSound(laySound, 0.3);
            this.crushMeat(i);
          }
        }
      }
    }
  }
  crushMeat(i) {
    this.canBeSelected = false;
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
