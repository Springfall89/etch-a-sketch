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
    checkMode();
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
                if (mode === "normal")
                {
                    cell.style.setProperty("background-color", "#000000");;
                }
                else if (mode === "rgb")
                {
                    cell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
                }
            }
        });
        cell.addEventListener("pointerdown", () => {
            isDrawing = true;
            if (mode === "normal")
            {
                cell.style.setProperty("background-color", "#000000");;
            }
            else if (mode === "rgb")
            {
                cell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
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
                    if (mode === "normal")
                    {
                        currentCell.style.setProperty("background-color", "#000000");
                    }
                    else if (mode === "rgb")
                    {
                        currentCell.style.setProperty("background-color", `rgb(${getRandomRGBNum()} ${getRandomRGBNum()} ${getRandomRGBNum()})`);
                    }
                }
            }
        });
    }
}

function checkMode()
{
    if (modeOption === "Normal")
    {
        return modifyCell("normal");
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