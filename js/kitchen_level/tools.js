import {
  selectedTool
} from "./control.js";
import {
  Tool
} from "./tools/tool.js";
import {
  Pot
} from "./tools/pot.js";
import {
  ButterKnife
} from "./tools/butter_knife.js";
import {
  drawFaucet
} from "./tools/sink.js";

var pot;
var salt;
var pan;
var butter;
var butterBig;
var butterKnife;

var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "../assets/kitchen_level/salt.png";

var panSprite = new Image();
panSprite.src = "../assets/kitchen_level/pan.png";

var butterSprite = new Image();
butterSprite.src = "../assets/kitchen_level/butter_sm.png";

var butterBigSprite = new Image();
butterBigSprite.src = "../assets/kitchen_level/butter_big.png";

var butterKnifeSprite = new Image();
butterKnifeSprite.src = "../assets/kitchen_level/butter_knife.png";



function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    salt = new Tool("salt", saltSprite, 1100, 20, 50, 50, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    });
    pot = new Pot("pot", potSprite, 500, 16, 210, 161, ctx, 22, 48, {
      x: 120,
      y: 132,
      r: 60
    });
    pan = new Tool("pan", panSprite, 300, 20, 200, 193, ctx, undefined, undefined, {
      x: 120,
      y: 132,
      r: 60
    });
    butter = new Tool("butter", butterSprite, 980, 5, 100, 73, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    });
    butterKnife = new ButterKnife("butterKnife", butterKnifeSprite, 40, 250, 14, 135, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    }, butter);
    butterBig = new Tool("butterBig", butterBigSprite, 405, 35, 462, 337, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    });

    tools.push(pot);
    tools.push(salt);
    tools.push(pan);
    tools.push(butter);
    tools.push(butterKnife);

    game.kitchenLevelStarted = true;
  }

  for (let i = 0; i < tools.length; i++) {
    tools[i].draw();
    tools[i].isClose();
  }

  if (selectedTool) {
    selectedTool.drawShadow();
  }

  drawFaucet(ctx);

  if (butterKnife.inPlace === true) {
    ctx.fillStyle = "rgba(0,0,0,80%)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    butterBig.draw();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(550, 65);
    ctx.lineTo(550, 350);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(530, 65);
    ctx.lineTo(530, 350);
    ctx.stroke();
  }
}

export {
  drawTools,
  pot,
  tools,
  butterKnife
};
