import { sound } from "../../sound.js";

var mainSound = new sound("../assets/8_zeldouille/sounds/overworld.mp3", true);


function playMainSound() {
  mainSound.volume(1);
  mainSound.play();
}

export { playMainSound };