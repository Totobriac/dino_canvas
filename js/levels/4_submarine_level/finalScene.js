import { sound } from "../../sound.js";

var cataSound = new sound("./assets/4_submarine/catacomb.mp3");

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

var ramp = new Image();
ramp.src = "./assets/4_submarine/ramp.png";

var exitEntrance = new Image();
exitEntrance.src = "./assets/4_submarine/exitEntrance.png";

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
var eyes = [];
var eyesTick = 0;
var vol = 1;
var scene = 1;

var mask = {
  x: 0,
  y: 0,
}

class ExitingDino {
  constructor(sprite, ctx, exitingSub) {
    this.sprite = sprite;
    this.ctx = ctx;
    this.maxTicount = 12;
    this.tickount = 0;
    this.dinoFrame = 1;
    this.sub = exitingSub;
    this.x;
    this.y;
    this.path = 0;
    this.width = 27;
    this.height = 30;
  }
  draw() {
    this.update();
    this.ctx.drawImage(this.sprite, 90 * this.dinoFrame, 0, 90, 99, this.x, this.y, this.width, this.height);
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
        if (this.y > 132) this.y -= 0.5;
        if (this.x > 196) this.x -= 0.5;
      } else {
        if (curtain1.isOpen) {
          closeCurtain();
        } else {
          this.x = 580;
          this.y = 350;
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
        this.path = 1;
      }

      if (this.path === 1) {
        if (this.x < 730 || this.y > 52) {
          this.sprite = dino2;
          if (this.x < 730) this.x += 0.26, mask.x += 0.26;
          if (this.y > 52) this.y -= 0.3, mask.y -= 0.3;
        } else {
          if (curtain1.isOpen) {
            closeCurtain();
          } else {
            this.width = 67;
            this.height = 75;
            this.x = 190;
            this.y = 280;
            switchScene(3);
            this.path = 0;
          }
        }
      }
    }
    else if (scene === 3) {
      if (this.path != 3) this.tickount++;

      if (this.path === 0 && this.x < 613) {
        this.sprite = dino2;
        if (this.x < 613) this.x += 1;
        if (this.y < 300) this.y += 0.05;
      } else {
        this.path = 1;
      }

      if (this.path === 1) {
        if (this.x < 187 || this.y > 224) {
          if (this.x < 837) this.x += 1;
          if (this.y > 224) this.y -= 0.33;
        } else {
          this.path = 2;
        }
      }

      if (this.path === 2) {
        this.sprite = dino;
        if (this.x > 738 || this.y > 140) {
          if (this.x > 738) this.x -= 0.375;
          if (this.y > 140) this.y -= 0.345;
        } else {
          this.path = 3;
          vol > 0.02 ? vol -= 0.02 : cataSound.stop();
          if (curtain1.isOpen) {
            closeCurtain();
          } else {
            switchScene(4);
          }          
        }
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
  x: 0,
  y: 0,
  height: 400,
  width: 600,
  isOpen: false,
}

var curtain2 = {
  x: 600,
  y: 0,
  height: 400,
  width: 600,
  isOpen: false,
}

function closeCurtain() {
  curtain1.x < 0 ? curtain1.x += 2 : curtain1.isOpen = false;
  curtain2.x > 600 ? curtain2.x -= 2 : curtain2.isOpen = false;
}

function openCurtain() {  
  curtain1.x > -402 ? curtain1.x -= 2 : curtain1.isOpen = true;
  curtain2.x < 1002 ? curtain2.x += 2 : curtain2.isOpen = true;
}

function finalOpening() {
  curtain1.x > -600 ? curtain1.x -= 2 : curtain1.isOpen = true;
  curtain2.x < 1200 ? curtain2.x += 2 : curtain2.isOpen = true;
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
    this.ctx.fillRect(198 + this.x, this.y, this.size, this.size);
    this.ctx.fillRect(198 + this.x + 5, this.y, this.size, this.size);
  }
}



function drawEyes(ctx) {
  eyesTick++;
  if (eyesTick % 60 === 0) {
    eyes.push(new Eyes(ctx));
  }
  if (eyes.length > 6) eyes.splice(0, 1);
  ctx.save();
  ctx.fillStyle = "red";
  eyes.forEach(eye => {
    eye.draw();
  });
  ctx.restore();
}

function drawFinalScene(ctx, game) {

  cataSound.volume(vol);
  cataSound.play();

  if (!exitingSub) exitingSub = new ExitingSub(940, 260, subRight, ctx);
  if (!exitingDino) exitingDino = new ExitingDino(dino, ctx, exitingSub);

  if (scene === 1) {
   
    if (!curtain1.isOpen) openCurtain();
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
  } else if (scene === 3) {
    if (!curtain1.isOpen) openCurtain();
    ctx.drawImage(exit, 198, 0);
    exitingDino.draw();
    ctx.drawImage(exitEntrance, 198, 0);
    ctx.drawImage(ramp, 198, 0);
  } else if (scene === 4) {
    !curtain1.isOpen ? finalOpening() : game.switchLevel(5);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1200, 400);
    cataSound.stop()
  }
  ctx.fillStyle = "black";
  ctx.fillRect(curtain1.x, curtain1.y, curtain1.width, curtain1.height);
  ctx.fillRect(curtain2.x, curtain2.y, curtain2.width, curtain2.height);
}

export { drawFinalScene };
