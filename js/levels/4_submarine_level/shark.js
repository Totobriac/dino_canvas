var sharkRightSprite = new Image();
sharkRightSprite.src = "./assets/4_submarine/shark_right.png";

var sharkLeftSprite = new Image();
sharkLeftSprite.src = "./assets/4_submarine/shark_left.png";

var dx = 0;
var dy = 0;

var isShark = false;
var shark = undefined;

var dinoSpriteX = [0, 188, 380, 578, 772, 962, 1152, 1346, 1544, 1736];
var dinoTurnX = [0, 198, 378, 540, 690, 814, 910, 992, 1074, 1172, 1291, 1436, 1616];

class Shark {
  constructor(dino, ctx) {
    this.x = 100;
    this.y = 100;
    this.dino = dino;
    this.ctx = ctx;
    this.angle = 0;
    isShark = true;
    this.tickCount = 0;
    this.maxTickount = 12;
    this.frame = 0;
    this.maxFrame = 9;
  }
  update() {
    dx = this.x - this.dino.x;
    dy = this.y - this.dino.y;
    if (this.x != this.dino.x) {
      this.x -= dx / 70;
    }
    if (this.y != this.dino.y) {
      this.y -= dy / 70;
    }
    if (this.tickCount > this.maxTickount) {
      this.frame >= this.maxFrame ? this.frame = 0 : this.frame ++;
      this.tickCount = 0;
    } else {
      this.tickCount ++;
    }
  }
  draw() {
    this.update();
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.angle = getAngle(this.x, this.y, this.dino)
    this.ctx.rotate(this.angle);
    if (this.x >= this.dino.x) {
      var sprite = sharkLeftSprite;
    } else {
      var sprite = sharkRightSprite;
    }
    if (this.frame < 8) {
      this.ctx.drawImage(sprite, dinoSpriteX[this.frame],0, dinoSpriteX[this.frame + 1] - dinoSpriteX[this.frame],101, 0, 0,dinoSpriteX[this.frame + 1] - dinoSpriteX[this.frame],101);
    } else {
      this.ctx.drawImage(sprite, dinoSpriteX[this.frame],0, 188 ,101, 0, 0,188,101);
    }

    this.ctx.restore();
  }
}

function generateShark(dino, ctx) {
  isShark ? shark.draw() : shark = new Shark(dino, ctx);
}

function getAngle(x, y, dino) {
  const dx = x - dino.x;
  const dy = y - dino.y;
  let theta = Math.atan2(dy, dx);
  return theta
}

export { generateShark };



// export function drawShark(ctx, dino) {
//   update(dino, game);
//   ctx.save();
//   ctx.translate(dino.x, dino.y);
//   dino.angle = getAngle(dino.x, dino.y, mousePosition)
//   ctx.rotate(dino.angle);
//   if (dino.x >= mousePosition.x) {
//     ctx.drawImage(subLeft, 0 - 40, 0 - 45, 71, 80);
//     ctx.drawImage(subJet, dino.frameIndex * 108, 0, 108, 108, 30, -29, 40, 40);
//   } else {
//     ctx.drawImage(subRight, -40, -35, 71, 80);
//     ctx.drawImage(subJetRight, dino.frameIndex * 108, 0, 108, 108, 34, -28, 40, 40);
//   }
//   ctx.restore();
// }
//
// function update(dino, game) {
//   dino.tickCount += 1;
//   dino.mouseX = game.mousePosition.x;
//   dino.mouseY = game.mousePosition.y;
//   dx = dino.x - dino.mouseX;
//   dy = dino.y - dino.mouseY;
//   if (game.mousePosition.x != dino.x) {
//     dino.x -= dx / 20;
//   }
//   if (game.mousePosition.y != dino.y) {
//     dino.y -= dy / 20;
//   }
//   dino.checkFrame(8);
// };
//
