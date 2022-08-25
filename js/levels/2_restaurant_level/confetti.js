import { winWidth, winHeight } from "./startLevel2.js";

var colors = [
  { front : '#CCFFCC', back: '#00CC00'},
  { front : '#FF9999', back: '#CC0000'},
  { front : '#FFFF99', back: '#FFCC00'},
  { front : '#66FFCC', back: '#00CCCC'},
  { front : '#99FFFF', back: '#00FFFF'},
  { front : '#9900CC', back: '#663399'},
  { front : '#660066', back: '#990066'},
  { front : '#FF99FF', back: '#FF00FF'},
];

var confettis = [];

var gravity = 0.5;
var terminalVelocity = 5;
var drag = 0.075;


class Confetti {
  constructor(ctx) {
    this.width = 12;
    this.height = 16;
    this.x = Math.floor(Math.random() * winWidth);
    this.y = winHeight - 1;
    this.color = colors[Math.floor(Math.random()* colors.length)];
    this.angle = Math.floor(Math.random() * 360);
    this.xSpeed = -25 + Math.floor(Math.random() * 50);
    this.ySpeed = - Math.floor(Math.random() * 50);
    this.ctx = ctx;
  }
  draw() {
    this.ctx.save();

    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle * Math.PI / 180);

    this.xSpeed -= this.xSpeed * drag;
    this.ySpeed = Math.min(this.ySpeed + gravity, terminalVelocity);
    this.xSpeed += Math.random() > 0.5 ? Math.random() : -Math.random();

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > winWidth) this.x = 0;
    if (this.x < 0) this.x = winWidth;

    var side = Math.cos(this.y * 0.1);
    var color;
    this.ctx.fillStyle = side > 0 ? color = this.color.front : color = this.color.back;

    this.ctx.fillStyle = color;

    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
}

function generateConfettis(ctx) {
  for (let i = 0; i < 700; i++) {
    confettis.push(new Confetti(ctx))
  }
}

function celebrate() {
  confettis.forEach((confetti,i) => {
    confetti.draw(i);
    if (confetti.y > winHeight) confettis.splice(i, 1);
    i --;
  });
}

export { generateConfettis, celebrate };
