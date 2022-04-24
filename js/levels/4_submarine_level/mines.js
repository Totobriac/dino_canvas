import { endBubbles } from "./bubbles.js";

var mineSprite = new Image();
mineSprite.src = "./assets/4_submarine/mine_large.png";

var mineExplSprite = new Image();
mineExplSprite.src = "./assets/4_submarine/mine_explosion_hor.png";

var minesArray = [];
var explArray = [];

var style = canvas.style;
var amp = 7;
var t = 1;
var step = 0.03;


class Mine {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 40;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.ctx = ctx;
  }
  update(dino) {
    this.y -= this.speed;
    const dx = this.x - dino.x;
    const dy = this.y - dino.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    this.draw();
  }
  draw() {
    this.ctx.drawImage(mineSprite, this.x - 44, this.y - 43, 85, 85);
  }
}

class Explosion {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
    this.frames = 10;
    this.frameIndex = 0;
  }
  update() {
    this.tickCount += 1;
    this.draw();
  }
  draw() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      }
    }
    this.ctx.drawImage(mineExplSprite, this.frameIndex * 105, 0, 105, 105, this.x - 44, this.y - 43, 100, 100);
  }
}

function generateMines(ctx, frame, dino) {
  if (frame % 42 == 0 && endBubbles === true) {
    minesArray.push(new Mine(ctx));
  }
  for (let i = 0; i < minesArray.length; i++) {
    minesArray[i].update(dino);
    if (minesArray[i].distance < minesArray[i].radius + dino.radius) {
      addExplosion(minesArray[i].x, minesArray[i].y, ctx);
      minesArray.splice(i, 1);

      continue
    }
    if (minesArray[i].y < - minesArray[i].radius) {
      minesArray.splice(i, 1);
      i--;
    }
  }
}

function addExplosion(x, y, ctx) {
  explArray.unshift(new Explosion(x, y, ctx));
}

export function handleExplosion() {
  if (explArray.length > 0) {
    shake();
    for (let i = 0; i < explArray.length; i++) {
      explArray[i].frameIndex === 9 ? explArray.splice(i,1) : explArray[i].update();
    }
  } else {
    t = 1;
    style.filter = "blur(0px)";
    style.transform = "matrix(1,0,0,1,0,0)"
  }
}

function shake() {
  if (t > 0) {
    t -= step;
    var a = (Math.random() * 2 - 1) * t;
    var x = (Math.random() * amp * 2 - amp) * t;
    var y = (Math.random() * amp - amp * 0.5) * t;
    var s = Math.max(1, 1.05 * t);
    var b = 2 * t;
    var tr = "rotate(" + a + "deg) translate(" + x + "px," + y + "px) scale(" + s + ")";
    style.transform = style.webkitTransform = tr;
    style.filter = "blur(" + b + "px)";
  }
}

export {
  generateMines
};
