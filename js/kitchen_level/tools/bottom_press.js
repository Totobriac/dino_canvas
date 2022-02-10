var bottomSprite = new Image();
bottomSprite.src = "../assets/kitchen_level/press_bottom_hole.png";

import {
  garlicPress
} from "../tools.js";


function drawBottomPress(ctx) {

  if (garlicPress.pressIt) {
    let tempCanvas = document.createElement("canvas");
    let tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = 1200;
    tempCanvas.height = 400;

    tempContext.drawImage(bottomSprite, 500, 200, 329, 281);

    ctx.drawImage(tempCanvas,0,0);
  }
}

export { drawBottomPress};