var notePadSprite = new Image();
notePadSprite.src = "../assets/restaurant_level/note.png";

var smileSprite = new Image();
smileSprite.src = "../assets/restaurant_level/emotion.png";

var cursorSprite = new Image();
cursorSprite.src = "../assets/restaurant_level/cursor.png";

const foodSprite = new Image();
foodSprite.src = "../assets/restaurant_level/food.png"

var notes = [];

class Dish {
  constructor(index) {
    this.index = index;
    this.variety = this.getVariety();
    this.line = this.getLine();
    this.column = this.getColumn();
  }
  getLine() {
    return Math.floor(this.index / 2);
  }
  getColumn() {
    return ( this.index - this.line * 2);
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
    for (let i = 0; i < this.customers; i++) {
      dishes.push( new Dish(i))
    }
    console.log(dishes)
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
  notes[0].dishes.forEach((dish, i) => {
    ctx.drawImage(foodSprite, dish.variety * 94, 0, 94, 100, 1000 + dish.column * 100, 105 + dish.line * 60, 70, 67);
  });

}

export {
  generateNote
}
