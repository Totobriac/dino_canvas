import {
  drawOutsideScenery
} from "./outside_mansion.js";
import {
  drawActions,
  animateText
} from "./side_bar.js";
import {
  sprites,
  outsideText,
  outsideAction,
  isReadingPoster,
  outsideObjectAction
} from "./outside_mansion.js";
import {
  MansionDino
} from "../character/mansionDino.js";
import {
  selectedAction,
  selectedObject
} from "./side_bar.js";
import {
  trash
} from "./outside_sprite.js";

var dino;
var selectedSprite;
var hoveredSprite;
var isInReach;
var isDinoCreated = false;


export function pointNClick(ctx, game) {

  if (!isDinoCreated) {
    dino = new MansionDino(ctx, 820, 300, 90, 188, 1);
    isDinoCreated = true;
    game.mousePosition = {
      x: 881,
      y: 300
    };
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
      drawText(ctx, text);
      return
    } else {
      hoveredSprite = null;
    }
  }
}

function checkIfReach(dino, sprite) {
  if (isReadingPoster) return true;
  if (dino.x + (dino.spriteWidth * dino.scale) < sprite.x || dino.x > sprite.x + (sprite.spriteWidth * sprite.scale)) {
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
    drawText(ctx, text)
  }
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
  for (let i = 0; i < outsideText.length; i++) {
    if (selectedSprite.name === outsideText[i][0] && selectedAction === outsideText[i][1]) {
      drawText(ctx, outsideText[i][2]);
    }
  }
}

function executeAction() {
  for (let i = 0; i < outsideAction.length; i++) {
    if (selectedSprite.name === outsideAction[i][1] && selectedAction === outsideAction[i][0]) {
      const func = outsideAction[i][2];
      func();
    }
  }
}

function objectInteraction() {
  if (selectedAction === "Utiliser") {
    for (let i = 0; i < outsideObjectAction.length; i++) {
      if (selectedObject == outsideObjectAction[i][0] && selectedSprite.name === outsideObjectAction[i][1]) {
        const func = outsideObjectAction[i][2];
        func();
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

export {
  dino,
  drawText,
  hoveredSprite,
  rmSprite
};
