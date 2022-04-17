import { getCursorPosition } from "../function.js";
import { addStep, stepDone } from "../tools.js";

import { sound } from "../../../sound.js";
var stoveSound = new sound("../assets/3_kitchen/sounds/stove.mp3", true);
import { playSound, stopSound } from "../sound.js";

var stoveSprite = new Image();
stoveSprite.src = "./assets/3_kitchen/stove.png";

var burner0Sprite = new Image();
burner0Sprite.src = "./assets/3_kitchen/burner_0.png";

var burner1Sprite = new Image();
burner1Sprite.src = "./assets/3_kitchen/burner_1.png";

var burner2Sprite = new Image();
burner2Sprite.src = "./assets/3_kitchen/burner_2.png";

var burner3Sprite = new Image();
burner3Sprite.src = "./assets/3_kitchen/burner_3.png";

var burner4Sprite = new Image();
burner4Sprite.src = "./assets/3_kitchen/burner_4.png";

var buttons = [880, 910, 950, 995, 1027];


var burners = [{
  sprite: burner0Sprite,
  isOn: false,
  x: 766,
  y: 222,
  width: 131,
  height: 109
}, {
  sprite: burner1Sprite,
  isOn: false,
  x: 766,
  y: 114,
  width: 131,
  height: 109
}, {
  sprite: burner2Sprite,
  isOn: false,
  x: 903,
  y: 114,
  width: 119,
  height: 217
}, {
  sprite: burner3Sprite,
  isOn: false,
  x: 1027,
  y: 114,
  width: 131,
  height: 109
}, {
  sprite: burner4Sprite,
  isOn: false,
  x: 1027,
  y: 223,
  width: 131,
  height: 109
}];

function getSelectedButton(e) {
  var mouse = getCursorPosition(e);
  var button;
  for (let i = 0; i < buttons.length; i++) {
    if (mouse.x < buttons[i] || mouse.x > buttons[i] + 18 ||
      mouse.y < 348 || mouse.y > 366) {
      var button = null;
    } else {
      burners[i].isOn = !burners[i].isOn;
    }
  }
  return button;
}

function drawStove(ctx) {
  ctx.drawImage(stoveSprite, 750, 100, 425, 280);

  if (stepDone === 1 && burners[3].isOn) addStep(2);
  if (stepDone === 5 && burners[2].isOn) addStep(6);

  burners.forEach(burner => {
    if (burner.isOn) {
      ctx.drawImage(burner.sprite, burner.x, burner.y, burner.width, burner.height);
    }
  });
  stoveSnd() ? playSound(stoveSound, 0.04) : stopSound(stoveSound);
}

function stoveSnd() {
  var check;
  for (let i = 0; i < burners.length; i++) {
    if (burners[i].isOn) {
      return true;
    } else {
      check = false;
    }
  }
  return check;
}

export { drawStove, getSelectedButton, burners };
