const container = document.querySelector("#container");
const div = document.createElement("div");

console.log(container)
for (let i = 0; i < 16; i++) {
    container.appendChild(div.cloneNode(false));
}