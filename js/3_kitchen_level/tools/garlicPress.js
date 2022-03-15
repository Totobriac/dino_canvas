import {
  Tool
} from "./tool.js";

import {
  displayAllTools,
  displayTool,
  onTop,
  sink,
} from "../tools.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "./assets/3_kitchen/chopping_board.png";

var topSprite = new Image();
topSprite.src = "./assets/3_kitchen/press_top.png";

var bottomSprite = new Image();
bottomSprite.src = "./assets/3_kitchen/press_bottom.png";

var cursorSprite = new Image();
cursorSprite.src = "./assets/3_kitchen/cursor.png";

var singleCloveSprite = new Image();
singleCloveSprite.src = "./assets/3_kitchen/single_clove.png";

var garlicPressSprite = new Image();
garlicPressSprite.src = "./assets/3_kitchen/garlic_press.png";

var paste = [];

class GarlicPaste {
  constructor(ctx) {
    this.x = 564 + Math.floor(Math.random() * 70);
    this.y = 335;
    this.color = 36 + Math.floor(Math.random() * 18);
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "hsl(" + this.color + ", 100%, 82%)";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
  update() {
    this.y += 2;
    this.x += -1.5 + Math.random() * 3;
  }
}

class GarlicPress extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, garlic) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.garlic = garlic;
    this.pressIt = false;
    this.angle = -54;
    this.oldAngle = -54
    this.cursorH = 30;
    this.direction = 4;
    this.total = 0;
    this.toCrush = false;
  }
  draw() {
    if (this.inPlace && this.garlic.inPlace === true) this.pressMe();

    if (this.pressIt) {

      var myGradient = this.ctx.createLinearGradient(0, 50, 0, 350);
      myGradient.addColorStop(0, "red");
      myGradient.addColorStop(0.33, "yellow");
      myGradient.addColorStop(0.5, "green");
      myGradient.addColorStop(0.666, "blue");
      myGradient.addColorStop(1, "violet");

      sink.faucet = false;

      onTop("garlic");

      displayTool(["garlic", "garlicPress"])

      this.garlic.singleClove();

      if (this.toCrush === false) this.garlic.setBundaries();

      var backPic = document.getElementById("back");
      backPic.style.background = "url('./assets/3_kitchen/peeled_onion_back.png')";
      this.ctx.fillStyle = "rgb(0,0,0,0.81)";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(choppingBoardSprite, 204, 0, 810, 531);

      this.ctx.save();

      this.ctx.translate(500, 300);
      this.ctx.rotate(-40 * Math.PI / 180);
      this.ctx.drawImage(bottomSprite, 0, 0, 329, 281);

      this.ctx.restore();

      this.ctx.save();

      this.ctx.translate(503, 283);
      this.ctx.rotate(this.angle * Math.PI / 180)
      this.x = -14;
      this.y = -55;
      super.draw();

      this.ctx.restore();

      paste.forEach((p, i) => {
        p.draw();
      });

      if (this.garlic.y === 220) {

        this.garlic.isSelected = false;

        this.toCrush = true;

        displayTool(["garlicPress"]);

        this.ctx.fillStyle = myGradient;
        this.ctx.fillRect(1100, 50, 50, 300);

        this.cursorH += this.direction;
        if (this.cursorH > 320 || this.cursorH < 30) this.changeDirection();

        this.ctx.drawImage(cursorSprite, 1040, this.cursorH, 50, 50);

        this.ctx.drawImage(singleCloveSprite, 0, 0, 88, 113 - this.total, 551, 220 + this.total, 88, 113 - this.total);
      }
    } else {
      super.draw();
    }
  }
  pressMe() {
    this.pressIt = true;
    this.sprite = topSprite;
    this.x = 490;
    this.y = 137;
    this.width = 442;
    this.height = 103;
    this.shadow = {
      x: undefined,
      y: undefined,
      r: undefined
    }
  }
  changeDirection() {
    this.direction === 4 ? this.direction = -4 : this.direction = 4;
  }
  points() {
    if(this.toCrush) this.addPoints();
  }
  addPoints() {
    if (this.angle < -4 ) {

      switch (true) {
        case this.cursorH < 88:
          this.angle += 2;
          break;
        case this.cursorH < 146:
          this.angle -= 2;
          break;
        case this.cursorH < 204:
          this.angle += 2;
          break;
        case this.cursorH < 262:
          this.angle -= 2;
          break;
        case this.cursorH < 320:
          this.angle += 2;
          break;
      }

      if (this.oldAngle < this.angle) {
        this.total += 3.4;
        for (let i = 0; i < 25; i++) {
          paste.push(new GarlicPaste(this.ctx))
        }
        this.oldAngle = this.angle;
        paste.forEach((p, i) => {
          p.update();
        });
      };
    }
    else {
      this.pressIt = false;
      this.sprite = garlicPressSprite;
      this.garlic.single = false;
      this.garlic.minced = true;
      this.width = 100;
      this.height = 30;
      this.x = 850;
      this.y = 20;
      displayAllTools();
    }
  }
}

export {
  GarlicPress,
};
