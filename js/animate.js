import { createCactus } from "./desert_level/cactus.js"
import { generateFloor } from "./desert_level/floor.js";
import { generateBigBack, generateSmallBack, generateBinoBack } from "./desert_level/desertBack.js";
import { generateBillb, billbX } from "./desert_level/billboard.js";

export function anim(game, dino, ctx) {
    if (game.bino === false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        generateBigBack(ctx, game.gamespeed);
        generateBillb(ctx, game.gamespeed, 87, 78, false)
        generateSmallBack(ctx, game.gamespeed);
        generateFloor(ctx, game.gamespeed);
        createCactus(game.frame, game.gamespeed, ctx);
        dino.update(ctx);
        dino.draw(ctx, game.isPlaying);
        game.frame++;        
    }
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);    
      generateBinoBack(ctx, billbX)
      generateBillb(ctx, 0, 524, 418, true)      
    }
}