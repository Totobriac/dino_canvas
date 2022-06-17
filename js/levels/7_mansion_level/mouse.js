import { sprites } from "./outside_mansion.js";

function checkHoveredSprite(game) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mouseMovePosition.x + 12, game.mouseMovePosition.y + 12, 1, 1)) {
      return sprites[i];
    }    
  }
  return null;
}

function checkSelectedSprite(game) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mousePosition.x + 12, game.mousePosition.y + 12, 1, 1)) {
      return sprites[i];
    }
  }
  return null;
}

export { checkHoveredSprite, checkSelectedSprite };