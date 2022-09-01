var buttons = [
  { x: 1040, y: 72 },
  { x: 1100, y: 72 },
  { x: 1040, y: 145 },
]


function buttonsChoice(pos) {
  switch (true) {
    case distance(pos.x, pos.y, buttons[0].x, buttons[0].y) < 25:
      return 1
    case distance(pos.x, pos.y, buttons[1].x, buttons[1].y) < 25:
      return 2
    case distance(pos.x, pos.y, buttons[2].x, buttons[2].y) < 25:
      return 3
  }
  return 0;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

export { buttonsChoice };