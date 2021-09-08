import { createCactus } from "./desert_level/cactus.js"
import { generateFloor } from "./desert_level/floor.js";
import { generateBigBack, generateSmallBack, generateBinoBack } from "./desert_level/desertBack.js";
import { generateBillb, billbX } from "./desert_level/billboard.js";
import { animateMonument } from "./plane_level/ground.js";
import { generateClouds } from "./plane_level/clouds.js";
import { createParticles } from "./plane_level/particles.js";
import { createBirds } from "./plane_level/bird.js"
import { generateRestBack, generateSea, generateCustomers, generateGuyBrush } from "./restaurant_level/restBack.js";
import { generatePlates } from "./restaurant_level/plates.js";
import { createtray } from "./restaurant_level/tray.js";

export function anim(game, dino, ctx) {
  if (game.isPlaying === true) {
    game.gamespeed = 4;
    game.frame++;
  }
  if (game.level === 0 && game.bino === false )  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBigBack(ctx, game.gamespeed);
    generateBillb(ctx, game.gamespeed, 87, 78, false)
    generateSmallBack(ctx, game.gamespeed);
    generateFloor(ctx, game.gamespeed);
    createCactus(game.frame, game.gamespeed, ctx);
    dino.update(ctx);
    dino.draw(ctx, game.isPlaying);
  }
  else if (game.level === 0 && game.bino === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBinoBack(ctx, billbX);
    generateBillb(ctx, 0, 524, 418, true);
  }
  else if (game.level === 1) {
    // remove when game is all set//
    //game.isPlaying = true;
    // remove when game is all set//
    dino.angle += 0.2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.updatePlane(ctx);
    dino.drawPlane(ctx);
    createParticles(dino.planeX, dino.planeY, game.gamespeed, ctx);
    animateMonument(ctx);
    createBirds(ctx, game.gamespeed, game.frame);
    generateClouds(ctx, game.gamespeed);
  }
  else if (game.level === 2) {    
    // remove when game is all set//
    //game.isPlaying = true;
    // remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateSea(ctx);
    generateGuyBrush(ctx, game.gamespeed, game.frame);
    generateRestBack(ctx);
    generateCustomers(ctx);
    generatePlates(ctx, game.frame, dino);
    dino.update(ctx);
    dino.draw(ctx, game.isPlaying);
    createtray(ctx, dino);
  }
}