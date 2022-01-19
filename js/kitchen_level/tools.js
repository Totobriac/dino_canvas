import { getCursorPosition, } from "./function.js";
import { selectedTool } from "./control.js";

var pot;
var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

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
  }
  draw() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
  isClose() {
    if (this.distance({ x: this.x, y: this.y }, { x: this.perfX, y: this.perfY }) < this.width / 3) {
      this.x = this.perfX;
      this.y = this.perfY;
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
    pot = new Tool("pot", potSprite, 500, 20, 210, 161, ctx, 24, 47, { x: 125, y: 130, r: 60 });
    tools.push(pot);
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

function getSelectedTool(e) {
  var mouse = getCursorPosition(e);
  for (let i = 0; i < tools.length; i++) {
    if (mouse.x < tools[i].x || mouse.x > tools[i].x + tools[i].width ||
      mouse.y < tools[i].y || mouse.y > tools[i].y + tools[i].height) {
      return null;
    } else {
      return tools[i];
    }
  }
}

export { drawTools, getSelectedTool };
