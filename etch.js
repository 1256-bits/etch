const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");
const root = document.querySelector(":root");
const input = document.querySelector("[type='number']");
const button = document.querySelector("[type='button']");

button.addEventListener("click", () => resizeGrid(input.value));

function resizeGrid(side) {
	container.innerHTML = '';
	for (let i = 0; i < Math.pow(side,2); i++) {
		container.appendChild(div.cloneNode(false));
	}
	root.style.setProperty("--squareSide", side);
	//Resize sqares to fit inot 800x800 field
	root.style.setProperty("--pixelSize", `${800 / side}px`);

	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pxl => {
		pxl.addEventListener("mouseover", () => pxl.style.backgroundColor = "black");
		pxl.addEventListener("mouseout", () => pxl.style.backgroundColor = "white");
	});
}

resizeGrid(4);