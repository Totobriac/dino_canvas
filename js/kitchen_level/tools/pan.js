import {
  Tool
} from "./tool.js";
import {
  burners
} from "./stove.js";

import { mouse } from "../control.js";

var onionChoppedSprite = new Image();
onionChoppedSprite.src = "../assets/kitchen_level/onion_chopped.png";

var gratedCarrotSprite = new Image();
gratedCarrotSprite.src = "../assets/kitchen_level/grated_carrot.png";

var crushedCloveSprite = new Image();
crushedCloveSprite.src = "../assets/kitchen_level/crushed_garlic.png";

class Veggy {
  constructor(pX, pY, pWidth, pHeight, width, height, color, ctx) {
    this.x = pX + pWidth / 2 + 28 - 56 + Math.floor(Math.random() * 112);
    this.y = pY + pHeight / 3 + 5 - 56 + Math.floor(Math.random() * 112);
    this.width = width;
    this.height = height;
    this.color = color;
    this.angle = -30 + Math.floor(Math.random() * 60);
    this.ctx = ctx;
  }
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle * Math.PI / 180);
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  update() {
    if (distance({x: this.x, y: this.y},mouse) < 5) {
      this.x += 5;
      this.y += 5;
    }
  }
}

class Pan extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butterPlate) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.pieceWidth = 20;
    this.pieceHeight = 23;
    this.xOffset = 0;
    this.yOffset = 0;
    this.radius = 0;
    this.butter = butterPlate;
    this.hasOnion = false;
    this.hasCarrot = false;
    this.hasGarlic = false;
    this.canStir = false;
    this.veggies = [];
  }
  draw() {
    super.draw();
    if (this.butter.isCut === true) this.buttMelt();
    if (this.hasOnion === true) this.addOnion();
    if (this.hasCarrot === true) this.addCarrot();
    if (this.hasGarlic === true) this.addGarlic();

    if (this.spoon.isSelected && !this.canStir) {
      this.generateVeggies();
      this.canStir = true;
    }

    if (this.veggies.length > 0) {
      for (let i = 0; i < this.veggies.length; i++) {
        this.veggies[i].update();
        this.veggies[i].draw();
      }
    }
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
    this.ctx.fillRect(this.x + this.width / 2, this.y + this.height / 3, this.pieceWidth, this.pieceHeight);
  }
  addOnion() {
    this.ctx.drawImage(onionChoppedSprite, this.x + this.width / 2, this.y + this.height / 10, 60, 60);
  }
  addCarrot() {
    this.ctx.drawImage(gratedCarrotSprite, this.x + this.width / 3, this.y + this.height / 4, 50, 50);
  }
  addGarlic() {
    this.ctx.drawImage(crushedCloveSprite, this.x + 2 * this.width / 3, this.y + this.height / 4, 50, 50);
  }
  generateVeggies() {
    var vegetables = [{
        number: 250,
        width: 4,
        height: 4,
        color: "white"
      },
      {
        number: 150,
        width: 2,
        height: 2,
        color: "yellow"
      },
      {
        number: 350,
        width: 3,
        height: 3,
        color: "orange"
      },
    ];
    vegetables.forEach((veg, i) => {
      for (let i = 0; i < veg.number; i++) {
        var newVeg = new Veggy(this.x, this.y, this.width, this.height, veg.width, veg.height, veg.color, this.ctx);

        if (distance(newVeg, {
            x: this.x + this.width / 2 + 28,
            y: this.y + this.height / 3 + 5
          }) < 56) {
          this.veggies.push(newVeg);
          this.veggies.sort((a, b) => 0.5 - Math.random());
        }
      }
    });
  }
  stir() {

  }
}

function distance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
    (obj1.y - obj2.y) * (obj1.y - obj2.y))
}

export {
  Pan
};
