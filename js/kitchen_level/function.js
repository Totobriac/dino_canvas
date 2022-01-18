function getCursorPosition(e) {
  var isInside;
  var xM = e.clientX;
  var yM = e.clientY;
  const rect = canvas.getBoundingClientRect();
  const x = xM - rect.left;
  const y = yM - rect.top;
  xM > rect.left && xM < rect.right && yM < rect.bottom && yM > rect.top ? isInside = true : isInside = false;
  if (isInside == true) return {
    x: x,
    y: y
  };
}

export { getCursorPosition };
