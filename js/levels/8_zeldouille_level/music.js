import { sound } from "../../sound.js";

var vol = 1;

var mainSound = new sound("./assets/8_zeldouille/sounds/overworld.mp3", true);
var stairsSound = new sound("./assets/8_zeldouille/sounds/stairs.wav", false);
var getSwordSound = new sound("./assets/8_zeldouille/sounds/getSword.wav", false);
var textSound = new sound("./assets/8_zeldouille/sounds/text.wav", false);
var swordSound = new sound("./assets/8_zeldouille/sounds/sword.wav", false);
var dyingEnemySound = new sound("./assets/8_zeldouille/sounds/enemyDie.wav", false);
var hurtSound = new sound("./assets/8_zeldouille/sounds/hurt.wav", false);
var getPotionSound = new sound("./assets/8_zeldouille/sounds/getPotion.wav", false);
var ganonCaveSound = new sound("./assets/8_zeldouille/sounds/ganonDungeon.mp3", false);
var ganonDefeatedSound = new sound("./assets/8_zeldouille/sounds/ganonDefeated.mp3", false);
var ganonScreamSound = new sound("./assets/8_zeldouille/sounds/scream.wav", false);
var keyAppearsSound = new sound("./assets/8_zeldouille/sounds/keyAppears.wav", false);
var ganonHitSound = new sound("./assets/8_zeldouille/sounds/ganonHit.wav", false);
var lifeAlarmSound = new sound("./assets/8_zeldouille/sounds/lifeAlarm.mp3", false);
var linkDying = new sound("./assets/8_zeldouille/sounds/linkDying.wav", false);


function playSound(sound) {
  switch (sound) {
    case 1:
      mainSound.volume(vol);
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
    case 10:
      ganonCaveSound.volume(1);
      ganonCaveSound.play();
      break;
    case 11:
      ganonDefeatedSound.volume(1);
      ganonDefeatedSound.play();
      break;
    case 12:
      ganonScreamSound.volume(1);
      ganonScreamSound.play();
      break;
    case 13:
      ganonCaveSound.stop();
      break;
    case 14:
      keyAppearsSound.volume(1);
      keyAppearsSound.play();
      break;
    case 15:
      ganonHitSound.volume(1);
      ganonHitSound.play();
      break;
    case 16:
      mainSound.stop();
      break;
    case 17:
      lifeAlarmSound.volume(1);
      lifeAlarmSound.play();
      break;
    case 18:
      lifeAlarmSound.stop();
      break;
    case 19:
      linkDying.volume(1);
      linkDying.play();
      break;
    case 20:
      linkDying.stop();
      break;
    case 21:
      var isPlaying;
      if (vol > 0.01) vol -= 0.007;      
      vol > 0.01 ? isPlaying = true : isPlaying = false;
      return isPlaying;
    case 22:
      mainSound.stop();
  }
}

export { playSound };
