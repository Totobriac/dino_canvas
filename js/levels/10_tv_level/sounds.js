import { sound } from "../../sound.js";

var reveal = new sound("./assets/10_tv/sounds/reveal.ogg", false);
var noLetter = new sound("./assets/10_tv/sounds/noLetter.ogg", false);

function soundPlayer(nb) {
	switch (nb) {
		case 0:
			reveal.volume(1);
			reveal.play();
			break;
		case 1:
			noLetter.volume(1);
			noLetter.play();
			break;
	}
}

export { soundPlayer };