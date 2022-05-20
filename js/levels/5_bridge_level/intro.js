var colSize = 2;
var columns = canvas.width / colSize;
var y =  Array(columns).fill(0);
var yIndex = [...Array(columns).keys()];

function introIn (ctx) {

  ctx.fillStyle = "white";

  for (let i = 0; i < columns; i++) {
    if (y[i] != 0 && y[i] < 400) {
      y[i] += 6;
    }
    ctx.fillRect(i * colSize, y[i], colSize, 400);
  }

  var cols = [];
  for (let i= 0; i < 4; i++)  {
    cols.push(Math.floor(Math.random() * yIndex.length));
  }

  cols.forEach((col, i) => {
    if (y[yIndex[col]] === 0) {
      y[yIndex[col]] += 6;
    }
    yIndex.splice(col, 1);
  });
}

export { introIn };
