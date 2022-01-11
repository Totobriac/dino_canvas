const birdSprite = new Image();
birdSprite.src = "../assets/plane_level/bird.png";

import {dino} from "../script.js";

const birdArray = [];

const origin = {x: 600, y: 1200 };
const radius = 900;
const start = 0.9272951769;
const end = 2.21429922;

let step = 0;
const totalSteps = 900;
const stepSize = (end - start)/totalSteps;


class Bird {
  constructor(ctx, gamespeed) {
    this.step = 0
    this.y = Math.random() * 300;
    this.ticksPerFrame = 5;
    this.ctx = ctx;
    this.gamespeed = gamespeed;
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
    this.ctx.fillStyle="blue"

    this.ctx.font = '48px serif';
    this.ctx.fillText((400-this.y), 0, -this.y)

    this.ctx.resetTransform();
this.ctx.fillStyle="red"
      this.ctx.fillText((400-this.y), 0, -this.y)
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
  if (dino.y + 60 > bird.y || dino.y < bird.y + 40) {
    return false;
  }
  else if (bird.angle < 1.95 || bird.angle > 2.05) {
    return false;
  }
  else {
    return true;
  }
}

export function createBirds(ctx, gamespeed, frame) {
  if (frame % 200 === 0) {
    birdArray.unshift(new Bird(ctx, gamespeed));
  }
  for (let i = 0; i < birdArray.length; i++) {
    birdArray[i].update();
    //console.log(dino.y)
    var collide = checkCollision(dino,birdArray[i])
    if (collide === true) console.log("goog")
  }
  if (birdArray.length > 5) {
    birdArray.pop(birdArray[0])
  }
}
