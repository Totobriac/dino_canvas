let passerbyArray = [];

var xOffset = 320;
var charOffset = 0;
var doorOffset = 0;

const restBackSprite = new Image();
restBackSprite.src = "./assets/2_restaurant/inside_no_door.png";

const seaSprite = new Image();
seaSprite.src = "./assets/2_restaurant/sea_animation.png";

const customerSprite = new Image();
customerSprite.src = "./assets/2_restaurant/rest_customers_stupid_air.png";

const guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

const outsideSprite = new Image();
outsideSprite.src = "./assets/2_restaurant/rampe_original.png";

var leftDoorSprite = new Image();
leftDoorSprite.src = "./assets/2_restaurant/left_door.png";

var rightDoorSprite = new Image();
rightDoorSprite.src = "./assets/2_restaurant/right_door.png";

function generateBack(ctx) {
  ctx.drawImage(leftDoorSprite, 542 - doorOffset, 105, 78, 140);
  ctx.drawImage(rightDoorSprite, 620 + doorOffset, 105, 78, 140);
  ctx.drawImage(restBackSprite, xOffset, 0, 600, 200, 0, 0, canvas.width, canvas.height);
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
    this.y = 140;
    this.frames = 6;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.gamespeed = game.gamespeed ;
  }
  updateGuy() {
    this.tickCount += 1;
    this.x += this.gamespeed * 0.2;
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

function generateSea(ctx) {
  seaAnim.tickCount += 1;
  checkFrame(seaAnim);
  ctx.drawImage(seaSprite, xOffset * 0.1, 20 + (241 * seaAnim.frameIndex), 1280, 241, 0, 90, 1290, 241);
  ctx.drawImage(outsideSprite, xOffset * 0.8, 0, 982, 49, 0, 159, 982 * 1.8, 49 * 1.8);
}

function generateCustomers(ctx) {
  mustache.tickCount += 1;
  checkFrame(mustache);
  ctx.drawImage(customerSprite, 50 * mustache.frameIndex, 0, 50, 84, -444 + charOffset, 200, 60, 101);
  lady.tickCount += 1;
  checkFrame(lady);
  ctx.drawImage(customerSprite, 150 + (50 * lady.frameIndex), 0, 50, 84, -310 + charOffset, 200, 60, 101);
  bold.tickCount += 1;
  checkFrame(bold);
  ctx.drawImage(customerSprite, 250 + (50 * bold.frameIndex), 0, 50, 84, 180 + charOffset, 200, 60, 101);
}

function generateGuyBrush(ctx, game) {
  if (game.frame % 1300 === 0) {
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

function generateRestBack (ctx, game) {
  generateSea(ctx);
  generateGuyBrush(ctx, game);
  generateBack(ctx);
  generateCustomers(ctx);
}

function dinoEntrance() {
  if (doorOffset < 78) doorOffset += 0.5;
}

function moveLeft() {
  if (xOffset > 1) {
    xOffset--;
    charOffset += 2;
  }
};

export { generateBack, moveLeft, generateRestBack, dinoEntrance };
