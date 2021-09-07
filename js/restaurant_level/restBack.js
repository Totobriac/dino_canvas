const restBack = new Image();
restBack.src = "../assets/restaurant_level/restaurant_no_window.png"

export function generateRestBack(ctx) {
  ctx.drawImage(restBack, 0, 0, 600, 200, 0, 0, canvas.width, canvas.height)
}
