import {
  servedDish, resetDish
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
    this.isWronglyServed = false;
  }
  getLine() {
    return Math.floor(this.index / 2);
  }
  getColumn() {
    return (this.index - this.line * 2);
  }
  getVariety() {
    return Math.floor(Math.random() * 16);
  }
}

class Note {
  constructor() {
    this.table = Math.floor(Math.random() * 21) + 1;
    this.customers = Math.floor(Math.random() * 5) + 1;
    this.dishes = this.getDishes();
  }
  getDishes() {
    var dishes = [];
    for (let i = 0; dishes.length < this.customers; i++) {
      var newDish = new Dish(i);
      if (dishSelection.includes(newDish.variety)) {
        i --;
        continue;
      } else {
        dishSelection.push(newDish.variety);
        dishes.push(newDish);
      }
    }
    return dishes;
  }
}

function generateNote(ctx, game) {

  if (game.level3Started === false) {
    notes.push(new Note());
    game.level3Started = true;
  }
  ctx.drawImage(notePadSprite, 980, 20);
  ctx.drawImage(smileSprite, 1005, 300, 150, 56);
  ctx.drawImage(cursorSprite, 1085, 347, 25, 25);
  ctx.font = "20px HandWritten";
  ctx.fillText(notes[0].table, 1050, 90);
  ctx.fillText(notes[0].customers, 1060, 105);

  checkIfServed();

  notes[0].dishes.forEach((dish, i) => {
    ctx.drawImage(foodSprite, dish.variety * 94, 0, 94, 100, 1000 + dish.column * 100, 105 + dish.line * 60, 70, 67);
    if (dish.isServed === true) {
      ctx.drawImage(checkSprite, 0, 0, 50, 38, 1010 + dish.column * 100, 125 + dish.line * 60, 50, 38);
    };
    if (dish.isWronglyServed === true) {
      ctx.drawImage(checkSprite, 50, 0, 50, 38, 1010 + dish.column * 100, 125 + dish.line * 60, 50, 38);
    };
  });
}

function checkIfServed() {
  for (let i = 0; i < notes[0].customers; i++) {
    if (notes[0].dishes[i].variety === servedDish) {
      notes[0].dishes[i].isServed = true;
      resetDish();
    } else {
      for (let i = 0; i < notes[0].customers; i++) {
        if (notes[0].dishes[i].isServed === false && notes[0].dishes[i].isWronglyServed === false && servedDish != undefined) {
          console.log(servedDish)
          notes[0].dishes[i].isWronglyServed = true;
          resetDish();
          return
        }
      }
    }
  }
}

export {
  generateNote,
  notes,
}
