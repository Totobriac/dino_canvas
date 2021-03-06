export function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 0;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
  this.volume = function (vol) {
    this.sound.volume = vol;
  }
}
