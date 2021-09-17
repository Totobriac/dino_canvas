import { dino } from "../script.js"

const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

var width = 66;
var height = 70;
var isJumping = false;


export function drawDinoDesert(ctx, dino, game) {
  if (game.isPlaying === false || isJumping === true) {
    ctx.drawImage(dinoSprite, 1676, 0, 90, 95, dino.x, dino.y, width, height);
  }
  else {
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, width, height);
  }
};

export function jump() {
  isJumping = true;
  dino.vy -= 21;
  dino.y += dino.vy;
  setTimeout(() => isJumping = false, 820)
};

export { isJumping }
