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
import {
  Butter
} from "./tools/butter.js";
import {
  Onion
} from "./tools/onion.js";
import {
  ChefKnife
} from "./tools/chefKnife.js";


var pot;
var salt;
var pan;
var butter;
var butterBig;
var butterKnife;
var chefKnife;
var onion;

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

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "../assets/kitchen_level/chef_knife.png";

var onionSprite = new Image();
onionSprite.src = "../assets/kitchen_level/onion.png";

function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {
    salt = new Tool("salt", saltSprite, 1100, 20, 50, 50, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    });
    pot = new Pot("pot", potSprite, 550, 16, 210, 161, ctx, 22, 48, {
      x: 120,
      y: 132,
      r: 60
    });
    pan = new Tool("pan", panSprite, 350, 20, 200, 193, ctx, 837, 151, {
      x: 964,
      y: 225,
      r: 60
    });
    butter = new Butter("butter", butterSprite, 980, 5, 100, 73, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    }, pan);
    butterKnife = new ButterKnife("butterKnife", butterKnifeSprite, 340, 255, 14, 135, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    }, butter);
    chefKnife = new ChefKnife("chefKnife", chefKnifeSprite, 400,190, 200, 30, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    });
    onion = new Onion("onion", onionSprite, 140,300, 55, 60, ctx, 475, 275, {
      x: 502,
      y: 309,
      r: 28
    });
    butterBig = new Tool("butterBig", butterBigSprite, 405, 35, 462, 337, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    });

    tools.push(chefKnife);
    tools.push(pot);
    tools.push(salt);
    tools.push(pan);
    tools.push(butter);
    tools.push(butterKnife);
    tools.push(onion);

    game.kitchenLevelStarted = true;
  }

  for (let i = 0; i < tools.length; i++) {
    tools[i].draw();
    tools[i].isClose();
  }

  if (butterKnife.inPlace === false) drawFaucet(ctx);
}


export {
  drawTools,
  pot,
  tools,
  butterKnife,
  butterBig,
  onion,
};
