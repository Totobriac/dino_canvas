const cloudSprite = new Image();
cloudSprite.src = "../assets/plane_level/cloud.png"

const cloud = {
  x1: 0,
  x2: cloudSprite.width,
  y: cloudSprite.height,
}

export function generateClouds(ctx, gamespeed) {
  if (cloud.x1 <= -cloud.width + gamespeed) {
    cloud.x1 = cloud.width
  }
  else {
    cloud.x1 -= gamespeed * 0.1
  }
  if (cloud.x2 <= -cloud.width + gamespeed) {
    cloud.x2 = cloud.width
  }
  else {
    cloud.x2 -= gamespeed * 0.1
  }
  ctx.drawImage(cloudSprite, cloud.x1, 0, cloudSprite.width, cloudSprite.height)
  ctx.drawImage(cloudSprite, cloud.x2, 0, cloudSprite.width, cloudSprite.height)  
}
