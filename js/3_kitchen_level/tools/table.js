var tableSprite = new Image();
tableSprite.src = "./assets/3_kitchen/work_top.png";

var choppingBoardSprite = new Image();
choppingBoardSprite.src = "./assets/3_kitchen/chopping_board.png";

var basketSprite = new Image();
basketSprite.src = "./assets/3_kitchen/metal_basket.png";

var meatPlateSprite = new Image();
meatPlateSprite.src = "./assets/3_kitchen/meat_plate.png";

export function generateTable(ctx) {
  ctx.drawImage(tableSprite, 0, 0);
  ctx.drawImage(choppingBoardSprite, 380, 230, 245, 161);
  ctx.drawImage(basketSprite, -130, 240, 428, 286);
  ctx.drawImage(meatPlateSprite, 245, 270, 100, 100);
}
