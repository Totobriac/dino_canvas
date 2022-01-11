let passerbyArray = [];

const restBackSprite = new Image();
restBackSprite.src = "../assets/restaurant_level/restaurant_no_window_no_boundaries.png";

const seaSprite = new Image();
seaSprite.src = "../assets/restaurant_level/sea_animation.png";

const customerSprite = new Image();
customerSprite.src = "../assets/restaurant_level/rest_customers_stupid_air.png";

const guybrushSprite = new Image();
guybrushSprite.src = "../assets/restaurant_level/guy.png";

const outsideSprite = new Image();
outsideSprite.src = "../assets/restaurant_level/restaurant_outside.png";

export function generateBack(ctx) {
  ctx.drawImage(restBackSprite, 0, 0, 600, 200, 0, 0, canvas.width, canvas.height)
}

const seaAnim = {
  frames: 6,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const mustache = {
  frames: 3,
  frameIndex: 0,
  ticksPerFrame: 12,
  tickCount: 0,
}

const lady = {
  frames: 2,
  frameIndex: 0,
  ticksPerFrame: 18,
  tickCount: 0,
}

const bold = {
  frames: 4,
  frameIndex: 0,
  ticksPerFrame: 24,
  tickCount: 0,
}

class Guybrush {
  constructor(ctx, game) {
    this.x = 0;
    this.y = 150;
    this.frames = 6;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.gamespeed = game.gamespeed ;
  }
  updateGuy() {
    this.tickCount += 1;
    this.x += this.gamespeed * 0.8;
    this.drawGuy();
  }
  drawGuy() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.ctx.drawImage(guybrushSprite, 110 * this.frameIndex, 0, 110, 150, this.x, this.y, 77, 105);
  }
}

export function generateSea(ctx) {
  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
  ctx.drawImage(seaSprite, 0, 20 + (241 * seaAnim.frameIndex), 1280, 241, 190, 90, 1290, 241);
  ctx.drawImage(outsideSprite, 0, 0, 600, 200, 0, 0, canvas.width, canvas.height);
}

export function generateCustomers(ctx) {
  mustache.tickCount += 1;
  checkFrame(mustache);
  ctx.drawImage(customerSprite, 50 * mustache.frameIndex, 0, 50, 84, 196, 200, 60, 101);
  lady.tickCount += 1;
  checkFrame(lady);
  ctx.drawImage(customerSprite, 150 + (50 * lady.frameIndex), 0, 50, 84, 330, 200, 60, 101);
  bold.tickCount += 1;
  checkFrame(bold);
  ctx.drawImage(customerSprite, 250 + (50 * bold.frameIndex), 0, 50, 84, 820, 200, 60, 101);
}

export function generateGuyBrush(ctx, game) {
  console.log(passerbyArray)
  if (game.frame % 300 === 0) {
    passerbyArray.unshift(new Guybrush(ctx, game));
  }
  for (let i = 0; i < passerbyArray.length; i++) {
    passerbyArray[i].updateGuy();
  }
  if (passerbyArray.length > 2) {
    passerbyArray.pop(passerbyArray[0])
  }
}

function checkFrame(sprite) {
  if (sprite.tickCount > sprite.ticksPerFrame) {
    sprite.tickCount = 0;
    if (sprite.frameIndex < sprite.frames - 1) {
      sprite.frameIndex += 1;
    } else {
      sprite.frameIndex = 0;
    }
  }
}

export function generateRestBack (ctx, game) {
  generateSea(ctx);
  generateGuyBrush(ctx, game);
  generateBack(ctx);
  generateCustomers(ctx);
}
