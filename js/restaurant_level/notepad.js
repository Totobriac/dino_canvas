import {
  servedDish,
} from "./plates.js";

var notePadSprite = new Image();
notePadSprite.src = "../assets/restaurant_level/note.png";

var smileSprite = new Image();
smileSprite.src = "../assets/restaurant_level/emotion.png";

var cursorSprite = new Image();
cursorSprite.src = "../assets/restaurant_level/cursor.png";

var foodSprite = new Image();
foodSprite.src = "../assets/restaurant_level/food.png";

var checkSprite = new Image();
checkSprite.src = "../assets/restaurant_level/check.png";


var notes = [];
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
    if (this.note > 1 && this.note < 5) {
      this.note += move;
    }
  }
  checkIfDone() {
    for (let i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i].isServed === false) {
        return false;
      } else {
        return true;
      }
    }
  }
}

function generateNote(ctx, game) {

  if (game.level3Started === false) {
    notes.push(new Note());
    game.level3Started = true;
  }
  ctx.drawImage(notePadSprite, 980, 20);
  ctx.drawImage(smileSprite, 1005, 300, 150, 56);

  drawCursor(ctx),

  ctx.font = "20px HandWritten";
  ctx.fillText(notes[0].table, 1050, 90);
  ctx.fillText(notes[0].customers, 1060, 105);

  if (servedDish != undefined) checkIfServed();

  notes[0].dishes.forEach((dish, i) => {
    ctx.drawImage(foodSprite, dish.variety * 94 + 94, 0, 94, 100, 1000 + dish.column * 100, 105 + dish.line * 60, 70, 67);
    if (dish.isServed === true) {
      ctx.drawImage(checkSprite, 0, 0, 50, 38, 1010 + dish.column * 100, 125 + dish.line * 60, 50, 38);
    };
  });

  var isDone = notes[0].checkIfDone();
  console.log(isDone)
}

function checkIfServed() {
  for (let i = 0; i < notes[0].dishes.length; i++) {
    if (notes[0].dishes[i].variety === servedDish && notes[0].dishes[i].isServed === false) {
      notes[0].dishes[i].isServed = true;
      notes[0].updateNote(2);
      return
    }
  }
}

function drawCursor(ctx) {
  ctx.drawImage(cursorSprite, 980 + notes[0].note * 30, 347, 25, 25);
}

export {
  generateNote,
  notes,
}
