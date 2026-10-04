const gridContainer = document.querySelector(".grid-container");

const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");

for (let i = 0; i < 256; i++)
{
    gridContainer.appendChild(gridBox.cloneNode(true));
}