import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./side_bar.js";
import { sprites } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction, selectedObject, resetAction, resetObject } from "./side_bar.js";
import { trash } from "./outside_sprite.js";
import { outsideAction, isReadingPoster, canMove } from "./actions.js";
import { drawEnding } from "./intro.js";

var dino;
var selectedSprite;
var hoveredSprite;
var isDinoCreated = false;
var textDisp;
var dial = [];
var oldMouseX = undefined;
var ended = false;
var introText = " Nous y voilà! On dirait le vieux château. ";
var introTxt = true;

export function pointNClick(ctx, game, gameBegun) {

  if (oldMouseX != game.mousePosition.x) {
    oldMouseX = game.mousePosition.x;
    textDisp = undefined;
  }

  if (!isDinoCreated) {
    dino = new MansionDino(ctx, 1120, 300, 90, 188, 1);
    isDinoCreated = true;
    game.mousePosition = {
      x: 820,
      y: 300
    };
  }

  drawOutsideScenery(ctx);

  if (gameBegun) {
    dino.checkBundaries(820, 0, 290, 320);
    if( introTxt )drawText(ctx, introText);
    if (game.mousePosition.x < 910 && !isReadingPoster && canMove && gameBegun) {
      dino.moveAround(game, trash);
    }
    if (!isReadingPoster) dino.animateDino();
    checkSelectedSprite(game);
    checkHoveredSprite(game, ctx);
    checkAction(ctx);
    dialogue(ctx);
  }
  drawActions(ctx, game, gameBegun);
}

function dialogue(ctx) {
  dial.forEach((choice, i) => {
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.font = "40px Pixeboy";
    var width = ctx.measureText(choice).width;
    var num = i + 1;
    hoveredSprite && hoveredSprite.name === "answer" + num.toString() ? ctx.fillStyle = "orange" : ctx.fillStyle = "transparent";
    ctx.fillRect(40, 70 + i * 50, width, 40);
    hoveredSprite && hoveredSprite.name === "answer" + num.toString() ? ctx.fillStyle = "black" : ctx.fillStyle = "orange";
    ctx.fillText(choice, 40, 60 + i * 50);
  });
}

function setDial(dl) {
  dial = dl;
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
      introTxt = false;
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
  } else if (selectedAction && hoveredSprite && !selectedSprite) {
    var gender;
    hoveredSprite.gender ? gender = " le " : gender = " la ";
    var text = selectedAction + gender + hoveredSprite.name;
    if (!selectedObject) drawText(ctx, text)
  } else if (selectedAction && selectedSprite) {
    checkIfReach(dino, selectedSprite) ? executeAction(ctx) : tooFar(ctx);
  }
}

function tooFar(ctx) {
  drawText(ctx, "Je suis trop loin");
  resetAction();
}

function executeAction(ctx) {
  for (let i = 0; i < outsideAction.length; i++) {
    if (selectedSprite.name === outsideAction[i][1] && selectedAction === outsideAction[i][0]) {
      const func = outsideAction[i][2];
      func(ctx);
      if (outsideAction[i][3]) {
        textDisp = outsideAction[i][3];
      }
      resetAction();
    }
    if (textDisp) drawText(ctx, textDisp);

    if (selectedAction === "Utiliser" && selectedObject) {
      if (selectedObject.name === outsideAction[i][0] && selectedSprite.name === outsideAction[i][1]) {
        const func = outsideAction[i][2];
        func();
        resetAction();
        resetObject();
      }
    }
  }
}

function drawText(ctx, text) {
  var lines = getLines(text, 36);
  lines.forEach((line, i) => {
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.font = "50px Pixeboy";
    var width = ctx.measureText(line).width;
    ctx.fillStyle = "black";
    ctx.fillRect(20, 20 + i * 40, width, 36);
    ctx.fillStyle = "orange";
    ctx.fillText(line, 20, i * 40);
  });
}

function getLines(text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = (currentLine + " " + word).length;

    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
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

export { dino, drawText, hoveredSprite, rmSprite, addSprite, setDial, ended };
