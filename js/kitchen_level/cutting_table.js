var tableSprite = new Image();
tableSprite.src = "../assets/kitchen_level/cutting_board_trimmed-min.png"

export function generateTable(ctx) {
  ctx.drawImage(tableSprite, 0, 0)
}