import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./actions.js";
import { trash, sprites, outsideText } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction, deleteAction } from "./actions.js";


var dino;
var selectedSprite;
var isInReach;
var level = 0;

export function pointNClick(ctx, game) {
  console.log(selectedAction)
  if (game.level8Dino == false) {
    dino = new MansionDino(ctx, 820, 300, 90, 99);
    game.level8Dino = true;
  }

  if (level == 0) {
    drawOutsideScenery(ctx);
    dino.checkBundaries(820, 0, 295, 320);
    if (game.mousePosition.x < 910) dino.moveAround(game, trash);
    if (selectedSprite && selectedAction) {
      if (selectedAction == "Pousser" && selectedSprite.name == "trash" && isInReach == true) {
        trash.update(-4, 0);
        dino.isMoving = true;
      }
    }
  }


  drawActions(ctx, game);
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
    else {
      selectedSprite = null;
    }
  }
}

function checkIfReach(dino, sprite) {
  if (dino.x + (dino.spriteWidth * dino.scale) < sprite.x || dino.x > sprite.x + (sprite.spriteWidth * sprite.scale)) {
    return false;
  }
  else {
    return true;
  }
}

function displayText(ctx) {
  if (level == 0) {
    for (let i = 0; i < outsideText.length; i++) {
      if (selectedSprite.name === outsideText[i][0] && selectedAction === outsideText[i][1]) {
        drawText(ctx, outsideText[i][2]);
      }
    }
  }
}

function drawText(ctx, text) {
  ctx.font = "50px Pixeboy";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "purple";
  ctx.fillText(text, 200, 50);
}

export { dino };
