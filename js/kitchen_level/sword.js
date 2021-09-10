const mouse = {
  x: undefined,
  y: undefined
};

// let spots = [];
let spots = { x: mouse.x, y: mouse.y }

let hue = 0;

window.addEventListener('mousemove', function (e) {
  var position = getCursorPosition(canvas, e);
  mouse.x = position.x;
  mouse.y = position.y;
  // for (let i = 0; i < 4; i++) {
  //   spots.push(new Particle());
  // }
  //spots = { x: mouse.x, y: mouse.y };
});

// class Particle {
//   constructor() {
//     this.x = mouse.x;
//     this.y = mouse.y;
//     this.size = Math.random() * 2 + 0.1;
//     this.speedX = Math.random() * 2 - 1;
//     this.speedY = Math.random() * 2 - 1;
//     this.color = 'hsl(' + hue + ',100%, 50%)';
//   }
//   update() {
//     //this.x += this.speedX;
//     //this.y += this.speedY;
//     if (this.size > 0.1) this.size -= 0.08;  //0.03
//   }
//   draw(ctx) {
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }

export function handleParticle(ctx) {
  // if (spots.length > 10)  spots.length = 10;
  // hue ++;
  // for (let i = 0; i < spots.length; i++) {
  //   spots[i].update();
  //   spots[i].draw(ctx);
  //   for (let j = 0; j < spots.length; j++) {
  //     const dx = spots[i].x - spots[j].x;
  //     const dy = spots[i].y - spots[j].y;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
  //     if (distance > 100 && distance < 160) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = spots[i].color;
  //       ctx.lineWidth = spots[i].size / 2;
  //       ctx.moveTo(spots[i].x, spots[i].y);
  //       ctx.lineTo(spots[j].x, spots[j].y);
  //       ctx.stroke();
  //     }
  //   }
  //   if (spots[i].size <= 0.3) {
  //     spots.splice(i, 1);
  //     i--;
  //   }  
  // }
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x: x, y: y }
}

export default spots