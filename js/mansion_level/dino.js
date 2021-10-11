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
  moveAround(game) {
    var mouseX = game.mousePosition.x;
    var mouseY = game.mousePosition.y;
    var dx;
    this.x - mouseX < 0 ? dx = this.x - mouseX + 80 : dx = this.x - mouseX;
    var dy;
    this.y - mouseY < 0 ? dy = this.y - mouseY + 70 : dy = this.y - mouseY + 100;
    if (mouseX != this.x && (dx > 10 || dx < -10)) {
      this.isMoving = true;
      dx > 0 ? this.x -= game.gamespeed * 0.5 : this.x += game.gamespeed * 0.5;
    }
    if (mouseY != this.y && (dy > 10 || dy < -10)) {
      this.isMoving = true;
      dy > 0 ? this.y -= game.gamespeed * 0.5 : this.y += game.gamespeed * 0.5;
    }
    if (dx <= 10 && dx >= -10) {
      this.isMoving = false;
    }
    dx > 0 ? this.isWalkingLeft = true : this.isWalkingLeft = false;
  }
  animateDino() {
    if (this.isWalkingLeft == true) {
      this.isMoving == false ? this.draw(1, 1, dinoSpriteLeft, 0.8) : this.draw(2, 2, dinoWalkLeft, 0.8);
    }
    else {
      this.isMoving == false ? this.draw(1, 1, dinoSprite, 0.8) : this.draw(2, 2, dinoWalk, 0.8);
    }
  }
  checkBundaries(right, left, top, bottom) {
    if (this.x >= right) {
      this.x = right;
    }
    if (this.x <= left) {
      this.x = left;
    }
    if (this.y <= top) {
      this.y = top;
    }
    if (this.y >= bottom) {
      this.y = bottom;
    }
  }
}

export function generateDino(ctx, game) {

  if (game.level8Dino == false) {
    dino = new Dino(ctx, 820, 300, 90, 99);
    game.level8Dino = true;
  }
  dino.moveAround(game);
  dino.checkBundaries(820, 0, 295, 320);
  dino.animateDino();
}
