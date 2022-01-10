import {
  generateDirt
} from "./dirt.js";

import {
  drawSky
} from "./sky.js";

const mountainSprite = new Image();
mountainSprite.src = "../assets/desert_level/desert_back.png";

const floorSprite = new Image();
floorSprite.src = "../assets/desert_level/floor_sm.png";

var gameFrame = 0;
var layer1;
var layer2;
var layer3;
var layers;

var stars = [];


class Layer {
  constructor(image, y, picY, picS, picH, speedMod, gameSpeed, ctx) {
    this.image = image;
    this.picY = picY;
    this.picH = picH;
    this.picS = picS;
    this.width = image.width;
    this.height = image.height;
    this.gameSpeed = gameSpeed;
    this.speedMod = speedMod;
    this.ctx = ctx;
    this.x = 0;
    this.y = y;
    this.speed = gameSpeed * this.speedMod;
  }
  update(gamespeed) {
    this.gameSpeed = gamespeed;
    this.speed = this.gameSpeed * this.speedMod;
    this.x = gameFrame * this.speed % this.width;
  }
  draw() {
    this.ctx.drawImage(this.image, 0, this.picY, this.width, this.picS, this.x, this.y, this.width, this.picH);
    this.ctx.drawImage(this.image, 0, this.picY, this.width, this.picS, this.x + this.width, this.y, this.width, this.picH);
  }
}

function generateStars() {
  for (var i = 0; i < 100; i++) {
    var starX = Math.random() * canvas.width;
    var starY = Math.random() * canvas.height;
    stars.push({
      x: starX,
      y: starY,
      r: Math.random() + 0.5,
    })
  }
}

function drawStars(ctx) {
  ctx.fillStyle = "white";
  stars.forEach((star, i) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function glow() {
  stars.forEach((star, i) => {
    star.r = Math.random() + 0.5;
  });
}


export function generateBack(ctx, game, dino) {

  if (game.level1Started === false) {
    layer1 = new Layer(mountainSprite, 170, 2, 245, 200, 0.1, game.gamespeed, ctx);
    layer2 = new Layer(mountainSprite, 250, 244, 300, 320, 0.7, game.gamespeed, ctx);
    layer3 = new Layer(floorSprite, 350, 0, 14, 20, 1, game.gamespeed, ctx);

    layers = [layer1, layer2, layer3];

    generateStars();

    game.level1Started = true;
  }

  drawSky(ctx, game, dino);

  if (game.frame % 50 === 0) glow();

  drawStars(ctx);

  layers.forEach(layer => {
    layer.update(game.gamespeed);
    layer.draw();
  })
  gameFrame--;

  generateDirt(250, 300, game.gamespeed, ctx, 19);

}
