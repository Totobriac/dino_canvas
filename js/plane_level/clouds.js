import {drawProgBar} from "./progress_bar.js";

const cloudSprite = new Image();
cloudSprite.src = "./assets/plane_level/cloud.png"

const cloud = {
  x1: 0,
  x2: cloudSprite.width,
  y: cloudSprite.height,
}

export function generateClouds(ctx, game) {
  if (cloud.x1 <= -cloudSprite.width + game.gamespeed) {
    cloud.x1 = cloudSprite.width;
  }
  else {
    cloud.x1 -= game.gamespeed * 0.1;
  }
  if (cloud.x2 <= -cloudSprite.width + game.gamespeed) {
    cloud.x2 = cloudSprite.width;
  }
  else {
    cloud.x2 -= game.gamespeed * 0.1;
  }
  ctx.drawImage(cloudSprite, cloud.x1, 0, cloudSprite.width, cloudSprite.height);
  ctx.drawImage(cloudSprite, cloud.x2, 0, cloudSprite.width, cloudSprite.height);

  drawProgBar(ctx, game.score);
}
