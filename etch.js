const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");
const root = document.querySelector(":root");
const input = document.querySelector("[type='number']");
const button = document.querySelector("[type='button']");

button.addEventListener("click", () => resizeGrid(input.value));
input.addEventListener("change", (e) => {
	if (e.target.value < 2)
		e.target.value = 2;
	else if (e.target.value > 100)
		e.target.value = 100;
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
		pxl.addEventListener("mouseover", () => pxl.style.backgroundColor = "black");
		pxl.addEventListener("mouseout", () => pxl.style.backgroundColor = "white");
	});
}

resizeGrid(4);