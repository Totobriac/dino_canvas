function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI);
  if (angle < 0) {
    angle = (2 * Math.PI) + angle;
  }
  return angle;
}

function convertToRadians(angle) {
  angle = angle * (Math.PI / 180);
  return angle;
}

function distBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

export { normalizeAngle, convertToRadians, distBetweenTwoPoints };
