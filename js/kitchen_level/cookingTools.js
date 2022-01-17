var potSprite = new Image();
potSprite.src = "../assets/kitchen_level/pot.png";

var pot;
var selectedTool = null;
var tools = [];

class Tool {
  constructor(name, sprite, x, y, width, height, ctx) {
    this.name = name;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.offset = {
      x: null,
      y: null
    };
  }
  draw() {
    this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

function setTools(game, ctx) {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);

  if (game.kitchenLevelStarted === false) {
    pot = new Tool("pot", potSprite, 20, 20, 150, 150, ctx);
    tools.push(pot);
    game.kitchenLevelStarted = true;
  }
  pot.draw();
}

function onMouseDown(e) {
  selectedTool = getSelectedTool(e);
  if (selectedTool) {
    var mouse = getCursorPosition(e);
    selectedTool.offset = {
      x: mouse.x - selectedTool.x ,
      y: mouse.y - selectedTool.y
    }
  }
}

function onMouseMove(e) {
  if (selectedTool) {
    var mouse = getCursorPosition(e);
    selectedTool.x = mouse.x - selectedTool.offset.x;
    selectedTool.y = mouse.y - selectedTool.offset.y;
  }
}

function onMouseUp(e) {
  selectedTool = null;
}

function getSelectedTool(e) {
  var mouse = getCursorPosition(e);
  var doesItCollide;
  for (let i = 0; i < tools.length; i++) {
    if (mouse.x < tools[i].x || mouse.x > tools[i].x + tools[i].width ||
      mouse.y < tools[i].y || mouse.y > tools[i].y + tools[i].height) {
      return null;
    } else {
      return tools[i];
    }
  }
}



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

export {
  setTools
};
