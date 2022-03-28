import { dino, game } from "../../script.js";
import { createParticles } from "./particles.js";

const planeSprite = new Image();
planeSprite.src = "./assets/1_plane/red_plane.png";

var maxTickCount = 12;
var tickCount = 0;
var frame = 0;
var maxFrame = 3;

var angle = 0;

var canFly = false;

export function drawPlane(ctx, dino) {

  if (game.loadedLevel[1] === false) {
    dino.x = 20;
    dino.y = 50;
    game.loadedLevel[1] = true;
  }
  update(dino);
  if (canFly && !game.levelDone) fly();

  ctx.rotate(-22 * Math.PI / 180);
  ctx.drawImage(planeSprite, frame * 384, 0, 384, 230, dino.x, dino.y, 100, 60);
  ctx.resetTransform();
  createParticles(dino.x, dino.y, 4, ctx, -22)
}

function update() {
  if (tickCount > maxTickCount) {
    tickCount = 0;
    frame > maxFrame ? frame = 0 : frame++;
  }
  else {
    tickCount++
  }
};

function fly() {
  angle += 0.4;
  let curve = Math.sin(angle) * 0.5;
  if (dino.y > 350) {
    dino.y = 350 + curve;
  }
  if (dino.y < 50) {
    dino.y = 50 + curve;
  }
  dino.vy += 0.02;
  dino.y += dino.vy + curve;
  if (game.keyDown.code === "ArrowUp" && !game.levelDone) {
    dinoFlyUp();
  }
  if (game.keyUp.code === "ArrowUp" && !game.levelDone) {
    dinoFlyDown();
  }
}

function dinoFlyUp() {
  if (dino.y > 50) {
    dino.vy -= 0.2;
    dino.y += dino.vy;
  }
};
function dinoFlyDown() {
  dino.vy += 0.02;
  dino.y += dino.vy;
};

function startFlying() {
  canFly = true;
}

export { dinoFlyUp, dinoFlyDown, startFlying };
