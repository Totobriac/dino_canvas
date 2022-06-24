import { sound } from "../../sound.js";

var mainSound = new sound("../assets/8_zeldouille/sounds/overworld.mp3", true);
var stairsSound = new sound("../assets/8_zeldouille/sounds/stairs.wav", false);
var getSwordSound = new sound("../assets/8_zeldouille/sounds/getSword.wav", false);
var textSound = new sound("../assets/8_zeldouille/sounds/text.wav", false);
var swordSound = new sound("../assets/8_zeldouille/sounds/sword.wav", false);
var dyingEnemySound = new sound("../assets/8_zeldouille/sounds/enemyDie.wav", false);
var hurtSound = new sound("../assets/8_zeldouille/sounds/hurt.wav", false);
var getPotionSound = new sound("../assets/8_zeldouille/sounds/getPotion.wav", false);


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
      textSound.play();
      break;
    case 5:
      textSound.stop();
      break;
    case 6:
      swordSound.volume(1);
      swordSound.play();
      break;
    case 7:
      dyingEnemySound.volume(1);
      dyingEnemySound.play();
      break;
    case 8:
      hurtSound.volume(1);
      hurtSound.play();
      break;
    case 9:
      getPotionSound.volume(1);
      getPotionSound.play();
      break;
  }

}


export { playSound };