import { sound } from "../../sound.js";
import { isRunningWater } from "./actions.js";

var ringSound = new sound("../assets/7_mansion/sounds/ring.mp3", false);
var pushPullSound = new sound("../assets/7_mansion/sounds/long_push_pull.mp3", false);
var tearTapeSound = new sound("../assets/7_mansion/sounds/tear_tape.mp3", false);
var tearIvySound = new sound("../assets/7_mansion/sounds/tear_ivy.mp3", false);
var walkingSound = new sound("../assets/7_mansion/sounds/footsteps.mp3", true);
var grabLidSound = new sound("../assets/7_mansion/sounds/grab_lid.mp3", false);
var fountSound = new sound("../assets/7_mansion/sounds/fountain.mp3", false);
var grabTinSound = new sound("../assets/7_mansion/sounds/pickup_tin.mp3", false);
var emptyWaterSound = new sound("../assets/7_mansion/sounds/pickup_water.mp3", false);
var searchSound = new sound("../assets/7_mansion/sounds/search.mp3", false);
var lighteningSound = new sound("../assets/7_mansion/sounds/light.mp3", false);


var soundPlaying = false;
var oldSound = undefined;

function playSound(sound) {
  sound != oldSound ? soundPlaying = false : soundPlaying = true;
  if (!soundPlaying) {
    switch (sound) {
      case "ring":
      case "ring ":
        ringSound.volume(1);
        ringSound.play();
        break;
      case "pushPull":
        pushPullSound.volume(1);
        pushPullSound.play();
        break;
      case "tearTape":
        tearTapeSound.volume(1);
        tearTapeSound.play();
        break;
      case "tearIvy":
        tearIvySound.volume(1);
        tearIvySound.play();
        break;
      case "grabLid":
        grabLidSound.volume(1);
        grabLidSound.play();
        break;
      case "grabTin":
        grabTinSound.volume(1);
        grabTinSound.play();
        break;
      case "grabWater":
        emptyWaterSound.volume(1);
        emptyWaterSound.play();
      break;
      case "search":
        searchSound.volume(1);
        searchSound.play();
      break;
      case "light":
        lighteningSound.volume(1);
        lighteningSound.play();
    }
    soundPlaying = true;
    oldSound = sound;
  }
}

function fountainSound (dino) {
  fountSound.volume(0.1);
  dino.x < 300 && isRunningWater ? fountSound.play() : fountSound.stop();
}

function walkSound (dino, isReadingPoster) {
  walkingSound.volume(0.2);
  dino.isMoving && !isReadingPoster? walkingSound.play() : walkingSound.stop();
}

export { playSound, walkSound, fountainSound };
