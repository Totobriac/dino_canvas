var painting = new Image();
painting.src = "../assets/bridge_level/starry_night_no_stars.png";

var bridge = new Image();
bridge.src = "../assets/bridge_level/large_bridge.png";

let particlesArray = [];
const numberOfParticles = 1200;

var frame = 0;

var sourceX = 300;
var sourceY = 200;
var sourceWidth = 600;
var sourceHeight = 200;
var bridgeHeight = 195;

class Particle {
  constructor(ctx) {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 3.5 + 2;
    this.size = Math.random() * 2.5;
    this.ctx = ctx;
  }
  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}


export function generateRain(ctx, game) {

  if (game.level6Started === false) {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(ctx));
    }
    game.level6Started = true;
  }
  if (frame < 500) {
    ctx.drawImage( painting, 300, 200, 600, 200, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, 195, canvas.width, canvas.height);
    frame ++;
  }
  else if (frame >= 500 && frame < 900) {
    ctx.drawImage( painting, sourceX -= 0.75, sourceY -= 0.5 , sourceWidth += 1.5, sourceHeight += 0.5, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, bridgeHeight += 0.16, canvas.width, canvas.height);
    frame++;
  }
  else {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.drawImage( painting, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, 259, canvas.width, canvas.height);
    frame++;
  }
 
  // ctx.globalAlpha = 0.3;
  // ctx.fillStyle = "black";
  // ctx.fillRect(0,0, canvas.width, canvas.height);
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}
