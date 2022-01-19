import { getCursorPosition, } from "./function.js";
import { selectedTool } from "./control.js";

var pot;
var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

class Tool {
  constructor(name, sprite, x, y, width, height, ctx) {
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
  }
  draw() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    pot = new Tool("pot", potSprite, 500, 20, 210, 161, ctx);
    tools.push(pot);
    game.kitchenLevelStarted = true;
  }
  pot.draw();
  if (selectedTool === pot) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.17)";
    ctx.arc(125, 130, 60, 0, 2 * Math.PI, false);
    ctx.fill();
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
