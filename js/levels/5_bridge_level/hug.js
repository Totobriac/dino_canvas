var hug = new Image();
hug.src = "./assets/5_bridge/hug.png";

var tempCanvas = document.createElement('canvas');
var tempContext = tempCanvas.getContext('2d');

tempCanvas.width = 350;
tempCanvas.height = 350;

var init = false;
var imageData;
var alpha = 0;
var distortion = 20;

if (!init) {

  hug.onload = () => {
    tempContext.drawImage(hug, 0, 0, 350,350);
    imageData = tempContext.getImageData(0, 0, 350, 350);
    init = true;
  }
}

function addAlpha() {
  alpha += 0.8;
}

function drawHug(ctx) {  
  
  if (alpha > 90 && distortion > 0.1) distortion -= 0.1;

  var data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] != 0 || data[i + 1] != 0 || data[i + 2] != 0) {
      data[i + 3] = Math.floor(Math.random() * alpha * 3 + alpha);
    }
  };

  tempContext.putImageData(imageData, 0, 0);

  for (let i = 0; i < 350; i++) {
    ctx.drawImage(tempCanvas, 0, i, 350, 1, 375 + Math.sin(Math.random()) * distortion, i, 350, 1);
  }
}

export { drawHug, addAlpha };
