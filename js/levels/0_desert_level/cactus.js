var cactusSprite = new Image();
cactusSprite.src = "./assets/0_desert/cactus.png";

var planeSprite = new Image();
planeSprite.src = "./assets/0_desert/plane.png";

var cactusArray = [];
var planeOffset = 0;

var dieSound = new Audio();
dieSound.src = "./assets/sounds/die.wav";

class Cactus {
  constructor(gamespeed, ctx) {
    this.x = canvas.width;
    this.width = 80;
    this.height = 80;
    this.y = 290;
    this.gamespeed = gamespeed;
    this.ctx = ctx;
    this.frameIndex = Math.floor(Math.random() * 3);
  }
  draw() {
    this.ctx.drawImage(cactusSprite, this.frameIndex * 103, 0, 103, 102, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= this.gamespeed * 2.5;
    this.draw();
  }
}

export function createCactus(game, dino, ctx) {

  if (dino.score > 120 && planeOffset < 950) planeOffset += game.gamespeed * 2.5;
  ctx.drawImage(planeSprite, 1400 - planeOffset, 248, 210, 125);

  if (game.frame % 300 === 0 || game.frame % 110 === 0) {
    cactusArray.unshift(new Cactus(game.gamespeed, ctx));
  }
  for (let i = 0; i < cactusArray.length; i++) {
    if (game.start && dino.score < 115) cactusArray[i].update();
    var collision = dino.checkCollision(66, 70, cactusArray[i].x + 20, cactusArray[i].y + 15, 40, cactusArray[i].height);
    if (collision === true) {
      dieSound.play();
      dino.score -= 0.3;
      dino.isHit = true;
      setTimeout(() => dino.isHit = false, 820)
    }
  }

  if (cactusArray.length > 3) {
    cactusArray.pop(cactusArray[0])
  }
}
