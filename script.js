import data from "./data.json" with { type: "json" };

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = false;

rec.onresult = function (e) {
	//Create an array of color names from data.json
	const acceptedColors = data.colors.map(({name}) => name);
	
	//Create an array of recognized words
	const script = e.results[0][0].transcript.toLowerCase().trim().split(" ")
	console.log(script);

	//Active elements
	const prompt = document.getElementById("prompt");
	const answer = document.getElementById("answer");

	//Check recognized words against accepted colors
	for (const word of script) {
	if (acceptedColors.includes(word)) {
	//Print color name on screen
	if (!prompt.classList.contains("hidden")) {
		prompt.classList.add("hidden");
		answer.classList.remove("hidden");
	}
		answer.innerText = word;
		const colorValue = data.colors.find(n => n.name === word).hex || "#fff";
		answer.style.color = colorValue;
	//Change the color of an animal
	addFilter("pic", word);	
	}
}
};

function say(color) {
	const utterThis = new SpeechSynthesisUtterance(color);
	window.speechSynthesis.speak(utterThis);
}

//Start voice recognition
function record() {
	//Trigger record start
	rec.start();

	//add some indication if recording is active
	const text = document.getElementById("rec_btn_text");
	const spinner = document.getElementById("rec_btn_spinner");
	[text,spinner].forEach(n => n.classList.toggle("hidden"));

	//Remove indication of active sound record
	setTimeout(() => {
		[text,spinner].forEach(n => n.classList.toggle("hidden"));
	}, 4000);
}

//Change color of selected picture
function addFilter(elementId, color) {
	const pic = document.getElementById(elementId);
	const colorData = data.colors.find(({ name }) => name === color);
	if (colorData && colorData.filter) {
		 pic.style.filter = colorData.filter;
	}
}

//Changing script type to "module" makes it necassary to add onclik functions from within the script
window.onload = (e) => {
document.getElementById("rec_btn").onclick = () => {record();}
document.getElementById("repeat_btn").onclick = () => {say(document.getElementById("answer").innerText)};
};

