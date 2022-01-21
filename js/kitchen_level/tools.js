import { getCursorPosition, } from "./function.js";
import { selectedTool } from "./control.js";
import { sinkIsOn } from "./tools/sink.js";

var pot;
var salt;

var tools = [];

var waterLevel = 0;

var potInSink = false;

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "../assets/kitchen_level/salt.png";


class Tool {
  constructor(name, sprite, x, y, width, height, ctx, perfX, perfY, shadow) {
    this.name = name;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.offset = {
      x: null,
      y: null
    };
    this.perfX = perfX;
    this.perfY = perfY;
    this.shadow = shadow;
    this.inPlace = false;
    this.isFilled = false;
  }
  draw() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
  isClose() {
    if (this.distance({ x: this.x, y: this.y }, { x: this.perfX, y: this.perfY }) < this.width / 3) {
      this.x = this.perfX;
      this.y = this.perfY;
      this.inPlace = true;
    }
    else {
      this.inPlace = false;
    }
  }
  distance(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) +
      (obj1.y - obj2.y) * (obj1.y - obj2.y))
  }
  drawShadow() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.17)";
    this.ctx.arc(this.shadow.x, this.shadow.y, this.shadow.r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
}

function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    salt = new Tool("salt", saltSprite, 1100, 20, 50, 50, ctx, 22, 48, { x: 120, y: 132, r: 60 });
    pot = new Tool("pot", potSprite, 500, 20, 210, 161, ctx, 22, 48, { x: 120, y: 132, r: 60 });

    tools.push(pot);
    tools.push(salt);

    game.kitchenLevelStarted = true;
  }

  if (selectedTool) {
    selectedTool.drawShadow();
  }

  for (let i = 0; i < tools.length; i++) {
    tools[i].draw();
    tools[i].isClose();
  }
}

export { drawTools, pot, potInSink, tools };
