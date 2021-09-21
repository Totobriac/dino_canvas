const dinoWalk = new Image();
dinoWalk.src = "../assets/dino/dino_walk.png";

const dinoSprite = new Image();
dinoSprite.src = "../assets/dino/dino_all.png";

const pianoSprite = new Image();
pianoSprite.src = "../assets/bridge_level/piano.png";

var frame = 0;
var width = 66;
var height = 70;
var x = -20;
var y = 256;
var isWalking = true;

export function drawDinoPiano(ctx, dino) {
  ctx.globalAlpha = 1;
  update(dino);
  ctx.drawImage(pianoSprite, 620, y - 8)
  if (isWalking === true) {    
    ctx.drawImage(dinoWalk, dino.frameIndex * 90, 0, 90, 99, x, y, width, height);
  }
  else {
    ctx.globalAlpha = 1;
    ctx.drawImage(dinoSprite, 1676, 0, 90, 95, x, y, width, height);
  }
};

function update(dino) {
  frame < 900 ? x += 0.62 : isWalking = false;
  if (frame >= 500 && frame < 900) y += 0.16;
  dino.tickCount += 1;
  dino.checkFrame(2);
  frame++;
};