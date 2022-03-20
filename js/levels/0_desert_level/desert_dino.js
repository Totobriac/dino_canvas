import { dino } from "../../script.js";

var dinoSprite = new Image();
dinoSprite.src = "./assets/dino/dino_run.png";

var jumpSound = new Audio();
jumpSound.src = "./assets/sounds/jump.wav";

var width = 66;
var height = 70;
var isJumping = false;
var frame = 0;

var tickCount = 0;
var maxTickount = 12;


function drawDinoDesert(ctx, dino, game) {

  if (game.start) update(dino, game);
  var line = Math.floor(frame / 2);
  var column = frame - line * 2;

  if (game.keyDown && game.keyDown.code === "Space" && !isJumping && game.start) jump();

  if (!game.start || isJumping) frame = 0;

  else {
    checkFrame();
  }

  ctx.drawImage(dinoSprite, column * 88, line * 94, 88, 94, dino.x, dino.y, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  if (dino.isHit === true) ctx.strokeRect(dino.x + 40, dino.y + 8, 4, 4);
};

function update(dino) {
  dino.score += 0.06;
  dino.vy += 1;
  dino.y += dino.vy;
  tickCount += 1;
  dino.checkBundaries();
};

function jump() {
  jumpSound.play();
  isJumping = true;
  dino.vy -= 21;
  dino.y += dino.vy;
  setTimeout(() => isJumping = false, 820)
}

function checkFrame() {
  if (tickCount > maxTickount) {
    frame === 2 ? frame = 3 : frame = 2;
    tickCount = 0;
  }
}


export { isJumping, drawDinoDesert, jump };
