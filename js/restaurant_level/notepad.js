var notePadSprite = new Image();
notePadSprite.src = "../assets/restaurant_level/note.png";

var smileSprite = new Image();
smileSprite.src = "../assets/restaurant_level/emotion.png";

var cursorSprite = new Image();
cursorSprite.src = "../assets/restaurant_level/cursor.png";

const foodSprite = new Image();
foodSprite.src = "../assets/restaurant_level/food.png"

var notes = [];

class Note {
  constructor() {
    this.table = Math.floor(Math.random() * 21) + 1;
    this.customers = Math.floor(Math.random() * 5) + 1;
    this.dishes = this.getDishes();
  }
  getDishes() {
    var dishes = [];
    for (let i = 0; i < this.customers; i++) {
      dishes.push( Math.floor(Math.random() * 16))
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
  notes[0].dishes.forEach((dish, i) => {
    ctx.drawImage(foodSprite, dish * 94, 0, 94, 100, 1060 + (10 * i), 205, 70, 67);
  });

}

export {
  generateNote
}
