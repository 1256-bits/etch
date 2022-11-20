const container = document.querySelector("#container");
const div = document.createElement("div");
div.classList.toggle("pixel");

for (let i = 0; i < 16; i++) {
    container.appendChild(div.cloneNode(false));
}

const pixels = document.querySelectorAll(".pixel");
pixels.forEach(pxl => {
	pxl.addEventListener("mouseover", () => pxl.style.backgroundColor = "black");
	pxl.addEventListener("mouseout", () => pxl.style.backgroundColor = "white");
});
