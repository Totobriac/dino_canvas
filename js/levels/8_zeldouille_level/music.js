import { sound } from "../../sound.js";

var mainSound = new sound("../assets/8_zeldouille/sounds/overworld.mp3", true);
var stairsSound = new sound("../assets/8_zeldouille/sounds/stairs.wav", false);
var getSwordSound = new sound("../assets/8_zeldouille/sounds/getSword.wav", false);
var textSound = new sound("../assets/8_zeldouille/sounds/text.wav", false);


function playSound(sound) {
  switch(sound) {
    case 1:
      mainSound.volume(1);      
      mainSound.play();
      break;
    case 2:
      stairsSound.volume(1);
      stairsSound.play();
      break;
    case 3:
      getSwordSound.volume(1);
      getSwordSound.play();
      break;
    case 4:
      textSound.volume(1);
      textSound.rate(4);     
      textSound.play();
  }

}


export { playSound };