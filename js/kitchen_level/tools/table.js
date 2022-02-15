var tableSprite = new Image();
tableSprite.src = "../assets/kitchen_level/work_top.png";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "../assets/kitchen_level/chopping_board.png";

var basketSprite = new Image();
basketSprite.src = "../assets/kitchen_level/metal_basket.png";

var meatPlateSprite = new Image();
meatPlateSprite.src = "../assets/kitchen_level/meat_plate.png";

export function generateTable(ctx) {
  ctx.drawImage(tableSprite, 0, 0);
  ctx.drawImage(choppingBoardSprite, 380, 230, 245, 161);
  ctx.drawImage(basketSprite, -130, 240, 428, 286);
  ctx.drawImage(meatPlateSprite, 245, 270, 100, 100);
}
