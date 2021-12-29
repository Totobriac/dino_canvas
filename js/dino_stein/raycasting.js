import { drawFloorCeiling, Level } from "./map.js";
import { Player } from "./player.js";
import { createSprites, drawSprites } from "./sprite.js";
import { createEnemies, drawEnemies} from "./enemy.js";
import { setUpControls } from "./control.js";

var player;
var level;

var canvasWidth = 1200;
var canvasHeight = 400;

let zBuffer = [];

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function initMaze(game, ctx) {
  if (game.level5Started == false) {
    level = new Level(canvas);
    player = new Player(ctx, level, 60, 60);
    setUpControls(player);
    createSprites(player, ctx);
    createEnemies(player, ctx,level);
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
}

export { zBuffer, initMaze, maze }
