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
  Butter
} from "./tools/butter.js";
import {
  Onion
} from "./tools/onion.js";
import {
  ChefKnife
} from "./tools/chefKnife.js";

import {
  Sink
} from "./tools/sink.js";

import {
  Pan
} from "./tools/pan.js";

import {
  Carrot
} from "./tools/carrot.js";

import {
  Grater
} from "./tools/grater.js";

var pot;
var salt;
var pan;
var butterPlate;
var butterBig;
var butterKnife;
var chefKnife;
var onion;
var sink;
var carrot;
var grater;

var tools = [];

var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "../assets/kitchen_level/salt.png";

var panSprite = new Image();
panSprite.src = "../assets/kitchen_level/pan.png";

var butterPlateSprite = new Image();
butterPlateSprite.src = "../assets/kitchen_level/butter_sm.png";

var butterBigSprite = new Image();
butterBigSprite.src = "../assets/kitchen_level/butter_big.png";

var butterKnifeSprite = new Image();
butterKnifeSprite.src = "../assets/kitchen_level/butter_knife.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "../assets/kitchen_level/chef_knife.png";

var onionSprite = new Image();
onionSprite.src = "../assets/kitchen_level/onion_top.png";

var halfOnionSprite = new Image();
halfOnionSprite.src = "../assets/kitchen_level/half_onion.png";

var spineKnifeSprite = new Image();
spineKnifeSprite.src = "../assets/kitchen_level/chef_knife_spine.png";

var butterCutSprite = new Image();
butterCutSprite.src = "../assets/kitchen_level/butter_sm_cut.png";

var carrotSprite = new Image();
carrotSprite.src = "../assets/kitchen_level/carrot.png";

var graterSprite = new Image();
graterSprite.src = "../assets/kitchen_level/grater.png";


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

    butterPlate = new Butter("butterPlate", butterPlateSprite, 980, 5, 100, 73, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    });

    pan = new Pan("pan", panSprite, 350, 20, 200, 193, ctx, 837, 151, {
      x: 964,
      y: 225,
      r: 60
    }, butterPlate);

    butterKnife = new ButterKnife("butterKnife", butterKnifeSprite, 340, 255, 14, 135, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    }, butterPlate);
    onion = new Onion("onion", onionSprite, 140, 300, 60, 60, ctx, 475, 275, {
      x: 506,
      y: 304,
      r: 28
    }, pan);
    chefKnife = new ChefKnife("chefKnife", chefKnifeSprite, 400, 190, 200, 33, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 0
    }, onion);

    Onion.prototype.knife = chefKnife;

    butterBig = new Tool("butterBig", butterBigSprite, 405, 35, 462, 337, ctx, undefined, undefined, {
      x: 0,
      y: 0,
      r: 20
    })

    grater = new Grater("grater", graterSprite, 200, 250, 160, 160, ctx, 430, 240, {
      x: 516,
      y: 314,
      r: 40
    })


    carrot = new Carrot("carrot", carrotSprite, 10, 330, 105, 22, ctx, 450, 305, {
      x: 506,
      y: 314,
      r: 40
    }, grater)

    sink = new Sink();


    tools.push(pot);
    tools.push(salt);
    tools.push(butterPlate);
    tools.push(butterKnife);
    tools.push(pan);
    tools.push(chefKnife);
    tools.push(onion);
    tools.push(carrot);
    tools.push(grater);

    game.kitchenLevelStarted = true;
  }
  for (let i = 0; i < tools.length; i++) {
    tools[i].draw();
    tools[i].isClose();
  }

  sink.drawFaucet(ctx);

}

function deleteTool(tool) {
  var newTools = tools.filter(t => t.name != tool);
  tools = newTools;
}


export {
  drawTools,
  pot,
  tools,
  butterKnife,
  butterBig,
  onion,
  chefKnife,
  sink,
  deleteTool,
};
