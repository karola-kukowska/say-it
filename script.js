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
window.onload = () => {
	const path = window.location.pathname.replace(/\/$/, "");
	if (path === "/index.html" || path === "") {
		document.getElementById("rec_btn").onclick = () => { record(); }
		document.getElementById("repeat_btn").onclick = () => { say(document.getElementById("answer").innerText) };
	} else if (path === "/test.html" || path === "/test") {
		document.getElementById("start_btn").onclick = () => { startTest() };
	}
};

//Test Page


function startTest() {
	//hide button & show game panel
	document.getElementById("start_btn").classList.add("hidden");
	document.getElementById("game").classList.remove("hidden");

	startGame();
	//add onclick function to new game btn
	document.getElementById("new_btn").onclick = () => { startGame() };
	document.getElementById("new_btn").disabled = true;
}

function startGame() {
	//disable new game button
	document.getElementById("new_btn").disabled = true;

	//create new game set
	const gameData = createGameData();

	//display search term
	const searchTerm = `${gameData[0].color} ${gameData[0].animal}`;
	document.getElementById("term").innerText = searchTerm;

	//say search term and add repeat fn to button
	say(searchTerm);
	document.getElementById("repeat_btn").onclick = () => { say(searchTerm) };

	//draw animals from game set
	const gameBoard = document.getElementById("game-board");
	gameBoard.replaceChildren();
	gameData.forEach(entry => {
		const name = `${entry.color} ${entry.animal}`;
		const node = document.createElement("div");
		node.classList.add("min-w-1/3", "max-w-96", `order-${entry.order}`);
		node.onclick = name === searchTerm ? (e) => showCorrect(e) : () => showIncorrect();
		const img = document.createElement("img");
		img.classList.add("object-contain", "rounded-full", "hover:bg-sky-700/[.4]");
		img.setAttribute("src", entry.url);
		img.setAttribute("alt", name);
		img.setAttribute("id", name);
		node.appendChild(img);
		gameBoard.appendChild(node);
		addFilter(name, entry.color);

	})

	function showIncorrect() {
		const audioElement = new Audio("./sounds/sad-synth.wav");
		audioElement.play();
	};

	function showCorrect(e) {
		//animated frame
		e.target.parentElement.classList.add("frame-animation", "transition");
		//fanfare
		const audioElement = new Audio("./sounds/happy.wav");
		audioElement.play();
		//allow new game if guessed correctly - remove disabled
		document.getElementById("new_btn").disabled = false;
	}
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
	/* 
	Rules for generating a game set:
		- no animals repeat
		- there can be *one* repetition of color, on a diffrenet animal
		- first object is the search term, but it won't necessarily be displayed first, hence order value
	Blueprint:
	[{
		animal: "dog",
		color: "blue",
		url: "",
		order: ""
	}]
	*/
	const animals = generateArray(4, selectAnimal);
	const colors = generateArray(3, selectColor);
	colors.push(selectColor());
	const orderArr = generateArray(4, () => { return Math.floor(Math.random() * 4 + 1) })
	for (let i = 0; i < colors.length; i++) {
		let color = colors[i];
		let animal = animals[i];
		let order = orderArr[i]
		let url = data.animals.find(n => n.name === animal).img_nobg;
		gameData.push({ color, animal, url, order })
	}
	return gameData;
};


