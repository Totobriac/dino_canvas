const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

const planeSprite = new Image();
planeSprite.src = "../assets/plane_level/plane_1.png";

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
    this.isJumping = false;

    this.planeX = 20;
    this.planeY = 20;
    this.planeWidth = 150;
    this.planeHeight = 150;

    this.angle = 0;
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
  draw(ctx, isPlaying) {
    if (isPlaying === false || this.isJumping === true) {
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
  };
  drawPlane(ctx) {
    ctx.rotate(-22 * Math.PI / 180);
    ctx.drawImage(planeSprite, this.planeX, this.planeY, this.planeWidth, this.planeHeight);
    ctx.resetTransform();
  };
  updatePlane() {
    let curve = Math.sin(this.angle) * 0.5;
    if (this.planeY > 350) {
      this.planeY = 350 + curve;
    }
    if (this.planeY < 50) {
      this.planeY = 50 + curve;
    }
    this.vy += 0.02;
    this.planeY += this.vy + curve;
  };
  dinoFlyUp() {
    if (this.planeY > 50) {
      this.vy -= 1;
      this.planeY += this.vy;
      console.log(this.planeX)
    }
  }
  dinoFlyDown() {
    this.vy += 0.02;
    this.planeY += this.vy;
  }
}
