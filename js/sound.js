export function sound(src, loop, callBack) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 0;
  this.loop = loop;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.callBack = callBack;

  document.body.appendChild(this.sound);

  this.play =  () => {
    this.sound.play();
  }
  this.stop =  () => {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
  this.pause =  () => {
    this.sound.pause();
  }
  this.load =  () => {
    this.sound.load();
  }
  this.volume = (vol) => {
    this.sound.volume = vol;
  }
  this.loop =  (loop) => {
    this.loop = loop;
  }
  this.rate =  (rate) => {
    this.sound.playbackRate = rate;
  }
}
