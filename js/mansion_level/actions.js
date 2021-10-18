import { Sprite } from "../character/sprite.js";
import { objects } from "./outside_mansion.js";

var actionsList = ["Pousser", "Tirer", "Ouvrir", "Fermer", "Reset",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"];

var actions = [];
var maxTick = 3;
var tick = 0;
var filter = 0;
var oldSelection;
let selectedAction;

class Action {
  constructor(action, x, y, ctx, color1, color2) {
    this.action = action;
    this.y = y;
    this.x = x;
    this.ctx = ctx;
    this.filter = "none";
    this.isHovered = false;
    this.color1 = color1;
    this.color2 = color2;
  }
  draw() {
    this.ctx.filter = "url(#turb" + this.filter + ")";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, this.y - 30, 145, 45);
    this.isHovered === true ? this.ctx.fillStyle = this.color1 : this.ctx.fillStyle = this.color2;
    this.ctx.fillRect(this.x, this.y - 30, 145, 45);
    this.isHovered === true ? this.ctx.fillStyle = this.color2 : this.ctx.fillStyle = this.color1;
    this.ctx.font = "40px Tentacle";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.action, this.x + 70, this.y - 5);
  }
}

function createActions(ctx) {
  var act;
  var aY1 = 35;
  var aY2 = 35;
  for (let i = 0; i < actionsList.length; i++) {
    if (i <= 4) {
      i == 4
      ? act = new Action(actionsList[i], 900, aY1, ctx, "white", "black")
      : act = new Action(actionsList[i], 900, aY1, ctx, "black", "white")
      actions.push(act);
      aY1 += 50;
    }
    else {
      act = new Action(actionsList[i], 1050, aY2, ctx, "black", "white");
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

  drawObjects(ctx);
}

function checkAction(mouse, mouseMove) {
  for (let i = 0; i < actions.length; i++) {
    if (mouseMove.x > actions[i].x && mouseMove.x < actions[i].x + 145 && mouseMove.y < actions[i].y && mouseMove.y > actions[i].y - 45) {
      actions[i].isHovered = true;
    }
    else {
      actions[i].isHovered = false;
    }
    if (mouse.x > actions[i].x && mouse.x < actions[i].x + 145 && mouse.y < actions[i].y && mouse.y > actions[i].y - 45) {
      if (i === 4) {
        selectedAction = "none";
        actions[i].filter = "none";
        if (oldSelection != undefined) {
          actions[oldSelection].filter = "none";
          oldSelection = null;
        }
        return
      }
      if (oldSelection != undefined) {
        actions[oldSelection].filter = "none";
      }
      selectedAction = actions[i].action;
      actions[i].filter = filter;
      oldSelection = i;
    }
    else {
      if (oldSelection != null) actions[oldSelection].filter = filter;
    }
  }
  if (mouse.y > 255 && mouse.x > 896 && oldSelection != undefined) actions[oldSelection].filter = "none";
}

function drawObjects(ctx) {
  ctx.fillStyle = "orange";
  ctx.fillRect(900, 255, 295, 140);
  var oY = 3;
  for (let i = 0 ; i < objects.length; i++) {
    if (i < 4) {
      var object = new Sprite(i, objects[i], 900 + (i * 70) + oY, 260, 1, 1, 140, 120, 0.5);
      object.draw(ctx);
      oY += 3;
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


export { selectedAction, animateText };