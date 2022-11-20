const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");
const root = document.querySelector(":root");

function resizeGrid(side) {
	for (let i = 0; i < Math.pow(side,2); i++) {
		container.appendChild(div.cloneNode(false));
	}
	root.style.setProperty("--side", side);

	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pxl => {
		pxl.addEventListener("mouseover", () => pxl.style.backgroundColor = "black");
		pxl.addEventListener("mouseout", () => pxl.style.backgroundColor = "white");
	});
}

resizeGrid(4);