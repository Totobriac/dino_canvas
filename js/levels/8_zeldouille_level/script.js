import { Hero } from "./hero.js";
import { drawTiles } from "./overWorld.js";
import { Map } from "./map.js";
import { SideBar } from "./sideBar.js";
import { monsterAnimation } from "./monsters/ghouls.js";
import { drawTransition } from "./transition.js";

var zelda;
var sideBar;
var map;

export function animate(game, ctx) {
  if(!game.loadedLevel[8]) {
    zelda = new Hero(90, 192, 32, ctx);
    sideBar = new SideBar(ctx);
    map = new Map();
    game.loadedLevel[8] = true;
  }
  drawTiles(ctx);
  zelda.move();
  monsterAnimation(ctx);
  sideBar.draw();
  drawTransition(ctx);
}

export { map, zelda };
