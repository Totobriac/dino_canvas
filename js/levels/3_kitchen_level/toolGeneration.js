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

var saltSprite = new Image();

var panSprite = new Image();

var butterPlateSprite = new Image();

var butterBigSprite = new Image();

var butterKnifeSprite = new Image();

var chefKnifeSprite = new Image();

var onionSprite = new Image();

var halfOnionSprite = new Image();

var spineKnifeSprite = new Image();

var butterCutSprite = new Image();

var carrotSprite = new Image();

var graterSprite = new Image();

var garlicHeadSprite = new Image();

var garlicPressSprite = new Image();

var spoonSprite = new Image();

var meatSprite = new Image();

var tinSprite = new Image();

var tinOpenerSprite = new Image();

var pastaUpSprite = new Image();

var colanderSprite = new Image();

var notepadSprite = new Image();

var pics = [potSprite, saltSprite, butterPlateSprite, butterKnifeSprite,
  panSprite, chefKnifeSprite, onionSprite, carrotSprite, graterSprite,
  garlicHeadSprite, garlicPressSprite, spoonSprite, meatSprite, tinSprite,
  tinOpenerSprite, pastaUpSprite, colanderSprite, notepadSprite
];

potSprite.src = "./assets/3_kitchen/pot.png";

saltSprite.src = "./assets/3_kitchen/salt.png";

panSprite.src = "./assets/3_kitchen/pan.png";

butterPlateSprite.src = "./assets/3_kitchen/butter_sm.png";

butterBigSprite.src = "./assets/3_kitchen/butter_big.png";

butterKnifeSprite.src = "./assets/3_kitchen/butter_knife.png";

chefKnifeSprite.src = "./assets/3_kitchen/chef_knife.png";

onionSprite.src = "./assets/3_kitchen/onion_top.png";

halfOnionSprite.src = "./assets/3_kitchen/half_onion.png";

spineKnifeSprite.src = "./assets/3_kitchen/chef_knife_spine.png";

butterCutSprite.src = "./assets/3_kitchen/butter_sm_cut.png";

carrotSprite.src = "./assets/3_kitchen/carrot.png";

graterSprite.src = "./assets/3_kitchen/grater.png";

garlicHeadSprite.src = "./assets/3_kitchen/garlic_head.png";

garlicPressSprite.src = "./assets/3_kitchen/garlic_press.png";

spoonSprite.src = "./assets/3_kitchen/spoon.png";

meatSprite.src = "./assets/3_kitchen/meat.png";

tinSprite.src = "./assets/3_kitchen/tin.png";

tinOpenerSprite.src = "./assets/3_kitchen/tin_opener.png";

pastaUpSprite.src = "./assets/3_kitchen/pasta_up.png";

colanderSprite.src = "./assets/3_kitchen/colander.png";

notepadSprite.src = "./assets/3_kitchen/notepad.png";

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
  }, laySound);

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

  Colander.prototype.pan = pan;

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
  }, laySound);

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
  }, grater, pan, laySound);

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
  }, laySound);

  tin = new Tin("tin", tinSprite, 135, 350, 50, 50, ctx, 475, 275, {
    x: 502,
    y: 300,
    r: 28
  }, tinOpener, pan, laySound);

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
