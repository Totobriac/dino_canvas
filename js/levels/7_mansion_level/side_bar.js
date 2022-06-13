import { Sprite } from "./sprite.js";
import { drawText, hoveredSprite } from "./gameMecanic.js";
import { leavePoster, objects, isReadingPoster } from "./actions.js";

var actionsList =
  ["Pousser", "Tirer", "Ouvrir", "Fouiller", "Annuler",
  "Prendre", "Utiliser", "Allumer", "Eteindre", "Regarder"];

var actions = [];
var maxTick = 3;
var tick = 0;
var filter = 0;
var oldSelection;
var selectedAction;

var objectsList = [];

var selectedObject;

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

export function drawActions(ctx, game, gameBegun) {
  if (!game.loadedLevel[7]) {
    createActions(ctx);
    game.loadedLevel[7] = true;
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(895, 0, 305, 400)
  for (let i = 0; i < actions.length; i++) {
    actions[i].draw();
  }
  if (gameBegun) checkAction(game.mousePosition, game.mouseMovePosition, ctx);
  ctx.filter = "none";

  drawObjects(ctx);
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
      if (i === 4 && isReadingPoster == true) leavePoster();

      if (i === 4) {
        selectedAction = undefined;
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
  if (mouse.y > 255 && mouse.x > 896 && oldSelection != undefined) {
    actions[oldSelection].filter = "none";
    checkObject(mouse, ctx);
  }
}

function drawObjects(ctx) {
  objectsList = [];
  ctx.fillStyle = "purple";
  ctx.fillRect(900, 255, 295, 140);
  var oY = 3;
  for (let i = 0; i < objects.length; i++) {
    if (i < 4) {
      var object = new Sprite(objects[i][0], objects[i][1], 900 + (i * 70) + oY, 260, 1, 1, 140, 120, 0.5, objects[i][2]);
      objectsList.push(object);
      object.draw(ctx);
      oY += 3;
    }
  }
}

function checkObject(mouse, ctx) {
  for (let i = 0; i < objectsList.length; i++) {
    if ((mouse.x > objectsList[i].x && mouse.x < objectsList[i].x + objectsList[i].spriteWidth * objectsList[i].scale) &&
      (mouse.y > objectsList[i].y && mouse.y < objectsList[i].y + objectsList[i].spriteHeight * objectsList[i].scale)) {
      selectedObject = objectsList[i];
    }
    if (selectedAction === "Utiliser" && selectedObject) {
      var text;
      var articleObj;
      selectedObject.male ? articleObj = "le " : articleObj = "la ";
      var articleSpr;
      hoveredSprite && hoveredSprite.gender ? articleSpr = "le " : articleSpr = "la ";
      hoveredSprite
        ? text = "Utiliser " + articleObj + selectedObject.name + " avec " + articleSpr + hoveredSprite.name
        : text = "Utiliser " + articleObj + selectedObject.name + " avec ... ";
      drawText(ctx, text);
    }
    else {
      selectedObject = null;
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

function resetAction() {
  selectedAction = undefined;
  if (oldSelection != undefined) {
    actions[oldSelection].filter = "none";
    oldSelection = null;
  }
}

function resetObject() {
  selectedObject = null;
}

export { selectedAction, resetAction, selectedObject, resetObject };
