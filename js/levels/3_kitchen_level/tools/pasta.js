import { Tool } from "./tool.js";
import { onTop, onTopTwo, addStep, deleteTool } from "../tools.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var dropPastaSound = new sound("./assets/3_kitchen/sounds/drop_pastas.mp3", false);
var drainPastaSound = new sound("./assets/3_kitchen/sounds/pasta_drain.mp3", false);

var pastaSprite = new Image();
pastaSprite.src = "./assets/3_kitchen/pasta.png";

var steamSprite = new Image();
steamSprite.src = "./assets/3_kitchen/steam.png";

var steamCloudSprite = new Image();
steamCloudSprite.src = "./assets/3_kitchen/steam_cloud.png";

var add = 0.5;

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
    this.angle = 0;
    this.sound = false;
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

    if (this.areCooking) {

      this.notepad.isSelected || this.spoon.isSelected ? onTopTwo(this.top) : onTop(this.top);

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
          addStep(12);
          this.pot.perfX = 22;
          this.pot.perfY = 48;
          this.pot.shadow = {
            x: 120,
            y: 132,
            r: 60
          };
          if (!this.pot.inPlace) {
            this.doneCooking = true;
          }
        }
      });
    } else {
      super.draw();
    }
    if (this.doneCooking && this.pot.inPlace && this.colander.inPlace) {
      playSound(drainPastaSound, 0.3);

      this.colander.hasPastas = true;
      this.pot.stopBoilingSound();
      this.pot.waterLevel = 0;
      this.pot.isFilled = false;
      this.pot.x = 375;
      this.pot.y = 8;
      this.pot.perfX = undefined;
      this.pot.perfY = undefined;
      this.pot.shadow = {
        x: undefined,
        y: undefined,
        r: undefined,
      };

    }
    if (this.colander.hasPastas) {
      this.pot.x = 375;
      this.pot.y = 8;

      if (this.angle > 110) {
        add = -0.2;
      } else if (this.angle < 0) {
        add = 0.2;
      };

      this.angle += add;

      var tempCanvas = document.createElement("canvas");
      var tempContext = tempCanvas.getContext("2d");
      tempCanvas.width = 1400;
      tempCanvas.height = 400;

      tempContext.translate(this.colander.x, this.colander.y);
      tempContext.rotate(this.angle * 0.5 * Math.PI / 180);

      tempContext.globalAlpha = 0.7;
      tempContext.drawImage(steamSprite, -250 + this.angle * 0.1, -250 + this.angle);
      tempContext.drawImage(steamSprite, -250 + this.angle, -250 + this.angle * 0.1);

      tempContext.setTransform(1, 0, 0, 1, 0, 0);
      tempContext.globalCompositeOperation = 'destination-in';

      tempContext.drawImage(steamCloudSprite, this.colander.x + 24, this.colander.y + 18);

      this.ctx.drawImage(tempCanvas, 0, 0);
    }
  }
  inPot() {
    this.areCooking = true;
    if (!this.sound) {
      playSound(dropPastaSound, 0.3);
      this.sound = true;
    }
  }
}

function distance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
    (obj1.y - obj2.y) * (obj1.y - obj2.y))
}

export { Pasta };
