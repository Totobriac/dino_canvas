import {
  Tool
} from "./tool.js";

import { onTop } from "../tools.js";


var pastaSprite = new Image();
pastaSprite.src = "../assets/kitchen_level/pasta.png";

class singlePasta {
  constructor() {
    this.length = 85 + Math.floor(Math.random() * 10);
    this.color = 60 + Math.floor(Math.random() * 14);
    this.start = Math.floor(Math.random() * 10);
    this.five = Math.floor(Math.random() * 5);
    this.bezier = -2 + Math.floor(Math.random() * 4);
  }
}

class Pasta extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, pot, colander) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isUp = true;
    this.pastas = [];
    this.populatePastas();
    this.count = 0;
    this.maxCount = 24;
    this.size = 0;
    this.shriking = true;
    this.bezierSize = 0;
    this.areCooking = false;
    this.doneCooking = false;
    this.pot = pot;
    this.colander = colander;
    this.top = "pasta";
  }
  populatePastas() {
    for (let i = 0; i < 150; i++) {
      this.pastas.push(new singlePasta);
    }
  }
  draw() {
    if (this.isSelected) this.isUp = false;

    if (!this.isUp && !this.areCooking) {
      this.sprite = pastaSprite;
      super.draw();
    }

    if (this.areCooking === true) {

      onTop(this.top);

      if (!this.colander.hasPastas) {
        var X = this.pot.x + 106;
        var Y = this.pot.y + 83;
      }

      if (this.colander.hasPastas) {
        var X = this.colander.x + 106;
        var Y = this.colander.y + 83;
      }

      if (this.count > this.maxCount && this.size < 42 && this.pot.inPlace) {
        this.size++;
        this.count = 0;
      } else {
        this.count++;
      };
      var start = 0;
      var end = 2 * Math.PI;

      let step = 0;
      var totalSteps = this.pastas.length;
      var stepSize = (end - start) / totalSteps;

      this.pastas.forEach(pasta => {
        var angle = start + step++ * stepSize;
        var pastaLength = -pasta.length + this.size;

        this.ctx.save();
        this.ctx.strokeStyle = "hsla(57, 100%," + pasta.color + "%, 1)";
        this.ctx.lineWidth = 2;
        this.ctx.translate(X, Y);
        this.ctx.rotate(+angle);
        if (this.size < 31) {
          this.ctx.beginPath();
          this.ctx.moveTo(pasta.start, -pasta.five * 5);
          this.ctx.lineTo(pastaLength, -pasta.five);
          this.ctx.stroke();
        } else {
          this.bezierSize++;
          this.ctx.beginPath();
          this.ctx.moveTo(pasta.start, -pasta.five * 5);
          this.ctx.quadraticCurveTo(pasta.start + pasta.bezier * (this.size - 31) * 1.4, -pasta.five * 5 + pasta.bezier * (this.size - 31) * 1.4, pastaLength, -pasta.five);
          this.ctx.stroke();
        }
        this.ctx.restore();
        if (this.size === 42 && !this.colander.hasPastas) {
          this.pot.perfX = 22;
          this.pot.perfY = 48;
          this.pot.shadow = {
            x: 120,
            y: 132,
            r: 60
          };
          if (this.pot.inPlace === false) {
            this.doneCooking = true;
          }
        }
      });
    }
    else {
      super.draw();
    }
    if(this.doneCooking && this.pot.inPlace && this.colander.inPlace) {
      this.colander.hasPastas = true;
      this.pot.waterLevel = 0;
      this.pot.isFilled = false;
      this.pot.perfX = undefined;
      this.pot.perfY = undefined;
      this.pot.shadow = {
        x: undefined,
        y: undefined,
        r: undefined,
      };
      this.top = "pot";
    }
  }
  inPot() {
    this.areCooking = true;
  }
}

export {
  Pasta
};
