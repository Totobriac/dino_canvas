const birdSprite = new Image();
birdSprite.src = "./assets/1_plane/bird.png";

import {dino} from "../../script.js";

const birdArray = [];

const origin = {x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 900;
const stepSize = (end - start)/totalSteps;


class Bird {
  constructor(ctx, game) {
    this.step = 0
    this.y = Math.random() * 300;
    this.ticksPerFrame = 5;
    this.ctx = ctx;
    this.game = game;
    this.frameIndex = 0;
    this.frames = 2;
    this.tickCount = 0;
    this.angle;
  }
  draw (){
    this.angle = start + this.step++ * stepSize;
    this.ctx.translate(origin.x, origin.y);
    this.ctx.rotate(-this.angle);
    this.ctx.translate(radius, 0);
    this.ctx.rotate(Math.PI/2);
    this.ctx.translate(0, 0);
    this.ctx.drawImage(birdSprite, this.frameIndex * 92, 0, 92, 80, 0, -this.y, 46, 40);
    this.ctx.resetTransform();
  }
  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
    this.draw()
  }

}

function checkCollision(dino, bird) {
  if (dino.y > (400 - bird.y) + 20 || dino.y  < (400 - bird.y) - 10) {
    return false;
  }
  else if (bird.angle < 1.95 || bird.angle > 2.05) {
    return false;
  }
  else {
    return true;
  }

}

export function createBirds(ctx, game) {
  if (game.frame % 200 === 0) {
    birdArray.unshift(new Bird(ctx, game));
  }
  for (let i = 0; i < birdArray.length; i++) {
    birdArray[i].update();

    var collide = checkCollision(dino,birdArray[i])

    if (collide === true) game.score -= 14;
  }
  if (birdArray.length > 5) {
    birdArray.pop(birdArray[0])
  }
}
