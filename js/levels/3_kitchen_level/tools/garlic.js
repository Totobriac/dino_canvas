import { Tool } from "./tool.js";

import { deleteTool, addStep } from "../tools.js";

var splitGarlicSprite = new Image();
splitGarlicSprite.src = "./assets/3_kitchen/garlic_split.png";

var singleCloveSprite = new Image();
singleCloveSprite.src = "./assets/3_kitchen/single_clove.png";

var crushedCloveSprite = new Image();
crushedCloveSprite.src = "./assets/3_kitchen/crushed_garlic.png";


class Garlic extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pan, sound) {
      super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, sound);
    this.pan = pan;
    this.single = false;
    this.minced = false;
    this.resetPos = false;
  }
  draw() {

    if (this.inPlace && this.minced === false) {
      this.sprite = splitGarlicSprite;
      this.width = 122;
      this.height = 81;
      this.perfX = 440;
      this.perfY = 270;
      this.x = 440;
      this.y = 270;
    }

    if (this.single) {
      this.sprite = singleCloveSprite;
    }

    if (this.minced) {
      this.sprite = crushedCloveSprite;
      this.width = 50;
      this.height = 50;
      if( !this.resetPos ) {
        this.resetPosition();
        this.resetPos = true;
      }
    }
    if (this.inPlace === true && this.minced === true) {
      this.pan.hasGarlic = true;
      addStep(9);
      deleteTool("garlic");
    }

    super.draw();

  }
  singleClove() {
    if (!this.single) {
      this.single = true;
      this.width = 88;
      this.height = 113;
      this.x =750;
      this.y = 150;
      this.perfX = undefined;
      this.perfY = undefined;
      this.shadow = {
        x: undefined,
        y: undefined,
        r: undefined,
      }
    }
  }
  setBundaries() {
    if (this.x < 550) this.x = 550;
    if ( this.x > 552) {
      if (this.y > 164 ) this.y = 164;
    }
    if (this.x < 552 && this.y > 220) this.y = 220;
  }
  resetPosition() {
    this.x = 470;
    this.y = 280;
    this.perfX = this.pan.x + 2 * this.pan.width / 3;
    this.perfY = this.pan.y + this.pan.height / 4;
    this.shadow = {
      x: this.perfX + 28,
      y: this.perfY + 28,
      r: 28
    }
  }
}

export {
  Garlic
};
