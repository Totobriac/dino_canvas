const subRight = new Image();
subRight.src = "./assets/4_submarine/right_submarine.png";

const subLeft = new Image();
subLeft.src = "./assets/4_submarine/left_submarine.png";

const subJet = new Image();
subJet.src = "./assets/4_submarine/bubble_jet.png";

const subJetRight = new Image();
subJetRight.src = "./assets/4_submarine/bubble_jet_right.png";

import { game } from "../../script.js";

var dx = 0;
var dy = 0;

export function drawSubmarine(ctx, dino, mousePosition) {

  update(dino, game);
  ctx.save();
  ctx.translate(dino.x, dino.y);
  dino.angle = getAngle(dino.x, dino.y, mousePosition)
  ctx.rotate(dino.angle);
  if (dino.x >= mousePosition.x) {
    ctx.drawImage(subLeft, 0 - 40, 0 - 45, 71, 80);
    ctx.drawImage(subJet, dino.frameIndex * 108, 0, 108, 108, 30, -29, 40, 40);
  } else {
    ctx.drawImage(subRight, -40, -35, 71, 80);
    ctx.drawImage(subJetRight, dino.frameIndex * 108, 0, 108, 108, 34, -28, 40, 40);
  }
  ctx.restore();
}

function update(dino, game) {
  dino.tickCount += 1;
  dino.mouseX = game.mousePosition.x;
  dino.mouseY = game.mousePosition.y;
  dx = dino.x - dino.mouseX;
  dy = dino.y - dino.mouseY;
  if (game.mousePosition.x != dino.x) {
    dino.x -= dx / 20;
  }
  if (game.mousePosition.y != dino.y) {
    dino.y -= dy / 20;
  }
  dino.checkFrame(8);
};

function getAngle(x, y, mouse) {
  const dx = x - mouse.x;
  const dy = y - mouse.y;
  let theta = Math.atan2(dy, dx);
  return theta
}

export {dx, dy};
