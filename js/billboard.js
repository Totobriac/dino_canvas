const billbSprite = new Image();
billbSprite.src = "../assets/billboard.png";

const smBillb = {
  x: 1200,
  y: 240
}

const lgBillb = {
  x: 338,
  y: 100
}

export function generateBillb(ctx, gamespeed, width, height, isBino) {
  isBino === false
    ? ctx.drawImage(billbSprite, (smBillb.x -= gamespeed * 0.2), smBillb.y, width, height)
    : ctx.drawImage(billbSprite, lgBillb.x, lgBillb.y, width, height)
}