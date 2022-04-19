export function playSound(sound, volume) {
  sound.volume(volume);
  sound.play();
}

export function stopSound(sound) {
  sound.stop();
}

export function pauseSound(sound) {
  sound.pause();
}
