import { drawOutsideScenery } from "./outside_mansion.js";
import { drawActions } from "./side_bar.js";
import { MansionDino } from "./mansionDino.js";
import { selectedAction, selectedObject, resetAction, resetObject } from "./side_bar.js";
import { trash } from "./outside_sprite.js";
import { outsideAction, isReadingPoster, canMove } from "./actions.js";
import { fountainSound, walkSound } from "./sound.js";
import { checkSelectedSprite, checkHoveredSprite } from "./mouse.js";
import { drawText, introText, errorText, dialogue } from "./text.js";

var dino;
var textDisp;
var oldMouseX = undefined;
var oldSelectedSprite;
var oldSelectedAction;
var errTxt;
var selectedSprite;
var hoveredSprite;


export function pointNClick(ctx, game, gameBegun) {

  if (!dino) dino = new MansionDino(ctx, 1120, 300, 90, 188, 820, 0, 290, 320);
  drawOutsideScenery(ctx);

  if (oldMouseX != game.mousePosition.x) {
    oldMouseX = game.mousePosition.x;
    textDisp = undefined;
  }

  if (gameBegun) {
    walkSound(dino, isReadingPoster);
    fountainSound(dino);
    //if (!hoveredSprite) drawText(ctx, introText);
    if (game.mousePosition.x < 910 && !isReadingPoster && canMove && gameBegun) {
      dino.moveAround(game, trash);
    }
    if (!isReadingPoster) dino.animateDino();

    selectedSprite = checkSelectedSprite(game);
    hoveredSprite = checkHoveredSprite(game);

    mouseMechanic(ctx);

    dialogue(ctx, hoveredSprite);
  }
  drawActions(ctx, game, gameBegun);
}

function mouseMechanic(ctx) {
  if (hoveredSprite && !selectedAction) {
    var gender;
    hoveredSprite.male ? gender = "un " : gender = "une ";
    var text = gender + hoveredSprite.name;
    drawText(ctx, text);
  } else if (selectedAction && !selectedObject && !selectedSprite && !hoveredSprite) {
    drawText(ctx, selectedAction + "... ");
  } else if (selectedAction && !selectedObject && !selectedSprite && hoveredSprite) {
    var gender;
    hoveredSprite.male ? gender = " le " : gender = " la ";
    var text = selectedAction + gender + hoveredSprite.name;
    drawText(ctx, text);
  } else if (selectedAction && !selectedObject && selectedSprite && hoveredSprite) {
    dino.checkIfReach(selectedSprite) || isReadingPoster
      ? executeAction(ctx)
      : drawText(ctx, "Je suis trop loin");
  } else if (selectedAction && selectedObject && selectedSprite && hoveredSprite) {
    dino.checkIfReach(selectedSprite) || isReadingPoster
      ? executeAction(ctx)
      : drawText(ctx, "Je suis trop loin");
  }
}

function setTextDisp(txt) {
  textDisp = txt;
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
  if (selectedSprite != oldSelectedSprite || selectedAction != oldSelectedAction) {
    oldSelectedSprite = selectedSprite;
    oldSelectedAction = selectedAction;
    errTxt = errorText();
  }
  if (!textDisp) textDisp = "";
  coco ? drawText(ctx, textDisp) : drawText(ctx, errTxt);
}

export { dino, drawText, hoveredSprite };
