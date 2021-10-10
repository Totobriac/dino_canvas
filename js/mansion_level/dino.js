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
  dino.draw( 1, 1, dinoSpriteLeft, 0.8);
  moveAround(game);
}

function moveAround(game) {
  dino.x = game.mousePosition.x;
  dino.y = game.mousePosition.y;
}