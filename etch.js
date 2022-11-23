const body = document.querySelector("body");
const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");
const root = document.querySelector(":root");
const input = document.querySelector("[type='number']");
const button = document.querySelector("#resize");
const colorPicker = document.querySelector("[type='color']");
const eraserButton = document.querySelector("#erase");
const style = document.createElement("style");
const checkbox = document.querySelector("#grid-toggle");
let brushColor = '#000000';
let erase = false;
let resizeInputBackup = '';
let areBordersOn = false;

button.addEventListener("click", () => resizeGrid(input.value));
colorPicker.addEventListener("change", (e) => brushColor = e.target.value);
window.addEventListener("blur", (e) => erase = false);

checkbox.addEventListener("input", () => {
	areBordersOn = !areBordersOn;
	if (areBordersOn)
		drawBorders();
	else {
		removeBorders();
	}
});

eraserButton.addEventListener("click", () => {
	erase = !erase;
	eraserButton.classList.toggle("pressed");
});

input.addEventListener("focus", (e) => {
	resizeInputBackup = e.target.value;
	e.target.value = '';
});
input.addEventListener("focusout", (e) => {
	if (e.target.value == '')
		e.target.value = resizeInputBackup;
});

input.addEventListener("change", (e) => {
	if (e.target.value < 2)
		e.target.value = 2;
	else if (e.target.value > 100)
		e.target.value = 100;
});

window.addEventListener("keydown", (e) => {
	if (e.key == "Control") {
		erase = true;
		eraserButton.classList.add("pressed");
	}
});

window.addEventListener("keyup", (e) => {
	if (e.key == "Control") {
		erase = false;
		eraserButton.classList.remove("pressed");
	}
});

function resizeGrid(side) {
	container.innerHTML = '';
	for (let i = 0; i < Math.pow(side, 2); i++) {
		container.appendChild(div.cloneNode(false));
	}
	root.style.setProperty("--squareSide", side);
	//Resize sqares to fit into 800x800 field
	root.style.setProperty("--pixelSize", `${800 / side}px`);

	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pxl => {
		pxl.addEventListener("click", draw);
	});

	if (areBordersOn)
		drawBorders();
}

function draw(e) {
	console.log(erase)
	if (erase)
		e.target.style.backgroundColor = '';
	else
		e.target.style.backgroundColor = brushColor;
}


function drawBorders() {
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pixel => pixel.classList.toggle("pixel-borders"));
	style.innerHTML = `

	/* top row */
	.pixel:nth-child(-n + ${root.style.getPropertyValue("--squareSide")}) {
		border-top: none;
	}

	/* right collumn */
	.pixel:nth-child(${root.style.getPropertyValue("--squareSide")}n) {
		border-right: none;
	}

	/* left collumn */
	.pixel:nth-child(${root.style.getPropertyValue("--squareSide")}n + 1) {
		border-left: none;
	}

	/* bottom row */
	.pixel:nth-child(n + ${Math.pow(root.style.getPropertyValue("--squareSide"), 2) - root.style.getPropertyValue("--squareSide") + 1}) {
		border-bottom: none;
	}
	`
	body.appendChild(style);
};

function removeBorders() {
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pxl => pxl.classList.toggle("pixel-borders"));
	style.innerHTML = '';
}

resizeGrid(4);