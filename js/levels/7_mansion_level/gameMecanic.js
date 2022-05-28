import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions, animateText } from "./side_bar.js";
import {
  sprites, outsideText, outsideAction, isReadingPoster,
  outsideObjectAction
} from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction, selectedObject } from "./side_bar.js";
import { trash } from "./outside_sprite.js";

var dino;
var selectedSprite;
var hoveredSprite;
var isInReach;
var level = 0;
var isDinoCreated = false;

export function pointNClick(ctx, game) {
  if (!isDinoCreated) {
    dino = new MansionDino(ctx, 820, 300, 90, 188, 1);
    isDinoCreated = true;
    game.mousePosition = { x: 881, y: 300 };
  }
  if (game.level === 7) {
    drawOutsideScenery(ctx);
    dino.checkBundaries(820, 0, 300, 320);
    if (game.mousePosition.x < 910) dino.moveAround(game, trash);
    if (isReadingPoster === false) {
      dino.animateDino();
    }
  }

  drawActions(ctx, game);
  animateText();

  checkSelectedSprite(game);
  checkHoveredSprite(game, ctx);
  checkAction(ctx);
}

function checkSelectedSprite(game) {
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mousePosition.x, game.mousePosition.y, 1, 1)) {
      selectedSprite = sprites[i];
      return
    }
    else {
      selectedSprite = null;
    }
  }
}

function checkHoveredSprite(game, ctx) {
  ctx.fillRect(game.mouseMovePosition.x, game.mouseMovePosition.y, 2,2)
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].checkCollision(game.mouseMovePosition.x, game.mouseMovePosition.y, 1, 1)) {
      var gender = sprites[i].male;
      hoveredSprite = sprites[i].name;
      drawText(ctx, hoveredSprite, gender);
      return
    }
    else {
      hoveredSprite = null;
    }
  }
}

function checkIfReach(dino, sprite) {
  if (isReadingPoster) return true;
  if (dino.x + (dino.spriteWidth * dino.scale) < sprite.x || dino.x > sprite.x + (sprite.spriteWidth * sprite.scale)) {
    return false;
  }
  else {
    return true;
  }
}

function checkAction(ctx) {
  if (selectedSprite) {
    isInReach = checkIfReach(dino, selectedSprite);
    if (isInReach) {
      displayText(ctx);
      executeAction();
      objectInteraction();
    }
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

function executeAction() {
  if (level == 0) {
    for (let i = 0; i < outsideAction.length; i++) {
      if (selectedSprite.name === outsideAction[i][1] && selectedAction === outsideAction[i][0]) {
        const func = outsideAction[i][2];
        func();
      }
    }
  }
}

function objectInteraction() {
  if (level == 0 && selectedAction === "Utiliser") {
    for (let i = 0; i < outsideObjectAction.length; i++) {
      if (selectedObject == outsideObjectAction[i][0] && selectedSprite.name === outsideObjectAction[i][1]) {
        const func = outsideObjectAction[i][2];
        func();
      }
    }
  }
}

function drawText(ctx, text, male) {
  var gender;
  male ? gender = "un " : gender = "une ";
  text = gender + text;
  ctx.textBaseline = "top";
  ctx.textAlign = "start";
  ctx.font = "50px Pixeboy";

  var width = ctx.measureText(text).width;
  ctx.fillStyle = "black";
  ctx.fillRect(20,20,width,36);

  ctx.fillStyle = "orange";
  ctx.fillText(text, 20, 0);
}

export { dino, drawText, hoveredSprite };
