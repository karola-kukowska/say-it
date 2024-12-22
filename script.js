const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = false;

rec.onresult = function (e) {
	const acceptedColors = [
		"red",
		"blue",
		"green",
		"yellow",
		"pink",
		"brown",
		"purple",
		"orange",
		"black",
		"white",
		"gray",
		"violet",
	];

	for (let i = e.resultIndex; i < e.results.length; i++) {
		const script = e.results[i][0].transcript.toLowerCase().trim().split(" ");
		const img = document.querySelector(".card-img");
		const p = document.querySelector(".card-color--name");
		const d = document.querySelector(".card-color");
		const title = document.querySelector(".card-title");
		console.log(script);
		
		for (const word of script) {

			if (acceptedColors.includes(word)) {
				img.style.backgroundColor = word;
				p.textContent = word;
				p.style.color = word;
				d.classList.remove("hidden");
				title.classList.add("hidden");
				if (word == "white") {
					document.querySelector(".card-img--box").style.backgroundColor =
					"#DCF9F6";
				} else {
					document.querySelector(".card-img--box").style.backgroundColor =
					"white";
				}
				break;
			} else if (word == "reset") {
				d.classList.add("hidden");
				title.classList.remove("hidden");
			}
		}
	}
};

const synth = window.SpeechSynthesis;

function say(color) {
	const utterThis = new SpeechSynthesisUtterance(color);
	speechSynthesis.speak(utterThis);
}

window.addEventListener("keydown", (e) => {
	if (e.keyCode === 32) { 
		rec.start();
	}
	setTimeout(()=> rec.stop(), 10000);
})

// window.addEventListener("keyup", () => rec.stop()               )
