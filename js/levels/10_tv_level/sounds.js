import { sound } from "../../sound.js";

var reveal = new sound("./assets/10_tv/sounds/reveal.ogg", false);
var noLetter = new sound("./assets/10_tv/sounds/noLetter.ogg", false);
var correct = new sound("./assets/10_tv/sounds/correct.ogg", false);

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
	}
}

export { soundPlayer };