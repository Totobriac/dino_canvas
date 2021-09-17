const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

const dinoWalkleft = new Image();
dinoWalkleft.src = "../assets/dino_walk_left.png";

let dinoPic;

export class Dino {
  constructor() {
    this.x = 20;
    this.vx = 0;
    this.y = 300;
    this.vy = 0;    
    this.frames = 2;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;   
    this.isWalkingLeft = false;
    this.mouseX = 600;
    this.mouseY = 200;
    this.radius = 40;
  };
  update() {
    this.vy += 1;
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= 0.99;
    this.tickCount += 1;
    this.checkBundaries();
    this.checkFrame(2);
  };
  subDive(mouse) {
    this.tickCount += 1;
    this.mouseX = mouse.x;
    this.mouseY = mouse.y;
    const dx = this.x - this.mouseX;
    const dy = this.y - this.mouseY;
    if (mouse.x != this.x) {
      this.x -= dx / 20;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 20;
    }
    this.checkFrame(8);
  };
  walkRight() {
    this.vx = 4;
    this.isWalkingLeft = false;
  }
  walkLeft() {
    this.vx = -4;
    this.isWalkingLeft = true;
  }
  checkFrame(frames) {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < frames - 1) {
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

