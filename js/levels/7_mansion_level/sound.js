import { sound } from "../../sound.js";

var ringSound = new sound("../assets/7_mansion/sounds/ring.mp3", false);
var pushPullSound = new sound("../assets/7_mansion/sounds/long_push_pull.mp3", false);
var tearTapeSound = new sound("../assets/7_mansion/sounds/tear_tape.mp3", false);
var tearIvySound = new sound("../assets/7_mansion/sounds/tear_ivy.mp3", false);
var walkingSound = new sound("../assets/7_mansion/sounds/footsteps.mp3", true);



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
      case "tearIvy":
        tearIvySound.volume(1);
        tearIvySound.play();
      case "walking":
        walkingSound.volume(0.5);
        walkingSound.play();
    }
    soundPlaying = true;
    oldSound = sound;
  }
}

function stopWalking() {
  walkingSound.stop();
  playSound(undefined);
}

export { playSound, stopWalking};
