import { Tool } from "./tool.js";
import { burners } from "./stove.js";
import { mouse } from "../control.js";
import { addStep } from "../tools.js";
import { pan } from "../toolGeneration.js";

import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";

var meltingButterSound = new sound("../assets/3_kitchen/sounds/butter_pan.mp3", false);

var stirFrySound = new sound("../assets/3_kitchen/sounds/stir_fry.mp3", true);

var onionChoppedSprite = new Image();
onionChoppedSprite.src = "./assets/3_kitchen/onion_chopped.png";

var gratedCarrotSprite = new Image();
gratedCarrotSprite.src = "./assets/3_kitchen/grated_carrot.png";

var crushedCloveSprite = new Image();
crushedCloveSprite.src = "./assets/3_kitchen/crushed_garlic.png";

var meatSprite = new Image();
meatSprite.src = "./assets/3_kitchen/meat.png";

var sauceRadius = 0;

class Veggy {
  constructor(pX, pY, pWidth, pHeight, width, height, color, ctx, pan) {
    this.panX = pX + pWidth / 2 + 28;
    this.panY = pY + pHeight / 3 + 5;
    this.x = this.panX - 56 + Math.floor(Math.random() * 112);
    this.y = this.panY - 56 + Math.floor(Math.random() * 112);
    this.width = width;
    this.height = height;
    this.color = color;
    this.angle = -30 + Math.floor(Math.random() * 60);
    this.ctx = ctx;
    this.pan = pan;
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
    if (distance({
      x: this.x,
      y: this.y
    }, mouse) < 5) {

      switch (true) {
        case mouse.moveX > 0 && mouse.moveY > 0:
          this.moveVeggy(2, 2);
          break;
        case mouse.moveX > 0 && mouse.moveY < 0:
          this.moveVeggy(2, -2);
          break;
        case mouse.moveX < 0 && mouse.moveY > 0:
          this.moveVeggy(-2, 2);
          break;
        case mouse.moveX < 0 && mouse.moveY < 0:
          this.moveVeggy(-2, -2);
          break;
      }
    }
    if (this.pan.hasSauce) {
      if (this.width > 1) this.width -= 0.002;
      if (this.height > 1) this.height -= 0.002;
    }
  }
  moveVeggy(x, y) {
    for (let i = 0; i < 5; i++) {
      var nextX = this.x + x;
      var nextY = this.y + y;
      if (distance({
        x: nextX,
        y: nextY
      }, {
        x: this.panX,
        y: this.panY
      }) < 56) {
        this.x += x;
        this.y += y;
      } else {
        this.x -= x;
        this.y -= y;
      }
    }
  }
}

class MeatPiece extends Veggy {
  constructor(pX, pY, pWidth, pHeight, x, y, picX, picY, ctx, pan) {
    super();
    this.panX = pX + pWidth / 2 + 28;
    this.panY = pY + pHeight / 3 + 5;
    this.width = 6;
    this.height = 6;
    this.x = x;
    this.y = y;
    this.picX = picX;
    this.picY = picY;
    this.ctx = ctx;
    this.pan = pan;
  }
  drawMeat() {
    this.ctx.drawImage(meatSprite, this.picX, this.picY, 33, 33, this.x, this.y, this.width, this.height);
  }
}

class Pan extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, butterPlate, laySound) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, laySound);
    this.pieceWidth = 20;
    this.pieceHeight = 23;
    this.xOffset = 0;
    this.yOffset = 0;
    this.radius = 0;
    this.butter = butterPlate;
    this.hasOnion = false;
    this.hasCarrot = false;
    this.hasGarlic = false;
    this.hasSauce = false;
    this.canStir = false;
    this.stirVeg = false;
    this.veggies = [];
    this.meatP = [];
    this.justCrushed = false;
    this.stirV = 0;
    this.stirM = 0;
  }
  draw() {
    super.draw();

    if (this.hasSauce) {
      if (sauceRadius < 57) sauceRadius += 0.2;
      if (Math.floor(sauceRadius) === 57) addStep(16);
      this.ctx.fillStyle = "red";
      this.ctx.beginPath();
      this.ctx.arc(this.x + this.width / 2 + 28, this.y + this.height / 3 + 7, sauceRadius, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    if (!this.stirVeg) {
      if (this.butter.isCut ) this.buttMelt();
      if (this.hasOnion ) this.addOnion();
      if (this.hasCarrot ) this.addCarrot();
      if (this.hasGarlic ) this.addGarlic();
    } else if (this.stirVeg) {
      this.isSelected = false;
      for (let i = 0; i < this.veggies.length; i++) {
        this.veggies[i].update();
        this.veggies[i].draw();
      };
    }

    var x = this.x + this.width / 2 + 28;
    var y = this.y + this.height / 3 + 5;

    if (this.stirVeg && this.spoon.isSelected && distance(mouse, { x: x, y: y }) < 56) {
      this.stirV++;
      if (this.stirV > 600) addStep(11);
    }
    if (this.justCrushed) {
      for (let i = 0; i < this.meatP.length; i++) {
        this.meatP[i].update();
        this.meatP[i].drawMeat();
      };
      if (this.spoon.isSelected && distance(mouse, { x: x, y: y }) < 56) {
        this.stirM++;
        if (this.stirM > 600) addStep(14);
      }
    }

    if (this.spoon.isSelected && !this.canStir && this.inPlace) {
      this.generateVeggies();
      this.canStir = true;
    }

    if (this.inPlace && this.spoon.isSelected && distance(mouse, {
      x: this.x + this.width / 2 + 28,
      y: this.y + this.height / 3 + 5
    }) < 56 && this.butter.isCut === true && this.hasOnion === true &&
      this.hasCarrot === true && this.hasGarlic === true) {
      this.stirVeg = true;
      playSound(stirFrySound, 0.3)
    } else {
      stopSound(stirFrySound);
    }

    if (this.meat.isCrushed) {
      this.generateMeat();
    }
  }
  generateMeat() {
    if (this.justCrushed === false) {
      this.meat.pieces.forEach((piece, i) => {
        this.meatP.push(new MeatPiece(this.x, this.y, this.width, this.height, piece.x, piece.y, piece.picX, piece.picY, this.ctx, pan))
      });
      this.justCrushed = true;
    }
  }
  buttMelt() {
    if (burners[2].isOn && this.inPlace && this.pieceWidth > 0) {
      playSound(meltingButterSound, 0.3);
      this.xOffset += 0.1;
      this.yOffset += 0.1;
      this.pieceWidth -= 0.1;
      this.pieceHeight -= 0.1;
      this.radius += 0.15;
    }
    if (this.pieceWidth < 0) {
      addStep(7);
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
    this.ctx.drawImage(gratedCarrotSprite, this.x + this.width / 2, this.y + this.height / 3, 50, 50);
  }
  addGarlic() {
    this.ctx.drawImage(crushedCloveSprite, this.x + 2 * this.width / 3, this.y + this.height / 4, 50, 50);
  }
  generateVeggies() {
    var vegetables = [{
      number: 350,
      width: 5,
      height: 5,
      color: "white"
    },
    {
      number: 250,
      width: 3,
      height: 3,
      color: "yellow"
    },
    {
      number: 350,
      width: 4,
      height: 4,
      color: "orange"
    },
    ];
    vegetables.forEach((veg, i) => {
      for (let i = 0; i < veg.number; i++) {
        var newVeg = new Veggy(this.x, this.y, this.width, this.height, veg.width, veg.height, veg.color, this.ctx, pan);

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

export { Pan };
