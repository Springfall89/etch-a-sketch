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

const modeSelect = document.querySelector(".mode-options");
let modeOption = modeSelect.value;

modeSelect.addEventListener("change", () => {
    modeOption = modeSelect.value;
});

function modifyCell(mode)
{
    let cells = document.querySelectorAll(grid > "*");
    for (let i = 0; i < cells.length; i++)
    {
        let isDrawing = false;
    }
}

function checkMode()
{
    if (modeOption === "Normal")
    {
        return modifyCell("active");
    }
    else if (modeOption === "Darken")
    {
        return modifyCell("darken");
    }
    else if (modeOption === "RGB")
    {
        return modifyCell("rgb");
    }
}