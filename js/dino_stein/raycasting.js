import {
  drawFloorCeiling,
  Level
} from "./map.js";
import {
  Player
} from "./player.js";
import {
  createSprites,
  drawSprites
} from "./sprite.js";
import {
  createEnemies,
  drawEnemies
} from "./enemy.js";
import {
  setUpControls
} from "./control.js";
import {
  Pistol
} from "./pistol.js";
import{
  Hud
} from "./hud.js";

var level;
var player;
var pistol;
var miniMap;
var hud;

var canvasWidth = 1200;
var canvasHeight = 400;

let zBuffer = [];

canvas.width = canvasWidth;
canvas.height = canvasHeight;


function initMaze(game, ctx) {
  if (game.level5Started == false) {
    level = new Level(canvas);
    player = new Player(ctx, level,80, 60);
    pistol = new Pistol(ctx);
    hud = new Hud(ctx, player, pistol);
    setUpControls(player, pistol);
    createSprites(player, ctx);
    createEnemies(player, ctx, level, pistol);
    game.level5Started = true
  }
}

function maze(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloorCeiling(ctx);
  player.draw();
  level.levelAnimate();
  drawSprites(player, ctx);
  drawEnemies(player, ctx);
  pistol.draw();
  hud.draw(player);
}

export {
  zBuffer,
  initMaze,
  maze
}
