import { createCactus } from "./desert_level/cactus.js"
import { generateBack } from "./desert_level/desertBack.js";
import { drawPlane } from "./plane_level/plane.js";
import { animateMonument } from "./plane_level/ground.js";
import { generateClouds } from "./plane_level/clouds.js";
import { createBirds } from "./plane_level/bird.js";
import { generateRestBack } from "./restaurant_level/restBack.js";
import { generatePlates } from "./restaurant_level/plates.js";
import {drawNotePad} from "./restaurant_level/notepad.js";
import { generateFruits } from "./kitchen_level/ninja_fruit.js";
import { handleParticle } from "./kitchen_level/sword.js";
import { generateTable } from "./kitchen_level/cutting_table.js";
import { drawSubmarine } from "./submarine_level/submarine.js";
import { generateBubbles, handleExplosion } from "./submarine_level/bubbles.js";
import { generateEyes } from "./submarine_level/eyes.js";
import { drawDinoDesert } from "./desert_level/desert_dino.js";
import { drawDinoWaiter } from "./restaurant_level/waiter.js";
import { initMaze, maze } from "./dino_stein/raycasting.js";
import { generateRain } from "./bridge_level/nuit_etoilée.js";
import { drawDinoPiano } from "./bridge_level/dino_piano.js";
import { generateBridge } from "./bridge_level/bridge.js";
import { generatePiano } from "./bridge_level/piano.js";
import { generateRoad, drawScenery } from "./race_level/road.js";
import { pointNClick } from "./mansion_level/gameMecanic.js";


export function anim(game, dino, ctx) {
  if (game.isPlaying === true) {
    game.frame++;
    game.score++;
  }
  if (game.level === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBack(ctx, game, dino);
    createCactus(game,dino, ctx);
    drawDinoDesert(ctx, dino, game);
  }
  else if (game.level === 1) {
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlane(ctx, dino);
    animateMonument(ctx);
    createBirds(ctx, game);
    generateClouds(ctx, game);
  }
  else if (game.level === 2) {
    // remove when game is all set//
    game.isPlaying = true;
    // remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateRestBack(ctx, game);
    generatePlates(ctx, game.frame, dino);
    drawDinoWaiter(ctx, dino, game);
    drawNotePad(ctx);
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
  else if (game.level === 5) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initMaze(game, ctx);
    maze(ctx);
  }
  else if (game.level === 6) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // remove when game is all set//
    game.isPlaying = true;
    //remove when game is all set//

    generateRain(ctx, game);
    drawDinoPiano(ctx, dino);
    generateBridge(ctx);
    generatePiano(ctx, game.frame);
  }
  else if(game.level === 7) {
    // remove when game is all set//
    game.isPlaying = true;
    //remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateRoad(game);
    drawScenery(ctx);
  }
  else if(game.level === 8) {
    // remove when game is all set//
    game.isPlaying = true;
    //remove when game is all set//
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pointNClick(ctx, game);
  }
}
