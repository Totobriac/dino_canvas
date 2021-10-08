var actionsList = ["Pousser", "Tirer", "Ouvrir", "Fermer", "Lire",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"]

var actions = [];
var maxTick = 3;
var tick = 0;
var filter = 0;
var oldSelection;
var oldHoverSelection;


class Action {
  constructor(action, x, y) {
    this.action = action;
    this.y = y;
    this.x = x;
    this.filter = "none";
    this.isHovered = false;
  }
}

function createActions() {
  var aY1 = 60;
  var aY2 = 60;
  for (let i = 0; i < actionsList.length; i++) {
    if (i <= 4) {
      var act = new Action(actionsList[i], 880, aY1);
      actions.push(act);
      aY1 += 50;
    }
    else {
      var act = new Action(actionsList[i], 1030, aY2);
      actions.push(act);
      aY2 += 50;
    }
  }
  console.log(actions)
}


export function drawActions(ctx, game) {
  if (game.level8Started === false) {
    createActions();
    game.level8Started = true;
  }
  for (let i = 0; i < actions.length; i++) {
    ctx.filter = "url(#turb" + actions[i].filter + ")";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(actions[i].x, actions[i].y - 30, 145, 45);
    actions[i].isHovered === true ?  ctx.fillStyle = "black" : ctx.fillStyle = "white";
    ctx.fillRect(actions[i].x, actions[i].y - 30, 145, 45);
    actions[i].isHovered === true ?  ctx.fillStyle = "white" : ctx.fillStyle = "black";
    ctx.font = "30px Garamond";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(actions[i].action, actions[i].x + 70, actions[i].y - 5);
  }
  checkAction(game.mousePosition, game.mouseMovePosition, ctx);
  animateText();
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
      if (oldSelection != undefined) actions[oldSelection].filter = "none";
      actions[i].filter = filter;
      oldSelection = i;
      ctx.filter="none";
    }
  }
}

function animateText() {
  tick += 1;
  if (tick >= maxTick) {
    tick = 0;
    filter < 4 ? filter += 1 : filter = 0;
  }
}

