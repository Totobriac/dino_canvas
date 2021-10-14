import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./actions.js";
import { trash, sittingCat, sprites } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction } from "./actions.js";

var dino;
var selectedSprite;
var isInReach;

var isNearCat;

export function pointNClick(ctx, game) {

  if (game.level8Dino == false) {
    dino = new MansionDino(ctx, 820, 300, 90, 99);
    game.level8Dino = true;
  }
  drawOutsideScenery(ctx);
  drawActions(ctx, game);
  if (game.mousePosition.x < 910) dino.moveAround(game, trash);
  // if (dino.x < 150) {
    isNearCat = true;
    // if (sittingCat.x < 200) {
    console.log(sittingCat);
    sittingCat.update(2, 0);
    // }
  // }
  // else {
  //   isNearCat = false;
  // }
  dino.checkBundaries(820, 0, 295, 320);
  dino.animateDino();

  checkInteraction(game);
  if (selectedSprite) {
    isInReach = checkIfReach(dino, selectedSprite);
    if (isInReach == true) {
      displayText(ctx);
    }
  }
}

function checkInteraction(game) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mousePosition.x, game.mousePosition.y, 1, 1) == true) {
      selectedSprite = sprites[i];
      return
    }
    else selectedSprite = null;
  }
}

function checkIfReach(dino, sprite) {
  if (sprite.x + sprite.spriteWidth < dino.x || dino.x > sprite.x + (sprite.spriteWidth * sprite.scale)) {
    return false;
  }
  else {
    return true;
  }
}

function displayText(ctx) {
  if (selectedSprite.name === "cat" && selectedAction === "Regarder") {
    drawText(ctx, "nice cat")
  }
  else if (selectedSprite.name === "bowie" && selectedAction === "Lire") {
    drawText(ctx, "cool")
  }
  else if (selectedSprite.name === "ring" && selectedAction === "Utiliser") {
    drawText(ctx, "Bonjour!!!!")
  }
  else if (selectedSprite.name === "gate" && selectedAction === "Ouvrir") {
    drawText(ctx, "Fermé!!!!")
  }
}

function drawText(ctx, text) {
  ctx.font = "30px Arial";
  ctx.fillText(text, 100, 50);
}

export { isNearCat };
