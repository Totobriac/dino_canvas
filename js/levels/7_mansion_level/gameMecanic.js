import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./side_bar.js";
import { sprites } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction, selectedObject, resetAction, resetObject } from "./side_bar.js";
import { trash } from "./outside_sprite.js";
import { outsideAction, isReadingPoster } from "./actions.js";

var dino;
var selectedSprite;
var hoveredSprite;
var isDinoCreated = false;

var textDisp;

var oldMouseX = undefined;

export function pointNClick(ctx, game) {

  if (oldMouseX != game.mousePosition.x) {
    oldMouseX = game.mousePosition.x;
    textDisp = undefined;
  }

  if (!isDinoCreated) {
    dino = new MansionDino(ctx, 820, 300, 90, 188, 1);
    isDinoCreated = true;
    game.mousePosition = {
      x: 881,
      y: 300
    };
  }
  drawOutsideScenery(ctx);
  dino.checkBundaries(820, 0, 290, 320);
  if (game.mousePosition.x < 910) dino.moveAround(game, trash);
  if (!isReadingPoster) dino.animateDino();

  drawActions(ctx, game);

  checkSelectedSprite(game);
  checkHoveredSprite(game, ctx);
  checkAction(ctx);
}

function checkSelectedSprite(game) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mousePosition.x + 12, game.mousePosition.y + 12, 1, 1)) {
      selectedSprite = sprites[i];
      return
    } else {
      selectedSprite = null;
    }
  }
}

function checkHoveredSprite(game, ctx) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mouseMovePosition.x + 12, game.mouseMovePosition.y + 12, 1, 1)) {
      hoveredSprite = {
        name: sprites[i].name,
        gender: sprites[i].male
      };
      var gender;
      sprites[i].male ? gender = "un " : gender = "une ";
      var text = gender + hoveredSprite.name;
      if (!textDisp && !selectedAction) drawText(ctx, text);
      return
    } else {
      hoveredSprite = null;
    }
  }
}

function checkIfReach(dino, sprite) {
  if (isReadingPoster) return true;
  if (dino.x + (dino.spriteWidth * dino.scale) + 5 < sprite.x - 5 || dino.x - 5 > sprite.x + (sprite.spriteWidth * sprite.scale) + 6) {
    return false;
  } else {
    return true;
  }
}

function checkAction(ctx) {
  if (selectedAction && !hoveredSprite) {
    drawText(ctx, selectedAction);
  } else if (selectedAction && hoveredSprite) {
    var gender;
    hoveredSprite.gender ? gender = " le " : gender = " la ";
    var text = selectedAction + gender + hoveredSprite.name;
    if (!selectedObject) drawText(ctx, text)
  }
  if (selectedSprite) {
    var isInReach = checkIfReach(dino, selectedSprite);
    if (isInReach) executeAction(ctx)
  };
}

function executeAction(ctx) {
  for (let i = 0; i < outsideAction.length; i++) {
    if (selectedSprite.name === outsideAction[i][1] && selectedAction === outsideAction[i][0]) {
      const func = outsideAction[i][2];
      func();
      if (outsideAction[i][3]) {
        textDisp = outsideAction[i][3];
      }
      resetAction();
    }
    if (textDisp) drawText(ctx, textDisp);

    if (selectedAction === "Utiliser" && selectedObject) {
      if (selectedObject === outsideAction[i][0] && selectedSprite.name === outsideAction[i][1]) {
        const func = outsideAction[i][2];
        func();
        resetAction();
        resetObject();
      }
    }
  }
}


function drawText(ctx, text) {
  ctx.textBaseline = "top";
  ctx.textAlign = "start";
  ctx.font = "50px Pixeboy";
  var width = ctx.measureText(text).width;
  ctx.fillStyle = "black";
  ctx.fillRect(20, 20, width, 36);
  ctx.fillStyle = "orange";
  ctx.fillText(text, 20, 0);
}

function rmSprite(sprite) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].name === sprite) {
      sprites.splice(i, 1);
    }
  }
}

function addSprite(sprite) {
  sprites.unshift(sprite);
}

export { dino, drawText, hoveredSprite, rmSprite, addSprite };
