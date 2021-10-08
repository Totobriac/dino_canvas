var actionsList = ["Pousser", "Tirer", "Ouvrir", "Fermer", "Lire",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"]

var actions = [];
var maxTick = 3;
var tick = 0;
var filter = 0;
var oldSelection;

class Action {
  constructor(action, x, y) {
    this.action = action;
    this.y = y;
    this.x = x;
    this.filter = "none";
  }
}

function createActions() {
  var aY1 = 60;
  var aY2 = 60;
  for (let i = 0; i < actionsList.length; i++) {
    if (i <= 4) {
      var act = new Action(actionsList[i], 880, aY1);
      actions.push(act);
      aY1 += 60;
    }
    else {
      var act = new Action(actionsList[i], 1030, aY2);
      actions.push(act);
      aY2 += 60;
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
    ctx.strokeRect(actions[i].x , actions[i].y - 30, 145, 45);
    ctx.fillStyle = "black";
    ctx.font = "30px Garamond";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(actions[i].action, actions[i].x + 70, actions[i].y - 5);
  }
  checkAction(game.mousePosition);
  animateText();
}

function checkAction(mouse) {
  for (let i = 0; i < actions.length; i++) {
    if (mouse.x > actions[i].x && mouse.x < actions[i].x + 145 && mouse.y < actions[i].y && mouse.y > actions[i].y - 45) {
      if (oldSelection != undefined) actions[oldSelection].filter = "none";
      actions[i].filter = filter;
      oldSelection = i;
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

