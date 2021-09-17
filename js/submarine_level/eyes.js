let eyes = [];
let numberOfEyes = 150;
let theta;


export function generateEyes(game, ctx) 
{
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (game.level4Started === false) {
    init(ctx);
    game.level4Started = true;
  }
  for (let i = 0; i < numberOfEyes; i++) {
    eyes[i].draw(game);
  }
}

class Eye {
  constructor(x, y, radius, ctx,game) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }
  draw(game) {
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
      radius: Math.floor(Math.random() * 100) + 5,
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