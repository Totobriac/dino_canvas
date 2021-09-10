const dinoSprite = new Image();
dinoSprite.src = "../assets/dino_all.png";

const dinoWalk = new Image();
dinoWalk.src = "../assets/dino_walk.png";

const dinoWalkleft = new Image();
dinoWalkleft.src = "../assets/dino_walk_left.png";

const planeSprite = new Image();
planeSprite.src = "../assets/plane_level/plane_1.png";

const subRight = new Image();
subRight.src = "../assets/submarine_level/right_submarine.png";

const subLeft = new Image();
subLeft.src = "../assets/submarine_level/left_submarine.png";

const subJet = new Image();
subJet.src = "../assets/submarine_level/bubble_jet.png"

const subJetRight = new Image();
subJetRight.src = "../assets/submarine_level/bubble_jet_right.png"

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
  drawSubmarine(ctx) {
    ctx.lineWidth = 0.2;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.beginPath();
    //ctx.moveTo(this.x, this.y);
    //ctx.lineTo(this.mouseX, this.mouseY)
    //ctx.stroke();
    //ctx.fillStyle = "red";
    //ctx.beginPath();
    //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //ctx.fill();
    //ctx.closePath();
    ctx.save();
    ctx.translate(this.x, this.y);
    this.angle = getAngle(this.x, this.mouseX, this.y, this.mouseY)
    ctx.rotate(this.angle);
    if (this.x >= this.mouseX) {
      ctx.drawImage(subLeft, 0 - 40, 0 - 45, 71, 80);
      ctx.drawImage(subJet,this.frameIndex * 108,0,108,108, 30, -29 , 60, 60);
    } else {
      ctx.drawImage(subRight, -40, -35, 71, 80);
      ctx.drawImage(subJetRight,this.frameIndex * 108,0,108,108, 34, -28 , 60, 60);
    }
    ctx.restore();
  }
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

function getAngle(x, mouseX, y, mouseY) {
  const dx = x - mouseX;
  const dy = y - mouseY;
  let theta = Math.atan2(dy, dx);
  return theta
}
