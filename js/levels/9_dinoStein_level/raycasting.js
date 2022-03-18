import { drawFloorCeiling, Level } from "./map.js";
import { Player } from "./player.js";
import { drawSprites, createSprites } from "./sprite.js";
import { drawEnemies } from "./enemy.js";
import { Pistol } from "./pistol.js";
import { Hud } from "./hud.js";

var level;
var player;
var pistol;
var hud;

var ctx;

var canvasWidth = 1200;
var canvasHeight = 400;

let zBuffer = [];

canvas.width = canvasWidth;
canvas.height = canvasHeight;


function initMaze(game, canvasCtx) {
  if (game.loadedLevel[9] == false) {
    ctx = canvasCtx;
    level = new Level(canvas);
    player = new Player(ctx, level, 80, 60);
    createSprites(level.level.sprites);    
    pistol = new Pistol(ctx);
    hud = new Hud(ctx, player, pistol);
    game.loadedLevel[9] = true;
  }
}

function maze(ctx) {
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
  maze,
  player, ctx, level, pistol
}
