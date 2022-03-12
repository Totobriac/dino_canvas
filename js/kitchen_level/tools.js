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

import {
  Garlic
} from "./tools/garlic.js";

import {
  GarlicPress
} from "./tools/garlicPress.js";

import {
  Spoon
} from "./tools/spoon.js";

import {
  Meat
} from "./tools/meat.js";

import {
  Tin
} from "./tools/tin.js";

import {
  TinOpener
} from "./tools/tinOpener.js";

import {
  Pasta
} from "./tools/pasta.js";

import {
  Colander
} from "./tools/colander.js";

import {
  Notepad
} from "./tools/notepad.js";

import {
  Salt
} from "./tools/salt.js";

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
var garlic;
var garlicPress;
var spoon;
var meat;
var tin;
var tinOpener;
var pasta;
var colander;
var notepad;

var tools = [];
var stepDone = 0;

var potSprite = new Image();
potSprite.src = "./assets/kitchen_level/pot.png";

var saltSprite = new Image();
saltSprite.src = "./assets/kitchen_level/salt.png";

var panSprite = new Image();
panSprite.src = "./assets/kitchen_level/pan.png";

var butterPlateSprite = new Image();
butterPlateSprite.src = "./assets/kitchen_level/butter_sm.png";

var butterBigSprite = new Image();
butterBigSprite.src = "./assets/kitchen_level/butter_big.png";

var butterKnifeSprite = new Image();
butterKnifeSprite.src = "./assets/kitchen_level/butter_knife.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "./assets/kitchen_level/chef_knife.png";

var onionSprite = new Image();
onionSprite.src = "./assets/kitchen_level/onion_top.png";

var halfOnionSprite = new Image();
halfOnionSprite.src = "./assets/kitchen_level/half_onion.png";

var spineKnifeSprite = new Image();
spineKnifeSprite.src = "./assets/kitchen_level/chef_knife_spine.png";

var butterCutSprite = new Image();
butterCutSprite.src = "./assets/kitchen_level/butter_sm_cut.png";

var carrotSprite = new Image();
carrotSprite.src = "./assets/kitchen_level/carrot.png";

var graterSprite = new Image();
graterSprite.src = "./assets/kitchen_level/grater.png";

var garlicHeadSprite = new Image();
garlicHeadSprite.src = "./assets/kitchen_level/garlic_head.png";

var garlicPressSprite = new Image();
garlicPressSprite.src = "./assets/kitchen_level/garlic_press.png";

var spoonSprite = new Image();
spoonSprite.src = "./assets/kitchen_level/spoon.png";

var meatSprite = new Image();
meatSprite.src = "./assets/kitchen_level/meat.png";

var tinSprite = new Image();
tinSprite.src = "./assets/kitchen_level/tin.png";

var tinOpenerSprite = new Image();
tinOpenerSprite.src = "./assets/kitchen_level/tin_opener.png";

var pastaUpSprite = new Image();
pastaUpSprite.src = "./assets/kitchen_level/pasta_up.png";

var colanderSprite = new Image();
colanderSprite.src = "./assets/kitchen_level/colander.png";

var notepadSprite = new Image();
notepadSprite.src = "./assets/kitchen_level/notepad.png";

