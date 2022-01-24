var tableSprite = new Image();
tableSprite.src = "../assets/kitchen_level/work_top.png";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

export function generateTable(ctx) {
  ctx.drawImage(tableSprite, 0, 0);
  ctx.drawImage(choppingBoardSprite, 380, 230, 245, 161);

}
