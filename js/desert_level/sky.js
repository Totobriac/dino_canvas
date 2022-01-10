let sunX = Math.floor((1.5 * Math.random() - 0.25) * canvas.width);


export function drawSky(ctx, game, dino) {
  var gradient = ctx.createRadialGradient(
    sunX + 1600 - dino.score * 10, canvas.height * 2 + 600 - dino.score * 10, canvas.height * 3 - dino.score * 3,
    sunX + 1600 - dino.score * 10, canvas.height * 2 + 600 - dino.score * 10, 600 - dino.score * 3,
  );

  gradient.addColorStop(0, '#02A');
  gradient.addColorStop(0.2, '#AAF');
  gradient.addColorStop(0.5, '#F8F');
  gradient.addColorStop(0.7, '#F84');
  gradient.addColorStop(0.9, '#FF2');
  gradient.addColorStop(1, '#FFF');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
