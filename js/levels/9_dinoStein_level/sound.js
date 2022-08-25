function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 1;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.loop = false;

  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
    this.sound.currentTime = 0
  }
  this.volume = function(vol) {
    this.sound.volume = vol;
  }
}

class SoundPlayer {
  constructor() {
    this.doorSound = new sound("./assets/9_dinoStein/sounds/door.mp3");
    this.theme = new sound("./assets/9_dinoStein/sounds/main_theme.mp3");
    this.knifeSound = new sound("./assets/9_dinoStein/sounds/knife2.mp3");
    this.pistolSound = new sound("./assets/9_dinoStein/sounds/pistol.mp3");
    this.machineGunSound = new sound("./assets/9_dinoStein/sounds/machineGun.mp3");
    this.gatlingGunSound = new sound("./assets/9_dinoStein/sounds/gatling.mp3");
  }
  mainTheme() {
    this.theme.play();
  }
  door() {
    this.doorSound.play();
  }
  knife() {
    this.knifeSound.play();
  }
  pistol() {
    this.pistolSound.play();
  }
  machineGun() {
    this.machineGunSound.play();
  }
  gatlingGun() {
    this.gatlingGunSound.play();
  }
}

export { SoundPlayer, sound };
