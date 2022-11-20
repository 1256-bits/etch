const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");
const root = document.querySelector(":root");
const input = document.querySelector("[type='number']");
const button = document.querySelector("#resize");
const colorPicker = document.querySelector("[type='color']");
const eraserButton = document.querySelector("#erase");
let brushColor = '#000000';
let erase = false;

button.addEventListener("click", () => resizeGrid(input.value));
colorPicker.addEventListener("change", (e) => brushColor = e.target.value);
window.addEventListener("blur", (e) => erase = false);

eraserButton.addEventListener("click", () => {
	erase = !erase;
	eraserButton.classList.toggle("pressed");
});

input.addEventListener("change", (e) => {
	if (e.target.value < 2)
		e.target.value = 2;
	else if (e.target.value > 100)
		e.target.value = 100;
});

window.addEventListener("keydown", (e) => {
	if (e.key == "Control")
		erase = true;
	console.log(erase)
});

window.addEventListener("keyup", (e) => {
	if (e.key == "Control")
		erase = false;
});


/* TODO
	- Add togglable borders to the grid
	- Style the page
*/

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
}

function draw(e) {
	console.log(erase)
	if (erase)
		e.target.style.backgroundColor = '';
	else
		e.target.style.backgroundColor = brushColor;
}

resizeGrid(4);