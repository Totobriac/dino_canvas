import {getCursorPosition} from "./function.js";

var sinkSprite = new Image();
sinkSprite.src = "../assets/kitchen_level/sink.png";

var faucetOffSprite = new Image();
faucetOffSprite.src = "../assets/kitchen_level/faucet.png";

var faucetOnSprite = new Image();
faucetOnSprite.src = "../assets/kitchen_level/faucet_on.png";

var sinkIsOn = false;

function checkFaucet(e) {
  var mouse = getCursorPosition(e);
  if (mouse.x < 50 && mouse.y < 50) {
    sinkIsOn = ! sinkIsOn;
  }
}




export {
  sinkSprite,
  faucetOffSprite,
  faucetOnSprite,
  sinkIsOn,
  checkFaucet,
};
