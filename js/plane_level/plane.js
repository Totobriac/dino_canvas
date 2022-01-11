import { dino } from "../script.js";
import { createParticles } from "./particles.js";


const planeSprite = new Image();
planeSprite.src = "../assets/plane_level/red_plane.png";

var planeWidth = 100;
var planeHeight = 60;

var maxTickCount = 12;
var tickCount = 0;
var frame = 0;
var maxFrame = 3;

var x = 20;
var y = 20;
var angle = 0;

export function drawPlane(ctx, dino) {
  update(dino);
  ctx.rotate(-22 * Math.PI / 180);
  ctx.drawImage(planeSprite,frame * 384, 0, 384, 230, x, y, planeWidth, planeHeight);
  ctx.resetTransform();
  createParticles(x, y, 4, ctx, -22)
}

function update(dino) {
  if (tickCount > maxTickCount) {
    tickCount = 0;
    frame > maxFrame ? frame = 0 : frame ++;
  }
  else {
    tickCount ++
  }
  tickCount ++;
  angle += 0.2;
  let curve = Math.sin(angle) * 0.5;
  if (y > 350) {
    y = 350 + curve;
  }
  if (y < 50) {
    y = 50 + curve;
  }
  dino.vy += 0.02;
  y += dino.vy + curve;
};

function dinoFlyUp() {
  if (y > 50) {
    dino.vy -= 1;
    y += dino.vy;
  }
};
function dinoFlyDown() {
  dino.vy += 0.02;
  y += dino.vy;
};

export { dinoFlyUp, dinoFlyDown }
