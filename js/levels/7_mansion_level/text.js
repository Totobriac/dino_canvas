var errorTxt = [
  " Vous êtes sur? ",
  " Cela ne fonctionne pas. ",
  " Il ne se passe rien. ",
  " Pourquoi faire cela? ",
  " Ce n'est pas une bonne idée. "
];

var introText = " Nous y voilà! On dirait le vieux château. ";

var dial = [];


function drawText(ctx, text) {
  var lines = getLines(text);
  lines.forEach((line, i) => {
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.font = "50px Pixeboy";
    var width = ctx.measureText(line).width;
    ctx.fillStyle = "black";
    ctx.fillRect(20, 20 + i * 40, width, 36);
    ctx.fillStyle = "orange";
    ctx.fillText(line, 20, i * 40);
  });
}

function getLines(text) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = (currentLine + " " + word).length;

    if (width < 36) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function dialogue(ctx, hoveredSprite) {
  dial.forEach((choice, i) => {
    ctx.textBaseline = "top";
    ctx.textAlign = "start";
    ctx.font = "40px Pixeboy";
    var width = ctx.measureText(choice).width;
    var num = i + 1;
    hoveredSprite && hoveredSprite.name === "answer" + num.toString() ? ctx.fillStyle = "orange" : ctx.fillStyle = "transparent";
    ctx.fillRect(40, 70 + i * 50, width, 40);
    hoveredSprite && hoveredSprite.name === "answer" + num.toString() ? ctx.fillStyle = "black" : ctx.fillStyle = "orange";
    ctx.fillText(choice, 40, 60 + i * 50);
  });
}

function setDial(dl) {
  dial = dl;
}

export { drawText, introText, errorTxt, dialogue, setDial };