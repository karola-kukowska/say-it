const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = true;

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
		const script = e.results[i][0].transcript.toLowerCase().trim();
		const img = document.querySelector(".card-img");
		const p = document.querySelector(".card-color--name");
		const d = document.querySelector(".card-color");
		const title = document.querySelector(".card-title");

		// console.log(script);
		if (acceptedColors.includes(script)) {
			img.style.backgroundColor = script;
			p.textContent = script;
			p.style.color = script;
			d.classList.remove("hidden");
			title.classList.add("hidden");
			// if (script == "white") {
			// 	document.querySelector(".card-img--box").style.backgroundColor =
			// 		"#DCF9F6";
			// } else {
			// 	document.querySelector(".card-img--box").style.backgroundColor =
			// 		"white";
			// }
		} else if (script == "reset") {
			d.classList.add("hidden");
			title.classList.remove("hidden");
		}
	}
};

rec.start();
