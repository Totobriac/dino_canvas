var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');
tempCanvas.width = 700;
tempCanvas.height = 400;

var init = false;
var screenData;

if (!init) {
  tempCtx.fillStyle = "black";
  tempCtx.fillRect(0, 0, 700, 400);
  screenData = tempCtx.getImageData(0, 0, 700, 400);
  init = true;
}


function generateNoise(ctx) {
  var data = screenData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = Math.floor(Math.random() * 255);
  }

  tempCtx.putImageData(screenData, 0, 0);
  ctx.drawImage(tempCanvas, 250, 0);
}

export { generateNoise };