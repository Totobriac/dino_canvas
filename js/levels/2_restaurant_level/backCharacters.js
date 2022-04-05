import {
  top,
  left
} from "../../script.js";

var guybrushSprite = new Image();
guybrushSprite.src = "./assets/2_restaurant/guy.png";

var batmanSprite = new Image();
batmanSprite.src = "./assets/2_restaurant/MJ/moon_walk.png";

var turnSprite = new Image();
turnSprite.src = "./assets/2_restaurant/MJ/dance_left.png";

let passerbyArray = [];
var isMikiKaKo = false;

var mikiKako;

class Character {
  constructor(ctx, game, sprite, x, y, direction, frames, speed, width, height, coef) {
    this.x = x;
    this.sprite = sprite;
    this.y = y + top;
    this.direction = direction;
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.frameIndex = 0;
    this.ticksPerFrame = 12;
    this.tickCount = 0;
    this.ctx = ctx;
    this.speed = speed;
    this.gamespeed = game.gamespeed;
    this.coef = coef;
  }
  updateChar() {
    this.tickCount += 1;
    this.x += this.gamespeed * this.speed * this.direction;
    this.drawChar();
  }
  drawChar() {
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.ctx.drawImage(this.sprite, this.width * this.frameIndex, 0, this.width, this.height, this.x, this.y, this.width * this.coef, this.height * this.coef);
  }
}

// function generateChar(ctx, game) {
//   if (game.frame % 1300 === 0) {
//     //passerbyArray.unshift(new Character(ctx, game, guybrushSprite, 140, 6, 0.2, 110, 150, 0.7));
//     passerbyArray.unshift(new Character(ctx, game, batmanSprite, 140, 7, 0.1, 40, 87, 1.8));
//
//   }
//   for (let i = 0; i < passerbyArray.length; i++) {
//     passerbyArray[i].updateChar();
//   }
//   if (passerbyArray.length > 2) {
//     passerbyArray.pop(passerbyArray[0])
//   }
// }
//constructor(ctx, game, sprite, x,y, direction,frames, speed, width, height, coef) {
function generateChar(ctx, game, dino) {

  if (dino.state === "isChanged" && !isMikiKaKo) {
    mikiKako = new Character(ctx, game, batmanSprite, 1200 + left, 140, -1, 7, 0.1, 40, 67, 2);
    isMikiKaKo = true;
  }
  if (isMikiKaKo){
    mikiKako.updateChar();
    if (mikiKako.x < 600 + left) {
      mikiKako = new Character(ctx, game, turnSprite, 600 + left, 140, 0, 15, 0.1, 50, 67, 2);
    }
  }
}

export {
  generateChar
};
