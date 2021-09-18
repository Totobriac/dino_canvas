import { createCactus } from "./desert_level/cactus.js"
import { generateFloor } from "./desert_level/floor.js";
import { generateBigBack, generateSmallBack, generateBinoBack } from "./desert_level/desertBack.js";
import { generateBillb, billbX } from "./desert_level/billboard.js";
import { drawPlane } from "./plane_level/plane.js";
import { animateMonument } from "./plane_level/ground.js";
import { generateClouds } from "./plane_level/clouds.js";
import { createParticles } from "./plane_level/particles.js";
import { createBirds } from "./plane_level/bird.js";
import { generateRestBack, generateSea, generateCustomers, generateGuyBrush } from "./restaurant_level/restBack.js";
import { generatePlates } from "./restaurant_level/plates.js";
import { generateFruits } from "./kitchen_level/ninja_fruit.js";
import { handleParticle } from "./kitchen_level/sword.js";
import { generateTable } from "./kitchen_level/cutting_table.js";
import { drawSubmarine } from "./submarine_level/submarine.js";
import { generateBubbles, handleExplosion } from "./submarine_level/bubbles.js";
import { generateEyes } from "./submarine_level/eyes.js";
import { drawDinoDesert } from "./desert_level/desert_dino.js";
import { drawDinoWaiter } from "./restaurant_level/waiter.js";


export function anim(game, dino, ctx) {
  if (game.isPlaying === true) {
    game.gamespeed = 4;
    game.frame++;
  }
  if (game.level === 0 && game.bino === false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBigBack(ctx, game.gamespeed);
    generateBillb(ctx, game.gamespeed, 87, 78, false)
    generateSmallBack(ctx, game.gamespeed);
    generateFloor(ctx, game.gamespeed);
    createCactus(game.frame, game.gamespeed, ctx);
    dino.update(ctx);
    drawDinoDesert(ctx, dino, game);
  }
  else if (game.level === 0 && game.bino === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBinoBack(ctx, billbX);
    generateBillb(ctx, 0, 524, 418, true);
  }
  else if (game.level === 1) {
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlane(ctx, dino);
    createParticles(dino.planeX, dino.planeY, game.gamespeed, ctx);
    animateMonument(ctx);
    createBirds(ctx, game.gamespeed, game.frame);
    generateClouds(ctx, game.gamespeed);
  }
  else if (game.level === 2) {
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateSea(ctx);
    generateGuyBrush(ctx, game.gamespeed, game.frame);
    generateRestBack(ctx);
    generateCustomers(ctx);
    generatePlates(ctx, game.frame, dino);
    drawDinoWaiter(ctx, dino, game);
  }
  else if (game.level === 3) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    generateTable(ctx);
    generateFruits(ctx, game.frame);
    handleParticle(ctx, game.mousePosition);
  }
  else if (game.level === 4) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    generateEyes(game, ctx);
    drawSubmarine(ctx, dino, game.mousePosition);
    generateBubbles(ctx, game.frame, dino);
    handleExplosion();
  }
}