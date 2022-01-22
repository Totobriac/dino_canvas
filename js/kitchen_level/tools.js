import { selectedTool } from "./control.js";
import { Tool } from "./tools/tool.js";
import { Pot } from "./tools/pot.js";

var pot;
var salt;
var pan;
var butter;

var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "../assets/kitchen_level/salt.png";

var panSprite = new Image();
panSprite.src = "../assets/kitchen_level/pan.png";

var butterSprite = new Image();
butterSprite.src = "../assets/kitchen_level/butter_sm.png"; 



function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    salt = new Tool("salt", saltSprite, 1100, 20, 50, 50, ctx, undefined, undefined, { x: 0, y: 0, r: 0 });
    pot = new Pot("pot", potSprite, 500, 16, 210, 161, ctx, 22, 48, { x: 120, y: 132, r: 60 });
    pan  = new Tool("pan", panSprite, 300, 20, 200, 193, ctx, undefined, undefined, { x: 120, y: 132, r: 60 });
    butter = new Tool("butter", butterSprite, 980, 5, 100,73, ctx, undefined, undefined, { x: 0, y: 0, r: 0 });

    tools.push(pot);
    tools.push(salt);
    tools.push(pan);
    tools.push(butter);

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
