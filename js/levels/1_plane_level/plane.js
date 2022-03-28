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
var lands = false;

export function drawPlane(ctx, dino) {

  if (game.loadedLevel[1] === false) {
    dino.x = 20;
    dino.y = 50;
    game.loadedLevel[1] = true;
  }
  update(dino);
  if (canFly && !game.levelDone) fly();
  if (game.levelDone) {
    if (dino.y < 250) {
      dino.y ++;
    }
    else if (dino.y > 250){
      dino.y --;
    }
  }

  if (!lands) {
    ctx.rotate(-22 * Math.PI / 180);
    ctx.drawImage(planeSprite, frame * 384, 0, 384, 230, dino.x, dino.y, 100, 60);
    ctx.resetTransform();
    createParticles(dino.x, dino.y, 4, ctx, -22);
  } else  {
    dinoEscape(ctx);
  }
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

function landing() {
  lands = true;
}

let step = 171;
let angle2;

function dinoEscape(ctx) {
  const origin = {x: 600, y: 1200 };
  const radius = 1090;
  const end = 0.9272951769;
  const start = 2.21429922;

  const totalSteps = 1200;
  const stepSize = (end - start)/totalSteps;
  angle2 = start + step++ * stepSize;

  ctx.translate(origin.x, origin.y);
  ctx.rotate(-angle2);

  ctx.translate(radius, 0);
  ctx.rotate(93 * Math.PI / 180);
  ctx.drawImage(planeSprite, frame * 384, 0, 384, 230, -2, 0, 100, 60);
  ctx.resetTransform();
}

export { dinoFlyUp, dinoFlyDown, startFlying, landing };
