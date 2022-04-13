export function sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 0;
  this.loop = loop;
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
  this.load = function () {
    this.sound.load();
  }
  this.volume = function (vol) {
    this.sound.volume = vol;
  }
  this.loop = function (loop) {
    this.loop = loop;
  }
}
