const subRight = new Image();
subRight.src = "../assets/submarine_level/right_submarine.png";

const subLeft = new Image();
subLeft.src = "../assets/submarine_level/left_submarine.png";

const subJet = new Image();
subJet.src = "../assets/submarine_level/bubble_jet.png"

const subJetRight = new Image();
subJetRight.src = "../assets/submarine_level/bubble_jet_right.png"

export function drawSubmarine(ctx, dino, mousePosition) {
  ctx.save();
  ctx.translate(dino.x, dino.y);
  dino.angle = getAngle(dino.x, dino.y, mousePosition)
  ctx.rotate(dino.angle);
  if (dino.x >= mousePosition.x) {
    ctx.drawImage(subLeft, 0 - 40, 0 - 45, 71, 80);
    ctx.drawImage(subJet, dino.frameIndex * 108, 0, 108, 108, 30, -29, 60, 60);
  } else {
    ctx.drawImage(subRight, -40, -35, 71, 80);
    ctx.drawImage(subJetRight, dino.frameIndex * 108, 0, 108, 108, 34, -28, 60, 60);
  }
  ctx.restore();
}

function getAngle(x, y, mouse) {
  const dx = x - mouse.x;
  const dy = y - mouse.y;
  let theta = Math.atan2(dy, dx);
  return theta
}
