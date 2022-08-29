import { Hero } from "./hero.js";
import { drawTiles } from "./overWorld.js";
import { Map } from "./map.js";
import { SideBar } from "./sideBar.js";
import { monsterAnimation } from "./monsters/ghouls.js";
import { drawTransition } from "./transition.js";
import { playSound } from "./music.js";

var zelda;
var sideBar;
var map;

var playMain = true;

var darkDeath = false;

export function animate(game, ctx) {
  if(!game.loadedLevel[8]) {
    zelda = new Hero(90, 192, 32, ctx);
    sideBar = new SideBar(ctx);
    map = new Map();
    game.loadedLevel[8] = true;
  }
  
  playMain ? playSound(1) : playSound(16);

  drawTiles(ctx);

  if (darkDeath) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(8, 8, 896, 384);
    ctx.restore();
  }

  zelda.move();
  monsterAnimation(ctx);
  sideBar.draw();
  drawTransition(ctx);
}

function setMainMusic(onOff) {
  onOff === 1 ? playMain = true : playMain = false;
}

function castDeath() {
  darkDeath = true;
}

function removeDeath() {
  darkDeath = false;
}

export { map, zelda, sideBar, setMainMusic, castDeath, removeDeath };
