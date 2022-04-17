import { getCursorPosition, } from "../function.js";
import { sound } from "../../../sound.js";
import { playSound, stopSound } from "../sound.js";


var tapSound = new sound("../assets/3_kitchen/sounds/tap.mp3", true);
var drainSound = new sound("../assets/3_kitchen/sounds/sink_drain_sm.mp3", true);

var sinkSprite = new Image();
sinkSprite.src = "./assets/3_kitchen/sink.png";

var faucetOffSprite = new Image();
faucetOffSprite.src = "./assets/3_kitchen/faucet.png";

var faucetOnSprite = new Image();
faucetOnSprite.src = "./assets/3_kitchen/faucet_on.png";

var buttonOpenSprite = new Image();
buttonOpenSprite.src = "./assets/3_kitchen/sink_button_open.png";

var buttonSprite = new Image();
buttonSprite.src = "./assets/3_kitchen/sink_button.png";

class Sink {
  constructor() {
    this.sinkIsOn = false;
    this.drainOpen = true;
    this.faucetSprite;
    this.waterLevel = 0;
    this.oldWaterLevel = 0;
    this.angle = 0;
    this.level = 0;
    this.faucet = true;
    this.overFlowded = false;
  }
  checkFaucet(e) {
    var mouse = getCursorPosition(e);
    if (mouse.x < 50 && mouse.y < 50) {
      this.sinkIsOn = !this.sinkIsOn;
    }
  }
  checkDrain(e) {
    var mouse = getCursorPosition(e);
    if (mouse.y < 62 && mouse.y > 2 &&
      mouse.x > 290 && mouse.x < 350) {
      this.drainOpen = !this.drainOpen;
    }
  }
  drawWater(ctx) {

    this.oldWaterLevel += this.waterLevel
    this.sinkIsOn ? playSound(tapSound, 0.3) : stopSound(tapSound);

    this.drainOpen && this.waterLevel > 0.25 ? playSound(drainSound, 0.22) : stopSound(drainSound);

    ctx.fillStyle = "rgba(39, 200, 245, 0.27)";
    if (this.sinkIsOn && !this.drainOpen) {
      this.waterLevel += 0.25;
    }

    if (this.waterLevel < 69) {
      if (!this.drainOpen) {
        ctx.beginPath();
        ctx.arc(125, 130, this.waterLevel, 0, 2 * Math.PI, false);
        ctx.fill();
      }
      else if (this.drainOpen && this.waterLevel > 0.25) {
        this.waterLevel -= 0.25;
        ctx.beginPath();
        ctx.arc(125, 130, this.waterLevel, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }

    else if (this.waterLevel >= 69 && this.waterLevel < 93 && this.angle <= 30) {

      if (this.sinkIsOn && !this.drainOpen) this.angle += 0.3;

      if (this.sinkIsOn && this.overFlowded) {
        this.angle += 0.3;
        this.waterLevel += 0.25;
      };

      if (this.sinkIsOn && this.drainOpen && !this.overFlowded) {
        this.angle -= 0.3;
        this.waterLevel -= 0.25;
      };

      if (!this.sinkIsOn && this.drainOpen) {
        this.angle -= 0.3;
        this.waterLevel -= 0.25;
      };

      ctx.beginPath();
      ctx.moveTo(194 + (this.angle * 2.2), 129 + (this.angle * -0.9));
      ctx.arcTo(194 + (this.angle * 2.2), 199 + (this.angle * 1.13), 56 + (this.angle * -0.33), 199 + (this.angle * 1.13), 70 + -this.angle);
      ctx.arcTo(56 + (this.angle * -0.33), 199 + (this.angle * 1.113), 56 + (this.angle * -0.33), 61, 70 + -this.angle);
      ctx.arcTo(56 + (this.angle * -0.33), 61, 194 + (this.angle * 2.2), 61, 70 + -this.angle);
      ctx.arcTo(194 + (this.angle * 2.2), 61, 194 + (this.angle * 2.45), 199 + (this.angle * 1.13), 70 + -this.angle);
      ctx.fill();
    }

    else if (this.waterLevel >= 93 && this.waterLevel <= 118 && this.level <= 10) {
      if (this.sinkIsOn && !this.drainOpen) this.level += 0.1;
      if (this.sinkIsOn && this.overFlowded) this.level += 0.1;
      if (this.drainOpen && !this.overFlowded) {
        this.level -= 0.1;
        this.waterLevel -= 0.25;
      }

      ctx.beginPath();
      ctx.moveTo(260 + (this.level * 1.5), 102 + (this.level * 3.3));
      ctx.arcTo(260 + (this.level * 1.5), 233, 46 + (this.level * -1.6), 233, 40);
      ctx.arcTo(46 + (this.level * -1.6), 233, 46 + (this.level * -1.6), 62, 40);
      ctx.arcTo(46 + (this.level * -1.6), 62 + (this.level * -2.7), 260 + (this.level * 1.5), 62 + (this.level * -2.7), 40);
      ctx.arcTo(260 + (this.level * 1.5), 62 + (this.level * -2.7), 263 + (this.level * 1.2), 233, 40);
      ctx.fill();
    }
    else {
      if (!this.drainOpen || this.overFlowded) {
        ctx.beginPath();
        ctx.moveTo(275, 135);
        ctx.arcTo(275, 234, 30, 234, 40);
        ctx.arcTo(30, 234, 30, 35, 40);
        ctx.arcTo(30, 35, 275, 35, 40);
        ctx.arcTo(275, 35, 275, 230, 40);
        ctx.fill();
      }
      if (this.drainOpen) {
        this.waterLevel = 118;
        this.level = 10;
      }
    }
  }
  overFlow() {
    if (!this.overFlowded) {
      this.waterLevel = 72;
      this.angle = 3.6;
      this.overFlowded = true;
    }
  }
  drawFaucet(ctx) {
    if (this.faucet === true) {
      this.sinkIsOn === false ? this.faucetSprite = faucetOffSprite : this.faucetSprite = faucetOnSprite;
      ctx.drawImage(this.faucetSprite, -15, -10, 173, 159);
    }
  }
  drawSink(ctx) {
    var button;
    if (this.drainOpen === true) {
      ctx.fillStyle = "black";
      button = buttonOpenSprite;
    } else {
      ctx.fillStyle = "white";
      button = buttonSprite;
    }

    ctx.drawImage(button, 290, 2, 60, 60);
    ctx.fillRect(120, 70, 70, 70);
    ctx.drawImage(sinkSprite, 10, 10, 286, 243);
    this.drawWater(ctx);

  }
}

export { Sink };
