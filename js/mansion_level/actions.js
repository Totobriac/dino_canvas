var actionsList = ["Pousser", "Tirer", "Ouvrir", "Fermer", "Lire",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"]

var actions = [];
var maxTick = 3;
var tick = 0;
var filter = 0;
var oldSelection;
var selectedAction;

class Action {
  constructor(action, x, y, ctx) {
    this.action = action;
    this.y = y;
    this.x = x;
    this.ctx = ctx;
    this.filter = "none";
    this.isHovered = false;
  }
  draw() {
    this.ctx.filter = "url(#turb" + this.filter + ")";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, this.y - 30, 145, 45);
    this.isHovered === true ? this.ctx.fillStyle = "black" : this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y - 30, 145, 45);
    this.isHovered === true ? this.ctx.fillStyle = "white" : this.ctx.fillStyle = "black";
    this.ctx.font = "40px Tentacle";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.action, this.x + 70, this.y - 5);
  }
}

function createActions(ctx) {
  var aY1 = 35;
  var aY2 = 35;
  for (let i = 0; i < actionsList.length; i++) {
    if (i <= 4) {
      var act = new Action(actionsList[i], 900, aY1, ctx);
      actions.push(act);
      aY1 += 50;
    }
    else {
      var act = new Action(actionsList[i], 1050, aY2, ctx);
      actions.push(act);
      aY2 += 50;
    }
  }
}


export function drawActions(ctx, game) {
  if (game.level8Started === false) {
    createActions(ctx);
    game.level8Started = true;
  }
  ctx.fillStyle = "purple";
  ctx.fillRect(895, 0, 305, 400)
  for (let i = 0; i < actions.length; i++) {
    actions[i].draw();
  }
  checkAction(game.mousePosition, game.mouseMovePosition, ctx);
  ctx.filter = "none";

  animateText();
  drawObjects(ctx);
}

function checkAction(mouse, mouseMove, ctx) {
  for (let i = 0; i < actions.length; i++) {
    if (mouseMove.x > actions[i].x && mouseMove.x < actions[i].x + 145 && mouseMove.y < actions[i].y && mouseMove.y > actions[i].y - 45) {
      actions[i].isHovered = true;
    }
    else {
      actions[i].isHovered = false;
    }
    if (mouse.x > actions[i].x && mouse.x < actions[i].x + 145 && mouse.y < actions[i].y && mouse.y > actions[i].y - 45) {
      if (oldSelection != undefined) {
        actions[oldSelection].filter = "none";
      }
      selectedAction = actions[i].action;
      actions[i].filter = filter;
      oldSelection = i;
    }
  }
  if (mouse.y > 255 && mouse.x > 896 && oldSelection != undefined) actions[oldSelection].filter = "none";
}

function drawObjects(ctx) {
  ctx.fillStyle = "orange";
  ctx.fillRect(900, 255, 295, 140);
}

function animateText() {
  tick += 1;
  if (tick >= maxTick) {
    tick = 0;
    filter < 4 ? filter += 1 : filter = 0;
  }
}

export { selectedAction };