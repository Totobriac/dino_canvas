var dinoSprite = new Image();
dinoSprite.src = "../assets/dino/dino_still.png";

var dinoSpriteLeft = new Image();
dinoSpriteLeft.src = "../assets/dino/dino_still_left.png";

var dinoWalk = new Image();
dinoWalk.src = "../assets/dino/dino_walk.png";

var dinoWalkLeft = new Image();
dinoWalkLeft.src = "../assets/dino/dino_walk_left.png";

var dino;

class Dino {
  constructor(ctx, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.isMoving = false;
    this.isWalkingLeft = true;
  }
  checkFrame(frames) {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
  draw(frames, columns, sprite, scale) {
    this.checkFrame(frames);
    let column = this.frameIndex % columns;
    let row = Math.floor(this.frameIndex / columns);
    this.ctx.drawImage(sprite, column * this.spriteWidth, row * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * scale, this.spriteHeight * scale);
  }
}

export function generateDino(ctx, game) {

  if (game.level8Dino == false) {
    dino = new Dino(ctx, 820, 300, 90, 99);
    game.level8Dino = true;
  }

  moveAround(game);
  animateDino();
}

function moveAround(game) {
  var mouseX = game.mousePosition.x;
  var mouseY = game.mousePosition.y;
  const dx = dino.x - mouseX;
  const dy = dino.y - mouseY;
  if (game.mousePosition.x != dino.x) {
    dino.isMoving = true;
    // dino.x -= dx / 80 * 0.9;
    dx > 0 ? dino.x -= game.gamespeed : dino.x += game.gamespeed;
  }
  if (game.mousePosition.y != dino.y) {
    dino.isMoving = true;
    dino.y -= dy / 80;
  }
  if (game.mousePosition.y < Math.floor(dino.y) * 1.05 && game.mousePosition.x < Math.floor(dino.x) * 1.05
    && game.mousePosition.y > Math.floor(dino.y) * 0.95 && game.mousePosition.x > Math.floor(dino.x) * 0.95) {
    dino.isMoving = false;
  }
  dx > 0 ? dino.isWalkingLeft = true : dino.isWalkingLeft = false;
}

function animateDino() {
  if (dino.isWalkingLeft == true) {
    dino.isMoving == false ? dino.draw(1, 1, dinoSpriteLeft, 0.8) : dino.draw(2, 2, dinoWalkLeft, 0.8);
  }
  else {
    dino.isMoving == false ? dino.draw(1, 1, dinoSprite, 0.8) : dino.draw(2, 2, dinoWalk, 0.8);
  }
}