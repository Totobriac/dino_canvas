const billbSprite = new Image();
billbSprite.src = "../assets/billboard.png";

const smBillb = {
  x: 1200,
  y: 240
}

export var billbX = 1200

const lgBillb = {
  x: 338,
  y: 100
}

export function generateBillb(ctx, gamespeed, width, height, isBino) {
  if (isBino === false) {
    billbX = smBillb.x -= gamespeed * 0.2
    ctx.drawImage(billbSprite, billbX, smBillb.y, width, height)
  }
  else {
    ctx.drawImage(billbSprite, lgBillb.x, lgBillb.y, width, height)
  }
}