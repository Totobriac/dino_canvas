import {
  Tool
} from "./tool.js";


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
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.isUp = true;
    this.pastas = [];
    this.populatePastas();
    this.count = 0;
    this.maxCount = 24;
    this.size = 0;
    this.shriking = true;
  }
  populatePastas() {
    for (let i = 0; i < 150; i++) {
      this.pastas.push(new singlePasta);
    }
  }
  draw() {
    if (this.isSelected) this.isUp = false;
    if (!this.isUp) {
      this.sprite = pastaSprite;
      super.draw();
    } else {
      super.draw();
    }
  }
  inPot() {
    if (this.count > this.maxCount && this.size < 35) {
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
      this.ctx.translate(1106, 173);
      this.ctx.rotate(+angle);
      if (this.size < 31) {
        this.ctx.beginPath();
        this.ctx.moveTo(pasta.start, -pasta.five * 5);
        this.ctx.lineTo(pastaLength, -pasta.five);
        this.ctx.stroke();
      } else {
        this.ctx.beginPath();
        this.ctx.moveTo(pasta.start, -pasta.five * 5);
        this.ctx.quadraticCurveTo(pasta.bezier * this.size ,pasta.bezier * this.size * -1 , pastaLength, -pasta.five);
        this.ctx.stroke();
      }
      this.ctx.restore();
    });

  }
}

export {
  Pasta
};
