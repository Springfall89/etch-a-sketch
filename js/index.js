const etchASketch = document.querySelector(".etch-a-sketch");
const bottom = document.querySelector(".bottom");

const grid = document.querySelector(".grid");
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

function generateGrid(width, height)
{
    let totalCells = width * height;
    gridCell.style.setProperty("--width", `calc(100% / ${width})`);
    grid.style.setProperty("aspect-ratio", `${width} / ${height}`);

    for (let i = 0; i < totalCells; i++)
    {
        grid.appendChild(gridCell.cloneNode(true));
    }
}

const modeSelect = document.querySelector(".mode-options");
let modeOption = modeSelect.value;

modeSelect.addEventListener("change", () => {
    modeOption = modeSelect.value;
});

const focusOutText = document.querySelector(".focus-out-text");

let isDrawing = false;
document.addEventListener("click", (event) => {
    if (!grid.contains(event.target))
    {
        isDrawing = false;
        etchASketch.insertBefore(focusOutText, bottom);
    }
    else
    {
        isDrawing = true;
        bottom.style.setProperty("padding-top", "min(6.25em, 10%)");
        focusOutText.remove();
    }
});
grid.addEventListener("focusout", () => {
        isDrawing = false;
        etchASketch.insertBefore(focusOutText, bottom);
        });
grid.addEventListener("focusin", () => {
        isDrawing = true;
        bottom.style.setProperty("padding-top", "min(6.25em, 10%)");
        focusOutText.remove();
});

function modifyCell(mode)
{
    let cells = document.querySelectorAll(".grid > .grid-cell");
    for (let cell of cells)
    {
        cell.addEventListener("pointerenter", () => {
            if (!isDrawing)
            {
                return;
            }
            else
            {
                cell.classList.add(mode);
            }
        });
        cell.addEventListener("pointerdown", () => {
            isDrawing = true;
            cell.classList.add(mode);
        });
        cell.addEventListener("pointermove", (event) => {
            if ((event.buttons !== 1) || (!isDrawing))
            {
                return;
            }
            else
            {
                let currentCell = document.elementFromPoint(event.clientX, event.clientY);
                if (currentCell && currentCell.classList.contains("grid-cell"))
                {
                    currentCell.classList.add(mode);
                }
            }
        });
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