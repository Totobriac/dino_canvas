var entrance = new Image();
entrance.src = "./assets/4_submarine/indy_entrance.png";

var rock = new Image();
rock.src = "./assets/4_submarine/rock.png";

var waterBottom = new Image();
waterBottom.src = "./assets/4_submarine/waterOverlay.png";

var waterTop = new Image();
waterTop.src = "./assets/4_submarine/waterTop.png";

var exit = new Image();
exit.src = "./assets/4_submarine/indy_exit.png";

var maze = new Image();
maze.src = "./assets/4_submarine/maze.png";

var topMaze = new Image();
topMaze.src = "./assets/4_submarine/topMaze.png";

var subRight = new Image();
subRight.src = "./assets/4_submarine/empty_submarine.png";

var subJet = new Image();
subJet.src = "./assets/4_submarine/bubble_jet.png";

var dino = new Image();
dino.src = "./assets/dino/dino_walk_left.png";

var dino2 = new Image();
dino2.src = "./assets/dino/dino_walk.png";

var maskSprite = new Image();
maskSprite.src = "./assets/4_submarine/mask.png";

var exitingSub;
var exitingDino;

var mask = {
  x: 0,
  y: 0,
}

var scene = 2;

class ExitingDino {
  constructor(sprite, ctx, exitingSub) {
    this.sprite = sprite;
    this.ctx = ctx;
    this.maxTicount = 12;
    this.tickount = 0;
    this.dinoFrame = 1;
    this.sub = exitingSub;
    this.x = 580;
    this.y = 350;
    this.path = 0;
  }
  draw() {
    this.update();
    this.ctx.drawImage(this.sprite, 90 * this.dinoFrame, 0, 90, 99, this.x, this.y, 27, 30);
  }
  update() {
    if (this.tickount > this.maxTicount) {
      this.dinoFrame === 1 && !this.engine ? this.dinoFrame = 0 : this.dinoFrame = 1;
      this.tickount = 0;
    }
    if (scene === 1) {
      if (!this.sub.engine) this.tickount++;

      if (this.sub.engine) {
        this.x = this.sub.x + 12;
        this.y = this.sub.y + 35;
      } else if (this.y > 132 || this.x > 196) {
        if (this.y > 132) this.y -= 5;
        if (this.x > 196) this.x -= 5;
      } else {
        if (curtain1.isOpen) {
          closeCurtain();
        } else {
          this.x = 585;
          this.y = 390;
          switchScene(2);
        }
      }
    }
    else if (scene === 2) {
      this.tickount++;

      if (this.path === 0 && this.x > 516 || this.y > 277) {
        if (this.x > 516) this.x -= 0.33, mask.x -= 0.33;
        if (this.y > 277) this.y -= 0.3, mask.y -= 0.3;
      } else {
        this.path = 1
      }

      if (this.path === 1) {
        this.sprite = dino2;
        if (this.x < 715) this.x += 0.26, mask.x += 0.26;
        if (this.y > 52) this.y -= 0.3, mask.y -= 0.3;
      }
    }
  }
}

class ExitingSub {
  constructor(x, y, sprite, ctx) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.ctx = ctx;
    this.coef = 0.8;
    this.maxTicount = 12;
    this.tickount = 0;
    this.bubbFrame = 0;
    this.engine = true;
  }
  draw() {
    this.update();
    if (this.engine) {
      this.ctx.drawImage(subJet, this.bubbFrame * 108, 0, 108, 108, this.x + 82, this.y + 40, 40, 40);
    }
    this.ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width * this.coef, this.sprite.height * this.coef);
  }
  update() {
    if (this.tickount > this.maxTicount) {
      this.bubbFrame > 6 ? this.bubbFrame = 0 : this.bubbFrame++;
      this.tickount = 0;
    }
    this.tickount++;
    if (this.x > 760) this.x -= 0.8;
    else if (this.x > 290) {
      this.x -= 0.8;
      if (this.y > 135) this.y -= 0.3;
    } else {
      this.engine = false;
    }
  }
}

var curtain1 = {
  x: -402,
  y: 0,
  height: 400,
  width: 600,
  isOpen: true,
}

var curtain2 = {
  x: 1002,
  y: 0,
  height: 400,
  width: 600,
  isOpen: false,
}

function closeCurtain() {
  curtain1.x < 0 ? curtain1.x += 1 : curtain1.isOpen = false;
  curtain2.x > 600 ? curtain2.x -= 1 : curtain2.isOpen = false;
}

function openCurtain() {
  curtain1.x > -198 ? curtain1.x -= 1 : curtain1.isOpen = true;
  curtain2.x < 1002 ? curtain2.x += 1 : curtain2.isOpen = true;
}

function switchScene(n) {
  scene = n;
}

class Eyes {
  constructor(ctx) {
    this.x = Math.floor(Math.random() * 227) + Math.floor(Math.random() * 2) * 577;
    this.y = Math.floor(Math.random() * 400);
    this.side = Math.floor(Math.random() * 2);
    this.size = Math.floor(Math.random() * 2) + 2;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillRect(198 + this.x , this.y, this.size, this.size);
    this.ctx.fillRect(198 + this.x + 5 , this.y, this.size, this.size);
  }
}

var eyes = [];
var eyesTick = 0;

function drawEyes(ctx) {

  eyesTick ++;

  if (eyesTick % 60 === 0) {
    eyes.push(new Eyes(ctx));
  }
  
  if (eyes.length > 6) eyes.splice(0,1);

  ctx.save();
  ctx.fillStyle = "red";
  eyes.forEach(eye => {
    eye.draw();
  });
  ctx.restore();
}

function drawFinalScene(ctx) {

  if (!exitingSub) exitingSub = new ExitingSub(920, 260, subRight, ctx);
  if (!exitingDino) exitingDino = new ExitingDino(dino, ctx, exitingSub);


  if (scene === 1) {

    ctx.drawImage(entrance, 198, 0);

    exitingDino.draw();
    exitingSub.draw();

    ctx.drawImage(rock, 198, 0);
    ctx.drawImage(waterBottom, 198, 0);
    ctx.drawImage(waterTop, 198, 0);

  } else if (scene === 2) {

    if (!curtain1.isOpen) openCurtain();

    ctx.drawImage(maze, 0, 0);
    exitingDino.draw();
    ctx.drawImage(topMaze, 0, 0);
    ctx.drawImage(maskSprite, mask.x, mask.y);   

    drawEyes(ctx);
  }

  ctx.fillRect(curtain1.x, curtain1.y, curtain1.width, curtain1.height);
  ctx.fillRect(curtain2.x, curtain2.y, curtain2.width, curtain2.height);


}

export { drawFinalScene };