function drawTools(ctx, game) {
  if (game.kitchenLevelStarted === false) {    

    sink = new Sink();

    pot = new Pot("pot", potSprite, 860, 166, 210, 161, ctx, 22, 48, {
      x: 120,
      y: 132,
      r: 60
    }, sink);

    Sink.prototype.pot = pot;

    salt = new Salt("salt", saltSprite, 1100, 20, 50, 50, ctx, 1077, 145, {
      x: 1102,
      y: 170,
      r: 20
    }, pot);

    colander = new Colander("colander", colanderSprite, 550, 16, 200, 175, ctx, 22, 48, {
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

    butterKnife = new ButterKnife("butterKnife", butterKnifeSprite, 720, 255, 14, 135, ctx, undefined, undefined, {
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
    });

    grater = new Grater("grater", graterSprite, 618, 250, 80, 160, ctx, 470, 240, {
      x: 516,
      y: 314,
      r: 40
    });

    garlic = new Garlic("garlic", garlicHeadSprite, 85, 350, 40, 40, ctx, 495, 290, {
      x: 516,
      y: 314,
      r: 20
    }, pan);

    garlicPress = new GarlicPress("garlicPress", garlicPressSprite, 850, 20, 100, 30, ctx, 475, 290, {
      x: 516,
      y: 314,
      r: 30
    }, garlic);

    carrot = new Carrot("carrot", carrotSprite, 10, 330, 105, 22, ctx, 450, 305, {
      x: 506,
      y: 314,
      r: 40
    }, grater, pan);

    spoon = new Spoon("spoon", spoonSprite, 680, 180, 40, 213, ctx, undefined, undefined, {
      x: undefined,
      y: undefined,
      r: 40
    });

    Pan.prototype.spoon = spoon;

    meat = new Meat("meat", meatSprite, 265, 290, 60, 60, ctx, 934, 190, {
      x: 964,
      y: 225,
      r: 30
    }, spoon, pan);

    Pan.prototype.meat = meat;

    tinOpener = new TinOpener("tinOpener", tinOpenerSprite, 852, 50, 90, 40, ctx, 475, 275, {
      x: 502,
      y: 300,
      r: 28
    });

    tin = new Tin("tin", tinSprite, 135, 350, 50, 50, ctx, 475, 275, {
      x: 502,
      y: 300,
      r: 28
    }, tinOpener, pan);

    TinOpener.prototype.tin = tin;

    pasta = new Pasta("pasta", pastaUpSprite, 20, 240, 55, 150, ctx, 1062, 91, {
      x: 1102,
      y: 172,
      r: 28,
    }, pot, colander);

    Pot.prototype.pasta = pasta;

    notepad = new Notepad("notepad", notepadSprite, 296,60,69,90, ctx, undefined, undefined,{
      x: undefined,
      y: undefined,
      r: undefined,
    })

    tools.push(pot);
    tools.push(salt);
    tools.push(butterPlate);
    tools.push(butterKnife);
    tools.push(pan);
    tools.push(chefKnife);
    tools.push(onion);
    tools.push(carrot);
    tools.push(grater);
    tools.push(garlic);
    tools.push(garlicPress);
    tools.push(spoon);
    tools.push(meat);
    tools.push(tin);
    tools.push(tinOpener);
    tools.push(pasta);
    tools.push(colander);
    tools.push(notepad);

    game.kitchenLevelStarted = true;

  }
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].isDesplayed === true) {
      tools[i].draw();
      tools[i].isClose();
    }
  }
  selectable();
  sink.drawFaucet(ctx);
}

function displayTool(toolL) {
  for (let i = 0; i < tools.length; i++) {
    if (toolL.includes(tools[i].name)) {
      tools[i].isDesplayed = true;
    } else {
      tools[i].isDesplayed = false;
    }
  }
}

function displayAllTools() {
  for (let i = 0; i < tools.length; i++) {
    tools[i].isDesplayed = true;
  }
}

function deleteTool(tool) {
  var newTools = tools.filter(t => t.name != tool);
  tools = newTools;
}

function onTop(tool) {
  for (let i = 0; i < tools.length; i++) {
    if (tools[i].name === tool) {
      var tool = tools[i];
      tools.splice(i, 1);
      tools.push(tool);
    }
  }
}

function selectable() {
  var objects;
  switch(stepDone){
    case 0 :
      objects = ["pot"];
    break;
    case 1:
    case 2:
      objects = ["pot"];
    break;
    case 3:
      objects = ["salt"];
    break;
    case 4:
      objects = ["butterKnife"];
    break;
    case 5:
      objects = [];
    break;
    case 6:
      objects = ["pan"];
    break;
    case 7:
      objects = ["onion", "chefKnife"];
    break;
    case 8:
      objects = ["garlic", "garlicPress"];
    break;
    case 9:
      objects = ["carrot", "grater"];
    break;
    case 10:
      objects = ["spoon"];
    break;
    case 11:
      objects = ["spoon", "meat"];
    break;
    case 11:
      objects = ["pasta"];
    break;
    case 12:
      objects = ["spoon"];
    break;
    
  }
    
    

  var selectableTools = ["notepad", ...objects ];
  for (const tool of tools) {
    if (selectableTools.includes(tool.name)) {
      tool.canBeSelected = true;
    }
    else{
      tool.canBeSelected = false;
    }
  }
}

function addStep(step) {
  console.log(step);
  if (step > stepDone ) stepDone = step;
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
  garlicPress,
  displayTool,
  displayAllTools,
  onTop,
  meat,
  notepad,
  addStep,
  stepDone,
};
