import { getCursorPosition, } from "./function.js";

var sinkSprite = new Image();
sinkSprite.src = "../assets/kitchen_level/sink.png";

var faucetOffSprite = new Image();
faucetOffSprite.src = "../assets/kitchen_level/faucet.png";

var faucetOnSprite = new Image();
faucetOnSprite.src = "../assets/kitchen_level/faucet_on.png";

var sinkIsOn = false;
var faucetSprite;
var waterLevel = 0;
var angle = 0;
var level = 0;

function checkFaucet(e) {
  var mouse = getCursorPosition(e);
  if (mouse.x < 50 && mouse.y < 50) {
    sinkIsOn = !sinkIsOn;
  }
}

function drawWater(ctx) {

  ctx.fillStyle = "rgba(39, 200, 245, 0.37)";

  
  if (sinkIsOn) {
    waterLevel += 0.25;
    if (waterLevel < 69) {      
      ctx.arc(125, 130, waterLevel, 0, 2 * Math.PI, false);
      ctx.fill();
    } else if (waterLevel >= 69 && angle <= 30) {
      angle += 0.3;
      ctx.beginPath();
      ctx.moveTo(194 + (angle * 2.2), 129 + (angle * -0.9));
      ctx.arcTo(194 + (angle * 2.2), 199 + (angle * 1.13), 56 + (angle * -0.33), 199 + (angle * 1.13), 70 + -angle);
      ctx.arcTo(56 + (angle * -0.33), 199 + (angle * 1.113), 56 + (angle * -0.33), 61, 70 + -angle);
      ctx.arcTo(56 + (angle * -0.33), 61, 194 + (angle * 2.2), 61, 70 + -angle);
      ctx.arcTo(194 + (angle * 2.2), 61, 194 + (angle * 2.45), 199 + (angle * 1.13), 70 + -angle);
      ctx.fill();
      console.log(waterLevel);
    } else if (waterLevel >= 93 && level <= 10) {
      console.log(level);
      level += 0.1;
      ctx.beginPath();
      ctx.moveTo(260 + (level * 1.5), 102 + (level * 3.3));
      ctx.arcTo(260 + (level * 1.5), 233, 46 + (level * -1.6), 233, 40);
      ctx.arcTo(46 + (level * -1.6), 233, 46 + (level * -1.6), 62, 40);
      ctx.arcTo(46 + (level * -1.6), 62 + (level * -2.7), 260 + (level * 1.5), 62 + (level * -2.7), 40);
      ctx.arcTo(260 + (level * 1.5), 62 + (level * -2.7), 263 + (level * 1.2), 233, 40);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(275, 135);
      ctx.arcTo(275, 234, 30, 234, 40);
      ctx.arcTo(30, 234, 30, 35, 40);
      ctx.arcTo(30, 35, 275, 35, 40);
      ctx.arcTo(275, 35, 275, 230, 40);
      ctx.fill();
    }
  }
}

function drawFaucet(ctx) {
  sinkIsOn === false ? faucetSprite = faucetOffSprite : faucetSprite = faucetOnSprite;
  ctx.drawImage(faucetSprite, -15, -10, 173, 159);
}

function drawSink(ctx) {
  ctx.drawImage(sinkSprite, 10, 10, 286, 243);
  drawWater(ctx);
  drawFaucet(ctx);
}

export {
  drawSink,
  checkFaucet
};
