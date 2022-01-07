import { dino } from "../script.js";

var dinoSprite = new Image();
dinoSprite.src = "../assets/dino/dino_all.png";

var dinoWalk = new Image();
dinoWalk.src = "../assets/dino/dino_walk.png";

var jumpSound = new Audio();
jumpSound.src = "../assets/sounds/jump.wav";

var width = 66;
var height = 70;
var isJumping = false;


export function drawDinoDesert(ctx, dino, game) {
  update(dino);
  if (game.isPlaying === false || isJumping === true) {
    ctx.drawImage(dinoSprite, 1676, 0, 90, 95, dino.x, dino.y, width, height);
  }
  else {
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, dino.x, dino.y, width, height);   
  } 
};

export function jump() {
  jumpSound.play();
  isJumping = true;
  dino.vy -= 21;
  dino.y += dino.vy;
  setTimeout(() => isJumping = false, 820)
};

function update(dino) {
  dino.score += 0.02;
  dino.vy += 1;
  dino.y += dino.vy;  
  dino.tickCount += 1;
  dino.checkBundaries();
  dino.checkFrame(2);  
};

export { isJumping };
