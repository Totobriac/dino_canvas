import { servedDish } from "./plates.js";
import { left, top } from "../../script.js";
import { stopGame } from "./startLevel2.js";

var notePadSprite = new Image();
notePadSprite.src = "./assets/2_restaurant/note.png";

var smileSprite = new Image();
smileSprite.src = "./assets/2_restaurant/emotion.png";

var cursorSprite = new Image();
cursorSprite.src = "./assets/2_restaurant/cursor.png";

var foodSprite = new Image();
foodSprite.src = "./assets/2_restaurant/food.png";

var checkSprite = new Image();
checkSprite.src = "./assets/2_restaurant/check.png";

var note;
var mainNote = 0;
var tables = 0;
var dishSelection = [];


class Dish {
  constructor(index) {
    this.index = index;
    this.variety = this.getVariety();
    this.line = this.getLine();
    this.column = this.getColumn();
    this.isServed = false;
  }
  getLine() {
    return Math.floor(this.index / 2);
  }
  getColumn() {
    return (this.index - this.line * 2);
  }
  getVariety() {
    return Math.floor(Math.random() * 15);
  }
}

class Note {
  constructor() {
    this.table = Math.floor(Math.random() * 21) + 1;
    this.customers = Math.floor(Math.random() * 5) + 1;
    this.dishes = this.getDishes();
    this.note = 4;
  }
  getDishes() {
    var dishes = [];
    for (let i = 0; dishes.length < this.customers; i++) {
      var newDish = new Dish(i);
      if (dishSelection.includes(newDish.variety)) {
        i--;
        continue;
      } else {
        dishSelection.push(newDish.variety);
        dishes.push(newDish);
      }
    }
    return dishes;
  }
  updateNote(move) {
    if (this.note === 5 && move === 1) {
      this.note = 5;
    } else if (this.note === 1 && move === -1) {
      this.note = 1;
    } else {
      this.note += move;
    }
  }
  checkIfDone() {
    var done;
    for (let i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i].isServed === false) {
        return false;
      } else {
        done = true;
      }
    }
    tables++;
    return done;
  }
  checkIfServed(servedDish) {
    for (let i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i].variety === servedDish && !this.dishes[i].isServed) {
        this.dishes[i].isServed = true;
        return true;
      }
    }
    return false;
  }
}

function generateNote(ctx, game) {

  if (game.loadedLevel[2] === false) {
    note = new Note();
    game.loadedLevel[2] = true;
  }
  
  ctx.drawImage(notePadSprite, 980 + left, 20 + top);
  ctx.drawImage(smileSprite, 1005 + left, 300 + top, 150, 56);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  for (let i = 0; i < 3; i++) {
    ctx.strokeRect(20 + left, 40 + 49 * i + top, 40, 40);
  }

  for (let i = 0; i < mainNote; i++) {
    ctx.drawImage(checkSprite, 0, 0, 50, 38, 16 + left, 40 + 49 * i + top, 50, 38);
  }

  drawCursor(ctx);

  ctx.fillStyle = "black";
  ctx.font = "20px HandWritten";
  ctx.fillText(note.table, 1050 + left, 90 + top);
  ctx.fillText(note.customers, 1060 + left, 105 + top);

  note.dishes.forEach((dish) => {
    ctx.drawImage(foodSprite, dish.variety * 94 + 94, 0, 94, 100, 1000 + dish.column * 100 + left, 105 + dish.line * 60 + top, 70, 67);
    if (dish.isServed === true) {
      ctx.drawImage(checkSprite, 0, 0, 50, 38, 1010 + dish.column * 100 + left, 125 + dish.line * 60 + top, 50, 38);
    };
  });

  if (note.checkIfDone()) {
    if (note.note >= 4) mainNote++;
    note = new Note;
    if (mainNote === 1) stopGame();
  }
}

function drawCursor(ctx) {
  ctx.drawImage(cursorSprite, 980 + note.note * 30 + left, 347 + top, 25, 25);
}


export { note, generateNote };
