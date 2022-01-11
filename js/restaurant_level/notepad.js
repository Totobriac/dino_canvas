var notePadSprite = new Image();
notePadSprite.src = "../assets/restaurant_level/note.png";

function drawNotePad(ctx) {
  ctx.drawImage(notePadSprite,980,20)
}

export { drawNotePad }
