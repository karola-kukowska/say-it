import data from "./data.json" with { type: "json" };

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = false;

rec.onresult = function (e) {
	//Create an array of color names from data.json
	const acceptedColors = data.colors.map(({ name }) => name);

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
	[text, spinner].forEach(n => n.classList.toggle("hidden"));

	//Remove indication of active sound record
	setTimeout(() => {
		[text, spinner].forEach(n => n.classList.toggle("hidden"));
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
	if (window.location.pathname === "/index.html") {
		document.getElementById("rec_btn").onclick = () => { record(); }
		document.getElementById("repeat_btn").onclick = () => { say(document.getElementById("answer").innerText) };
	} else if (window.location.pathname === "/test.html") {
		document.getElementById("start_btn").onclick = () => { startTest() };
	}
};

//Test Page


function startTest() {
	//hide button & show game panel
	document.getElementById("start_btn").classList.add("hidden");
	document.getElementById("game").classList.remove("hidden");

	startGame();
	//??add onclick functions to btns?
}

function startGame() {
	//draw 4 animals (max 2 same) and 4 colors (all different)
	//display search term
	//add say it back speech

	//display four animals
	/* game Data blueprint:
	[{
		animal: "dog",
		color: "blue",
		url: "",
		filter: "",
		order: ""
	}]
	*/
	const gameData = createGameData();
	console.log(gameData);

	//check for click on correct animal
	//hoover effect bright
	//fanfare
	//??fade out for incorrect

	//allow new game if guessed correctly - remove disabled
}

function createGameData() {
	const selectColor = () => {
		const arr = data.colors.map(({ name }) => name);
		const n = Math.floor(Math.random() * arr.length);
		return arr[n] || "black";
	}

	const selectAnimal = () => {
		const arr = data.animals.map(({ name }) => name);
		const n = Math.floor(Math.random() * arr.length);
		return arr[n];
	}

	const generateArray = (num, generatorFn) => {
		let values = new Set();
		while (values.size < num) {
			values.add(generatorFn());
		}
		return Array.from(values);
	}

	let gameData = [];
	const colors = generateArray(4, selectColor);
	const animals = generateArray(4, selectAnimal);
	const orderArr = generateArray(4, () => { return Math.floor(Math.random() * 4 + 1) })
	for (let i = 0; i < colors.length; i++) {
		let color = colors[i];
		let animal = animals[i];
		let order = orderArr[i]
		let url = data.animals.find(n => n.name === animal).img_nobg;
		let filter = data.colors.find(n => n.name === color).filter;
		gameData.push({ color, animal, url, filter, order })
	}
	return gameData;
};



startGame();
