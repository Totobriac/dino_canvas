import {dx, dy} from "./submarine.js";

var eyes = [];
var numberOfEyes = 150;
var theta;

var backX = 100;
var backY = 50;

var frontX = 100;
var frontY = 50;

var forgroundSprite = new Image();
forgroundSprite.src = "./assets/4_submarine/forground_2.png";

var backgroundSprite = new Image();
backgroundSprite.src = "./assets/4_submarine/background_2.png";

export function generateEyes(game, ctx)
{ var Dx = Math.floor(dx);
  var Dy = Math.floor(dy);

  backX += Dx / 500;
  backY += Dy / 500;

  ctx.drawImage(backgroundSprite, backX, backY, 1200, 400, 0, 0, 1200, 400);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (game.loadedLevel[4] === false) {
    init(ctx);
    game.loadedLevel[4] = true;
  }
  for (let i = 0; i < numberOfEyes; i++) {
    eyes[i].draw(game, Dx, Dy);
  }

  frontX += Dx / 800;
  frontY += Dy / 800;

  ctx.drawImage(forgroundSprite, frontX, frontY, 1200, 400, 0, 0, 1200, 400);

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "blue";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.restore();

}

class Eye {
  constructor(x, y, radius, ctx,game) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }
  draw(game, Dx, Dy) {
    //eye bulb
    
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
    //iris
    let dx = game.mouseMovePosition.x - this.x;
    let dy = game.mouseMovePosition.y - this.y;
    theta = Math.atan2(dy, dx);

    let iris_x = this.x + Math.cos(theta) * this.radius/10;
    let iris_y = this.y + Math.sin(theta) * this.radius/10;
    let irisRadius = this.radius / 1.2;
    this.ctx.beginPath();
    this.ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();

    //pupill
    let pupil_x = this.x + Math.cos(theta) * this.radius/1.9;
    let pupil_y = this.y + Math.sin(theta) * this.radius/1.9;
    let pupilRadius = this.radius / 2.5;
    this.ctx.beginPath();
    this.ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();

    //reflectin
    this.ctx.beginPath();
    this.ctx.arc(pupil_x - pupilRadius/3, pupil_y- pupilRadius/3, pupilRadius/2, 0, Math.PI*2, true);
    this.ctx.fillStyle="rgba(255,255,255,0.1";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
function init(ctx) {
  let protection = 10000;
  let overlapping = false;
  let counter = 0;

  while (eyes.length < numberOfEyes && counter < protection) {
    let eye = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.floor(Math.random() * 70) + 5,
    };
    overlapping = false;
    for (let i = 0; i < eyes.length; i++) {
      let previousEye = eyes[i];
      let dx = eye.x - previousEye.x;
      let dy = eye.y - previousEye.y;
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < (eye.radius + previousEye.radius)) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      eyes.push(new Eye(eye.x, eye.y, eye.radius, ctx))
    }
  }
}
