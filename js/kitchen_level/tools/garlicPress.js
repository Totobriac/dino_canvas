import {
  Tool
} from "./tool.js";

import {
  displayTool,
  onTop,
  sink,
} from "../tools.js";


var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var topSprite = new Image();
topSprite.src = "../assets/kitchen_level/press_top.png";

var bottomSprite = new Image();
bottomSprite.src = "../assets/kitchen_level/press_bottom.png";

var cursorSprite = new Image();
cursorSprite.src = "../assets/kitchen_level/cursor.png";

var paste = [];

class GarlicPaste {
  constructor(ctx) {
    this.x = 562 + Math.floor(Math.random() * 70);
    this.y = 335;
    this.color = 36 + Math.floor(Math.random() * 18);
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "hsl(" + this.color + ", 100%, 72%)";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
  update() {
    this.y += 0.08;
    this.x += -0.3 + Math.random() * 0.6;
  }
}

class GarlicPress extends Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow, garlic) {
    super(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow);
    this.garlic = garlic;
    this.pressIt = false;
    this.angle = -90;
    this.cursorH = 30;
    this.direction = 4;
    this.total = 0;
  }
  draw() {

    console.log(this.angle);

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

      this.garlic.setBundaries();

      var backPic = document.getElementById("back");
      backPic.style.background = "url('../assets/kitchen_level/peeled_onion_back.png')";
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


      // if (mouse.y < 20) {
      //   paste.push(new GarlicPaste(this.ctx))
      //   paste.forEach((p, i) => {
      //     p.update();
      //   });
      // }

      paste.forEach((p, i) => {
        p.draw();
      });

      if (this.garlic.y === 220) {
        this.garlic.isSelected = false;

        this.ctx.fillStyle = myGradient;
        this.ctx.fillRect(1100, 50, 50, 300);

        this.cursorH += this.direction;
        if (this.cursorH > 320 || this.cursorH < 30) this.changeDirection();

        this.ctx.drawImage(cursorSprite, 1040, this.cursorH, 50, 50);
        
      }
    }
    else {
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
  addPoints() {
    switch (true) {
      case this.cursorH < 88:
        this.angle += -2;
        break;
      case this.cursorH < 146:
        this.angle += 5;
        break;
      case this.cursorH < 204:
        this.angle += 0;
        break;
      case this.cursorH < 262:
        this.angle += -1;
        break;
      case this.cursorH < 320:
        this.angle += 5;
        break;
    }
  }
}

export {
  GarlicPress,
};
