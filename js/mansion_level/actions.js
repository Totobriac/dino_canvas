var actionsList = ["Pousser", "Tirer", "Ouvrir", "Fermer", "Lire",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"]

var actions = [];

class Action {
  constructor(action, x, y) {
    this.action = action;
    this.y = y;
    this.x = x;
  }
}

function createActions() {
  var aY1 = 60;
  var aY2 = 60;
  for (let i = 0; i < actionsList.length; i++) {
    if (i <= 4) {
      var act = new Action(actionsList[i], 900, aY1);
      actions.push(act);
      aY1 += 60;
    }
    else {
      var act = new Action(actionsList[i], 1050, aY2);
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
    ctx.fillStyle = "grey";
    ctx.fillRect(actions[i].x - 10, actions[i].y - 30, 145, 45);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(actions[i].action, actions[i].x, actions[i].y);
  }
  checkAction(game.mousePosition)
}

function checkAction(mouse) {
  for (let i = 0; i < actions.length ; i++ ) {
    if (mouse.x > actions[i].x && mouse.x < actions[i].x + 145 && mouse.y < actions[i].y && mouse.y > actions[i].y - 45) {
      console.log(actions[i].action)
    }
  }
}