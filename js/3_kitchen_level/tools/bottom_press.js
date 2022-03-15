var bottomSprite = new Image();
bottomSprite.src = "./assets/kitchen_level/press_bottom_hole.png";

import { garlicPress } from "../toolGeneration.js";

function drawBottomPress(ctx) {

  if (garlicPress.pressIt) {
    let tempCanvas = document.createElement("canvas");
    let tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = 1200;
    tempCanvas.height = 400;

    tempContext.save();

    tempContext.translate(500, 300);
    tempContext.rotate(-40 * Math.PI / 180);
    tempContext.drawImage(bottomSprite, 0, 0, 329, 281);

    tempContext.restore();

    ctx.drawImage(tempCanvas, 0, 0);
  }
}

export { drawBottomPress };
