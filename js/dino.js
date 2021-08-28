const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

export class Dino {
  constructor() {
    this.x = 20;
    this.y = 300;
    this.vy = 0;
    this.width = 66;
    this.height = 70;
    this.frames = 2;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
  };
  update() {
    if (this.y > 300) {
      this.y = 300;
      this.vy = 0;
    }
    this.vy += 1;
    this.y += this.vy;

    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }

  };
  draw(ctx, isPlaying, isJumping) {
    if (isPlaying === false || isJumping === true) {
      ctx.drawImage(dinoSprite, 1676, 0, 90, 95, this.x, this.y, this.width, this.height);
    }
    else {
      this.walk(ctx)
    }
  };
  jump() {
    this.vy -= 21;
    this.y += this.vy;
  };
  walk(ctx) {
    ctx.drawImage(dinoWalk, this.frameIndex * 90, 0, 90, 99, this.x, this.y, this.width, this.height);
  }
}

