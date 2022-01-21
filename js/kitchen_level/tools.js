import { selectedTool } from "./control.js";
import { Tool } from "./tools/tool.js";
import { Pot } from "./tools/pot.js";

var pot;
var salt;

var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "../assets/kitchen_level/salt.png";



function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    salt = new Tool("salt", saltSprite, 1100, 20, 50, 50, ctx, 22, 48, { x: 120, y: 132, r: 60 });
    pot = new Pot("pot", potSprite, 500, 20, 210, 161, ctx, 22, 48, { x: 120, y: 132, r: 60 });

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

export { drawTools, pot, tools };
