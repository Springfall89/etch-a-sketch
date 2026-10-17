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
        bottom.style.setProperty("padding-top", "calc(min(6.25em, 10%) - var(--difference))");
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
        bottom.style.setProperty("padding-top", "calc(min(6.25em, 10%) - var(--difference))");
        etchASketch.insertBefore(focusOutText, bottom);
});
grid.addEventListener("focusin", () => {
        isDrawing = true;
        bottom.style.setProperty("padding-top", "min(6.25em, 10%)");
        focusOutText.remove();
});

function modifyCell()
{
    function getRandomRGBNum()
    {
        return Math.floor(Math.random() * 256);
    }

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
                if (modeOption === "normal")
                {
                    cell.style.removeProperty("opacity");
                    cell.style.setProperty("background-color", "#000000");
                }
                else if (modeOption === "rgb")
                {
                    cell.style.removeProperty("opacity");
                    cell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
                }
                else if (modeOption === "erase")
                {
                    cell.style.removeProperty("opacity");
                    cell.style.setProperty("background-color", "#ffffff");
                }
            }
        });
        cell.addEventListener("pointerdown", () => {
            isDrawing = true;
            if (modeOption === "normal")
            {
                cell.style.removeProperty("opacity");
                cell.style.setProperty("background-color", "#000000");
            }
            else if (modeOption === "rgb")
            {
                cell.style.removeProperty("opacity");
                cell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
            }
            else if (modeOption === "erase")
            {
                cell.style.removeProperty("opacity");
                cell.style.setProperty("background-color", "#ffffff");
            }
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
                    if (modeOption === "normal")
                    {
                        currentCell.style.removeProperty("opacity");
                        currentCell.style.setProperty("background-color", "#000000");
                    }
                    else if (modeOption === "rgb")
                    {
                        currentCell.style.removeProperty("opacity");
                        currentCell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
                    }
                    else if (modeOption === "erase")
                    {
                        currentCell.style.removeProperty("opacity");
                        currentCell.style.setProperty("background-color", "#ffffff");
                    }
                }
            }
        });
    }
}