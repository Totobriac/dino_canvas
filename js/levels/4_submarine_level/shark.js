import { endBubbles } from "./bubbles.js";

var sharkRightSprite = new Image();
sharkRightSprite.src = "./assets/4_submarine/shark_right.png";

var sharkLeftSprite = new Image();
sharkLeftSprite.src = "./assets/4_submarine/shark_left.png";

var sharkTurnRightSprite = new Image();
sharkTurnRightSprite.src = "./assets/4_submarine/shark_turn_right.png";

var sharkTurnLeftSprite = new Image();
sharkTurnLeftSprite.src = "./assets/4_submarine/shark_turn_left.png";

var bittingRightSprite = new Image();
bittingRightSprite.src = "./assets/4_submarine/bitting_right.png";

var bittingLeftSprite = new Image();
bittingLeftSprite.src = "./assets/4_submarine/bitting_left.png";

var dx = 0;
var dy = 0;

var isShark = false;
var shark = undefined;

var sprite = sharkRightSprite;
var oldSprite = sharkRightSprite;

var biteSprite = bittingRightSprite;

var dinoSpriteX = [0, 188, 380, 578, 772, 962, 1152, 1346, 1544, 1736];
var dinoTurnX = [0, 198, 378, 540, 690, 814, 910, 992, 1074, 1172, 1291, 1436, 1616];
var dinoBiteX = [0, 198, 394];

class Shark {
  constructor(dino, game, ctx) {
    this.x = -100;
    this.y = 100;
    this.dino = dino;
    this.game = game;
    this.ctx = ctx;
    this.angle = 0;
    isShark = true;
    this.tickCount = 0;
    this.maxTickount = 10;
    this.frame = 0;
    this.oldFrame = 0;
    this.turnFrame = 0;
    this.maxTurnFrame = 12;
    this.maxBiteFrame = 2;
    this.isTurning = false;
    this.isBiting = true;
    this.matrix;
    this.score = 50;
  }
  update() {

    dx < 28 && dx > -28 && dy < 28 && dy > -28 ? this.isBiting = true : this.isBiting = false;

    if (!this.isTurning ) {
      dx = this.x - this.dino.x;
      dy = this.y - this.dino.y;
      if (this.x != this.dino.x) {
        this.x -= dx / 20;
      }
      if (this.y != this.dino.y) {
        this.y -= dy / 20;
      }
      var maxFrame;
      this.isBiting ? maxFrame = 2 : maxFrame = 9;
      if (this.tickCount > this.maxTickount) {
        this.frame >= maxFrame ? this.frame = 0 : this.frame++;
        this.tickCount = 0;
      } else {
        this.tickCount++;
      }
    } else {
      if (this.tickCount > 4) {
        this.turnFrame >= this.maxTurnFrame ? this.turnFrame = 0 : this.turnFrame++;
        this.tickCount = 0;
      } else {
        this.tickCount++;
      }
    }
  }
  draw() {

    this.update();
    this.ctx.save();

    if (this.x >= this.dino.x) {
      this.ctx.translate(this.x, this.y - 30);
      sprite = sharkLeftSprite;
      biteSprite = bittingLeftSprite;
    } else {
      this.ctx.translate(this.x, this.y + 30);
      sprite = sharkRightSprite;
      biteSprite = bittingRightSprite;
    }

    this.angle = getAngle(this.x, this.y, this.dino)
    this.ctx.rotate(this.angle);

    this.matrix = this.ctx.getTransform().invertSelf();

    if (oldSprite != sprite) {
      this.isTurning = true;
      this.tickCount = 0;
      oldSprite = sprite;
    }
    if (this.isTurning) {
      var turnSprite;
      oldSprite === sharkLeftSprite ? turnSprite = sharkTurnRightSprite : turnSprite = sharkTurnLeftSprite;
      if (this.turnFrame < 12) {
        this.ctx.drawImage(turnSprite, dinoTurnX[this.turnFrame], 0, dinoTurnX[this.turnFrame + 1] - dinoTurnX[this.turnFrame], 101, 0, 0, dinoTurnX[this.turnFrame + 1] - dinoTurnX[this.turnFrame], 101);
      } else {
        this.ctx.drawImage(turnSprite, dinoTurnX[this.turnFrame], 0, 188, 101, 0, 0, 188, 101);
        this.isTurning = false;
        this.turnFrame = 0;
      }
    } else {
      if (!this.isBiting) {
        if (this.frame < 8) {
          this.ctx.drawImage(sprite, dinoSpriteX[this.frame], 0, dinoSpriteX[this.frame + 1] - dinoSpriteX[this.frame], 101, 0, 0, dinoSpriteX[this.frame + 1] - dinoSpriteX[this.frame], 101);
        } else {
          this.ctx.drawImage(sprite, dinoSpriteX[this.frame], 0, 188, 101, 0, 0, 188, 101);
        }
      } else {
        if (this.oldFrame != this.frame) {
            if (this.dino.score> 1) this.dino.updateScore(-1);
            this.oldFrame = this.frame;
        }

        if (this.frame > 2) this.frame = 0;
        if (this.frame < 2) {
          this.ctx.drawImage(biteSprite, dinoBiteX[this.frame], 0, dinoBiteX[this.frame + 1] - dinoBiteX[this.frame], 101, 0, 0, dinoBiteX[this.frame + 1] - dinoBiteX[this.frame], 101);
        } else {
          this.ctx.drawImage(biteSprite, dinoBiteX[this.frame], 0, 188, 101, 0, 0, 188, 101);
        }
      }
    }
    this.ctx.restore();
  }
}

function generateShark(dino, game, ctx) {
  isShark ? shark.draw() : shark = new Shark(dino, game, ctx);
}

function getAngle(x, y, dino) {
  const dx = x - dino.x;
  const dy = y - dino.y;
  let theta = Math.atan2(dy, dx);
  return theta
}

export { generateShark, shark};
