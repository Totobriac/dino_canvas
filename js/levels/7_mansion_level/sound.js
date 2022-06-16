import { sound } from "../../sound.js";
import { isRunningWater } from "./actions.js";

var ringSound = new sound("../assets/7_mansion/sounds/ring.mp3", false);
var pushPullSound = new sound("../assets/7_mansion/sounds/long_push_pull.mp3", false);
var tearTapeSound = new sound("../assets/7_mansion/sounds/tear_tape.mp3", false);
var tearIvySound = new sound("../assets/7_mansion/sounds/tear_ivy.mp3", false);
var walkingSound = new sound("../assets/7_mansion/sounds/footsteps.mp3", true);
var grabLidSound = new sound("../assets/7_mansion/sounds/grab_lid.mp3", false);
var fountSound = new sound("../assets/7_mansion/sounds/fountain.mp3", false);


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
      case "walking":
        walkingSound.volume(0.2);
        walkingSound.play();
        break;
      case "grabLid":
        grabLidSound.volume(1);
        grabLidSound.play();
        break;
    }
    soundPlaying = true;
    oldSound = sound;
  }
}

function fountainSound (dino) {
  fountSound.volume(0.1);
  dino.x < 300 && isRunningWater ? fountSound.play() : fountSound.stop();
}

function stopWalking() {
  walkingSound.stop();
  playSound(undefined);
}

export { playSound, stopWalking, fountainSound };
