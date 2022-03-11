var bridge = new Image();
bridge.src = "./assets/bridge_level/pont_big.png";

var frame = 0;
var bridgeHeight = 195;

export function generateBridge(ctx) {

  if (frame < 500) {
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, 195, canvas.width, canvas.height);
    frame++;
  }
  else if (frame >= 500 && frame < 900) {
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, bridgeHeight += 0.16, canvas.width, canvas.height);
    frame++;
  }
  else {
    ctx.globalAlpha = 1;
    ctx.drawImage(bridge, 300, 95, 600, 195, 0, 259, canvas.width, canvas.height);
  }
}
