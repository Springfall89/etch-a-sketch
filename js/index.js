const grid = document.querySelector(".grid");
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

function generateGrid(width, height)
{
    let totalCells = width * height;
    gridCell.style.setProperty("--width", `calc(100% / ${width})`);
    grid.style.setProperty("aspect-ratio", `${width} / ${height}`);

    for (let i = 0; i< totalCells; i++)
    {
        grid.appendChild(gridCell.cloneNode(true));
    }
}