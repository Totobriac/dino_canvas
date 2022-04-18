import { sound } from "../../sound.js";

var laySound = new sound("./assets/3_kitchen/sounds/lay.wav", false);


import { Tool } from "./tools/tool.js";
import { Pot } from "./tools/pot.js";
import { ButterKnife } from "./tools/butter_knife.js";
import { Butter } from "./tools/butter.js";
import { Onion } from "./tools/onion.js";
import { ChefKnife } from "./tools/chefKnife.js";
import { Pan } from "./tools/pan.js";
import { Carrot } from "./tools/carrot.js";
import { Grater } from "./tools/grater.js";
import { Garlic } from "./tools/garlic.js";
import { GarlicPress } from "./tools/garlicPress.js";
import { Spoon } from "./tools/spoon.js";
import { Meat } from "./tools/meat.js";
import { Tin } from "./tools/tin.js";
import { TinOpener } from "./tools/tinOpener.js";
import { Pasta } from "./tools/pasta.js";
import { Colander } from "./tools/colander.js";
import { Notepad } from "./tools/notepad.js";
import { Salt } from "./tools/salt.js";
import { Sink } from "./tools/sink.js";

import { sink } from "./tools.js";

var pot;
var salt;
var pan;
var butterPlate;
var butterBig;
var butterKnife;
var chefKnife;
var onion;
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

var tools;

var potSprite = new Image();
potSprite.src = "./assets/3_kitchen/pot.png";

var saltSprite = new Image();
saltSprite.src = "./assets/3_kitchen/salt.png";

var panSprite = new Image();
panSprite.src = "./assets/3_kitchen/pan.png";

var butterPlateSprite = new Image();
butterPlateSprite.src = "./assets/3_kitchen/butter_sm.png";

var butterBigSprite = new Image();
butterBigSprite.src = "./assets/3_kitchen/butter_big.png";

var butterKnifeSprite = new Image();
butterKnifeSprite.src = "./assets/3_kitchen/butter_knife.png";

var chefKnifeSprite = new Image();
chefKnifeSprite.src = "./assets/3_kitchen/chef_knife.png";

var onionSprite = new Image();
onionSprite.src = "./assets/3_kitchen/onion_top.png";

var halfOnionSprite = new Image();
halfOnionSprite.src = "./assets/3_kitchen/half_onion.png";

var spineKnifeSprite = new Image();
spineKnifeSprite.src = "./assets/3_kitchen/chef_knife_spine.png";

var butterCutSprite = new Image();
butterCutSprite.src = "./assets/3_kitchen/butter_sm_cut.png";

var carrotSprite = new Image();
carrotSprite.src = "./assets/3_kitchen/carrot.png";

var graterSprite = new Image();
graterSprite.src = "./assets/3_kitchen/grater.png";

var garlicHeadSprite = new Image();
garlicHeadSprite.src = "./assets/3_kitchen/garlic_head.png";

var garlicPressSprite = new Image();
garlicPressSprite.src = "./assets/3_kitchen/garlic_press.png";

var spoonSprite = new Image();
spoonSprite.src = "./assets/3_kitchen/spoon.png";

var meatSprite = new Image();
meatSprite.src = "./assets/3_kitchen/meat.png";

var tinSprite = new Image();
tinSprite.src = "./assets/3_kitchen/tin.png";

var tinOpenerSprite = new Image();
tinOpenerSprite.src = "./assets/3_kitchen/tin_opener.png";

var pastaUpSprite = new Image();
pastaUpSprite.src = "./assets/3_kitchen/pasta_up.png";

var colanderSprite = new Image();
colanderSprite.src = "./assets/3_kitchen/colander.png";

var notepadSprite = new Image();
notepadSprite.src = "./assets/3_kitchen/notepad.png";

var pics = [potSprite, saltSprite, butterPlateSprite, butterKnifeSprite,
  panSprite, chefKnifeSprite, onionSprite, carrotSprite, graterSprite,
  garlicHeadSprite, garlicPressSprite, spoonSprite, meatSprite, tinSprite,
  tinOpenerSprite, pastaUpSprite, colanderSprite, notepadSprite
];


function generateTools(ctx) {
  pot = new Pot("pot", potSprite, 860, 166, 210, 161, ctx, 22, 48, {
    x: 120,
    y: 132,
    r: 60
  }, sink, laySound);

  Sink.prototype.pot = pot;

  salt = new Salt("salt", saltSprite, 1100, 20, 50, 50, ctx, 1077, 145, {
    x: 1102,
    y: 170,
    r: 20
  }, pot, laySound);

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
  }, butterPlate, laySound);

  butterKnife = new ButterKnife("butterKnife", butterKnifeSprite, 720, 255, 14, 135, ctx, undefined, undefined, {
    x: 0,
    y: 0,
    r: 20
  }, butterPlate);

  onion = new Onion("onion", onionSprite, 140, 300, 60, 60, ctx, 475, 275, {
    x: 506,
    y: 304,
    r: 28
  }, pan, laySound);

  chefKnife = new ChefKnife("chefKnife", chefKnifeSprite, 400, 190, 200, 33, ctx, undefined, undefined, {
    x: 0,
    y: 0,
    r: 0
  }, onion);

  Onion.prototype.chefKnife = chefKnife;

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
  }, pan, laySound);

  garlicPress = new GarlicPress("garlicPress", garlicPressSprite, 850, 20, 100, 30, ctx, 475, 290, {
    x: 516,
    y: 314,
    r: 30
  }, garlic, laySound);

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

  notepad = new Notepad("notepad", notepadSprite, 296, 60, 69, 90, ctx, undefined, undefined, {
    x: undefined,
    y: undefined,
    r: undefined,
  })

  Pasta.prototype.notepad = notepad;
  Pasta.prototype.spoon = spoon;

  tools = [pot, salt, butterPlate, butterKnife, pan, chefKnife, onion,
    carrot, grater, garlic, garlicPress, spoon, meat, tin,
    tinOpener, pasta, colander, notepad
  ]

  return tools;
}

export { generateTools, pot, butterKnife, butterBig,
  onion, chefKnife, garlicPress, meat, notepad, pasta, pan
};
