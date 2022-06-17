import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./side_bar.js";
import { sprites } from "./outside_mansion.js";
import { MansionDino } from "../character/mansionDino.js";
import { selectedAction, selectedObject, resetAction, resetObject } from "./side_bar.js";
import { trash } from "./outside_sprite.js";
import { outsideAction, isReadingPoster, canMove } from "./actions.js";
import { fountainSound, walkSound } from "./sound.js";
import { checkSelectedSprite, checkHoveredSprite } from "./mouse.js";
import { drawText, introText, errorTxt, dialogue } from "./text.js";


var dino;
var isDinoCreated = false;
var textDisp;

var oldMouseX = undefined;

var oldSelectedSprite;
var oldSelectedAction;
var errTxt;

var selectedSprite;
var hoveredSprite;


export function pointNClick(ctx, game, gameBegun) {

  if (oldMouseX != game.mousePosition.x) {
    oldMouseX = game.mousePosition.x;
    textDisp = undefined;
  }

  if (!isDinoCreated) {
    dino = new MansionDino(ctx, 1120, 300, 90, 188, 820, 0, 290, 320);
    console.log(dino.right, dino.left, dino.top, dino.bottom);
    isDinoCreated = true;
    game.mousePosition = {
      x: 820,
      y: 300
    };
  }
  console.log(dino.top, dino.y);
  drawOutsideScenery(ctx);

  if (gameBegun) {
    walkSound(dino, isReadingPoster);
    fountainSound(dino);
    if (!hoveredSprite) drawText(ctx, introText);
    if (game.mousePosition.x < 910 && !isReadingPoster && canMove && gameBegun) {
      dino.moveAround(game, trash);
    }
    if (!isReadingPoster) dino.animateDino();

    selectedSprite = checkSelectedSprite(game);
    hoveredSprite = checkHoveredSprite(game);

    checkAction(ctx);
    dialogue(ctx, hoveredSprite);
  }
  drawActions(ctx, game, gameBegun);
}

function setTextDisp(txt) {
  textDisp = txt;
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
  } if (selectedAction && hoveredSprite && !selectedSprite) {
    var gender;
    hoveredSprite.gender ? gender = " le " : gender = " la ";
    var text = selectedAction + gender + hoveredSprite.name;
    if (!selectedObject) drawText(ctx, text)
  } if (selectedAction && selectedSprite) {
    checkIfReach(dino, selectedSprite) ? executeAction(ctx) : tooFar(ctx);
  }
}


function executeAction(ctx) {
  var coco = false;
  for (let i = 0; i < outsideAction.length; i++) {
    if (selectedSprite.name === outsideAction[i][1] && selectedAction === outsideAction[i][0]) {
      const func = outsideAction[i][2];
      func(ctx);
      coco = true
      if (outsideAction[i][3]) {
        setTextDisp(outsideAction[i][3]);
      }
    }
    if (selectedAction === "Utiliser" && selectedObject) {
      if (selectedObject.name === outsideAction[i][0] && selectedSprite.name === outsideAction[i][1]) {
        const func = outsideAction[i][2];
        func();
        coco = true
        if (outsideAction[i][3]) {
          setTextDisp(outsideAction[i][3]);
        }
        resetObject();
      }
    }
  }
  if (selectedSprite != oldSelectedSprite) {
    oldSelectedSprite = selectedSprite;
    errTxt = errorText();
  }
  if (selectedAction != oldSelectedAction) {
    oldSelectedAction = selectedAction;
    errTxt = errorText();
  }
  if (!textDisp) textDisp = "";
  coco ? drawText(ctx, textDisp) : drawText(ctx, errTxt);
}


function tooFar(ctx) {
  drawText(ctx, "Je suis trop loin");
  //resetAction();
}

function errorText () {
  var rand = Math.floor(Math.random() * errorTxt.length);
  return errorTxt[rand];
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


// function checkHoveredSprite(game, ctx) {
//   for (let i = 0; i < sprites.length; i++) {
//     if (sprites[i].checkCollision(game.mouseMovePosition.x + 12, game.mouseMovePosition.y + 12, 1, 1)) {
//       introTxt = false;
//       hoveredSprite = {
//         name: sprites[i].name,
//         gender: sprites[i].male
//       };
//       var gender;
//       sprites[i].male ? gender = "un " : gender = "une ";
//       var text = gender + hoveredSprite.name;
//       if (!textDisp && !selectedAction) drawText(ctx, text);
//       return
//     } else {
//       hoveredSprite = null;
//     }
//   }