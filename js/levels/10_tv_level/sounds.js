import { sound } from "../../sound.js";

var reveal = new sound("./assets/10_tv/sounds/reveal.ogg", false);
var noLetter = new sound("./assets/10_tv/sounds/noLetter.ogg", false);
var correct = new sound("./assets/10_tv/sounds/correct.ogg", false);
var title = new sound("./assets/10_tv/sounds/wheel.mp3", true);
var derrick = new sound("./assets/10_tv/sounds/derrick.mp3", true);
var noSignal = new sound("./assets/10_tv/sounds/noSignal.mp3", true);
var tvNoise = new sound("./assets/10_tv/sounds/tvNoise.mp3", true);


function soundPlayer(nb) {
	switch (nb) {
		case 0:
			reveal.volume(0.7);
			reveal.play();
			break;
		case 1:
			noLetter.volume(0.7);
			noLetter.play();
			break;
		case 2:
			correct.volume(1);
			correct.play();
			break;
		case 3:
			title.volume(1);
			title.play();
			break;
		case 4:
			title.pause();
			title.currentTime = 0;
			break;
		case 5:
			derrick.volume(1);
			derrick.play();
			break;
		case 6:
			noSignal.volume(1);
			noSignal.play();			
			break;
		case 7:
			noSignal.pause();
			noSignal.currentTime = 0;
			break;
		case 8:
			tvNoise.volume(1);
			tvNoise.play();
			break;
		case 9:
			tvNoise.pause();
			tvNoise.currentTime = 0;
			break;
	}
}

export { soundPlayer };
