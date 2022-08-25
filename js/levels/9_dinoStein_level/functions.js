function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI)
  if (angle < 0) {
    angle = angle + (2 * Math.PI)
  }
  return angle;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}



function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

export { normalizeAngle, distance, toRadians, heuristic };