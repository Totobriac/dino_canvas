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

var glowR = 0;
var g
var countUp = true;

if (!init) {

  hug.onload = () => {
    tempContext.drawImage(hug, 0, 0, 350, 350);
    imageData = tempContext.getImageData(0, 0, 350, 350);
    init = true;
  }
}

function drawHug(ctx) {
  alpha += 1.02;
  if (alpha > 90 && distortion > 0.05) distortion -= 0.05;
  var data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] != 0 || data[i + 1] != 0 || data[i + 2] != 0) {
      data[i + 3] = Math.floor(Math.random() * alpha * 3 + alpha * 2);
    }
  };

  tempContext.putImageData(imageData, 0, 0);

  for (let i = 0; i < 350; i++) {
    ctx.drawImage(tempCanvas, 0, i, 350, 1, 375 + Math.sin(Math.random()) * distortion, i, 350, 1);
  }
  if (alpha > 90 && distortion < 0.05) {
    glow()
    ctx.save();
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = glowR;
    ctx.drawImage(hug,375, 1, 350, 350);
    ctx.restore();
  }
}

function glow() {
  countUp ? g = 0.2 : g = -0.2;
  glowR += g;  
  if (glowR > 25 || glowR < 0) countUp = !countUp;
}


export { drawHug };
