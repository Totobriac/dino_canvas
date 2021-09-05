const restBack = new Image();
restBack.src = "../assets/restaurant_level/restaurant_sm.png"

export function generateRestBack(ctx) {
  ctx.drawImage(restBack, 0, 0, 600, 200, 0, 0, canvas.width, canvas.height)
}
