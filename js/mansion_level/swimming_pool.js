// var smPuddle = new Sprite("flaquette", smPuddleSprite, 800, 380, 1, 1, 238, 86, 0.7);
// var mdPuddle = new Sprite("flaque", smPuddleSprite, 112, 370, 1, 1, 238, 86, 0.8);

// var puddles = [{ "puddle": smPuddle, "collide": false }, { "puddle": mdPuddle, "collide": false }];

// var hasReflection = false;


// var currentPuddle = {
//   "x": 0,
//   "width": 0,
//   "xw": 0,
//   "offset": 0,
// }


// function checkReflection() {
//   for (let i = 0; i < puddles.length; i++) {
//     puddles[i].collide = puddles[i].puddle.checkCollision(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4,
//       dino.spriteWidth * dino.scale, dino.spriteWidth / 2 * dino.scale);
//     if (puddles[i].collide === true) {
//       currentPuddle.x = puddles[i].puddle.x;
//       currentPuddle.width = puddles[i].puddle.spriteWidth * puddles[i].puddle.scale;
//       currentPuddle.xw = currentPuddle.x + currentPuddle.width;
//     }
//     if (puddles[i].collide === true && dino.x > puddles[i].puddle.x) {
//       offset = puddles[i].puddle.x + (puddles[i].puddle.spriteWidth * puddles[i].puddle.scale) - dino.x;
//     }
//     if (puddles[i].collide === true && dino.x < puddles[i].puddle.x) {
//       offset = puddles[i].puddle.x - dino.x;
//     }

//   }
//   puddles[0].collide == true || puddles[1].collide == true
//     ? hasReflection = true
//     : hasReflection = false;
// }

// if (currentPuddle.x == dino.x + (dino.spriteWidth * dino.scale)) {
//   ctx.fillRect(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4, dino.spriteWidth * dino.scale, 30);
// }
// if (hasReflection == false) {
//   ctx.fillRect(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4, dino.spriteWidth * dino.scale, 30);
// }
// if ((dino.x < currentPuddle.xw && dino.x + dino.spriteWidth * dino.scale > currentPuddle.xw)) {
//   ctx.fillRect(dino.x + offset, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4, dino.spriteWidth * dino.scale, 30);
// }
// if ((dino.x < currentPuddle.x && dino.x + (dino.spriteWidth * dino.scale) > currentPuddle.x)) {
//   if (offset < 100) {
//     ctx.fillRect(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4, offset, 30);
//   }
// }
// if ((dino.x + dino.spriteWidth * dino.scale < currentPuddle.x || dino.x > currentPuddle.xw)) {
//   ctx.fillRect(dino.x, dino.y + (dino.spriteHeight / 2 * dino.scale) + 4, dino.spriteWidth * dino.scale, 30);
// }