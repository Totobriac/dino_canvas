import { trash } from "./outside_sprite.js";

var flies = [];


class Fly {
  constructor(ctx, trash) {
    this.x = 0;
    this.y = 0;
    this.radius = 1.2;
    this.offset = Math.floor(Math.random() * 10);
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
    this.rotation = this.offset * 30;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = "black";
    this.ctx = ctx;
    this.angle = 0; 
    this.radiusX = 15 + this.offset;
    this.radiusY = 5 + this.offset;    
    this.speed = Math.random() * 3 / 10 * this.plusOrMinus;
  }
  draw() {
    this.update();

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scaleX, this.scaleY);

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();    
  }
  update() {
    this.centerX = trash.x + trash.spriteWidth / 2 + this.offset * 3 * this.plusOrMinus;
    this.centerY = trash.y + 10 + this.offset * 2 * this.plusOrMinus2;
    this.x = this.centerX + Math.sin(this.angle) * this.radiusX;
    this.y = this.centerY + Math.cos(this.angle) * this.radiusY;
    this.angle += this.speed;
  }
}


export function drawFlies(ctx) {
  if (flies.length === 0) {
    for (let i = 0; i < 16 ; i++) {
      flies.push(new Fly(ctx, trash))
    }    
  }
  for (let i = 0; i < flies.length ; i++) {
    flies[i].draw();
  }
}