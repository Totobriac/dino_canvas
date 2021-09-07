const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

const dinoWalkleft = new Image();
dinoWalkleft.src = "../assets/dino_walk_left.png";

const planeSprite = new Image();
planeSprite.src = "../assets/plane_level/plane_1.png";

let dinoPic;

export class Dino {
  constructor() {
    this.x = 20;
    this.vx = 0;
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
    this.isWalkingLeft = false;
  };

  update() {
    this.vy += 1;
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= 0.99;
    this.tickCount += 1;
    this.checkBundaries();
    this.checkFrame();
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

  draw(ctx, isPlaying) {
    if (isPlaying === false || this.isJumping === true) {
      ctx.drawImage(dinoSprite, 1676, 0, 90, 95, this.x, this.y, this.width, this.height);
    }
    else {
      this.isWalkingLeft === false ? dinoPic = dinoWalk : dinoPic = dinoWalkleft;
      ctx.drawImage(dinoPic, this.frameIndex * 90, 0, 90, 99, this.x, this.y, this.width, this.height);  
    }
  };
  drawPlane(ctx) {
    ctx.rotate(-22 * Math.PI / 180);
    ctx.drawImage(planeSprite, this.planeX, this.planeY, this.planeWidth, this.planeHeight);
    ctx.resetTransform();
  };
  jump() {
    this.vy -= 21;
    this.y += this.vy;
  };
  dinoFlyUp() {
    if (this.planeY > 50) {
      this.vy -= 1;
      this.planeY += this.vy;
    }
  }
  dinoFlyDown() {
    this.vy += 0.02;
    this.planeY += this.vy;
  }
  walkRight() {
    this.vx = 4;
    this.isWalkingLeft = false;
  }
  walkLeft() {
    this.vx = -4;
    this.isWalkingLeft = true;
  }
  checkFrame() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
  checkBundaries() {
    if (this.y > 300) {
      this.y = 300;
      this.vy = 0;
    }
    if (this.x < 20) {
      this.x = 20;
      this.vx = 0;
    }
    if (this.x > 1120) {
      this.x = 1120;
      this.vx = 0;
    }
  }
}
