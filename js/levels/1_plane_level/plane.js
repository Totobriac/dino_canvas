import { dino, game } from "../../script.js";
import { createParticles } from "./particles.js";


const planeSprite = new Image();
planeSprite.src = "./assets/1_plane/red_plane.png";

var planeWidth = 100;
var planeHeight = 60;

var maxTickCount = 12;
var tickCount = 0;
var frame = 0;
var maxFrame = 3;

var angle = 0;

export function drawPlane(ctx, dino) {

  if(game.level1Started === false) {
    dino.x = 20;
    dino.y = 20;
    game.level1Started = true;
  }
  update(dino);

  fly();

  ctx.rotate(-22 * Math.PI / 180);
  ctx.drawImage(planeSprite,frame * 384, 0, 384, 230, dino.x, dino.y, planeWidth, planeHeight);
  ctx.resetTransform();
  createParticles(dino.x, dino.y, 4, ctx, -22)
}

function update(dino) {
  if (tickCount > maxTickCount) {
    tickCount = 0;
    frame > maxFrame ? frame = 0 : frame ++;
  }
  else {
    tickCount ++
  }
  angle += 0.2;
  let curve = Math.sin(angle) * 0.5;
  if (dino.y > 350) {
    dino.y = 350 + curve;
  }
  if (dino.y < 50) {
    dino.y = 50 + curve;
  }
  dino.vy += 0.02;
  dino.y += dino.vy + curve;
};

function fly() {
  if (game.keyDown.code === "ArrowUp" ) {
    dinoFlyUp();    
  }
  if (game.keyUp.code === "ArrowUp" ) {
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

export { dinoFlyUp, dinoFlyDown }
