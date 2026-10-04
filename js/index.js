const gridBoxContainer = document.querySelector(".grid-box-container");

const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");

for (let i = 0; i < 256; i++)
{
    gridBoxContainer.appendChild(gridBox.cloneNode(true));
}