const etchASketch = document.querySelector(".etch-a-sketch");
const bottom = document.querySelector(".bottom");

const grid = document.querySelector(".grid");
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

const knobResize = document.querySelector("#knob-resize");
const knobReset = document.querySelector("#knob-reset");

function warnBeforeUnload(event)
{
    event.preventDefault();
}

function generateGrid(width, height)
{
    knobResize.textContent = `Resize ${width}x${height}`;

    if ((width === 16) && (height === 16))
    {
        window.removeEventListener("beforeunload", warnBeforeUnload);
    }
    else
    {
        window.addEventListener("beforeunload", warnBeforeUnload);
    }

    let totalCells = width * height;
    gridCell.style.setProperty("--width", `calc(100% / ${width})`);
    grid.style.setProperty("aspect-ratio", `${width} / ${height}`);

    for (let i = 0; i < totalCells; i++)
    {
        grid.appendChild(gridCell.cloneNode(true));
    }
}

function removeGridCells()
{
    grid.replaceChildren();
}

function resetGrid()
{
    let cells = document.querySelectorAll(".grid > .grid-cell");
    for (let cell of cells)
    {
        cell.style.removeProperty("opacity");
        cell.style.setProperty("background-color", "#ffffff");
    }
}

const modeSelect = document.querySelector("#mode-options");
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

const hoverFlag = document.querySelector("#hover-checkbox");

function modifyCell()
{
    function getRandomRGBNum()
    {
        return Math.floor(Math.random() * 256);
    }

    let cells = document.querySelectorAll(".grid > .grid-cell");
    for (let cell of cells)
    {
        function darkenCell()
        {
            let cellOpacity = Number(window.getComputedStyle(cell).opacity);
            let newCellOpacity = String(cellOpacity - 0.1);
            cell.style.setProperty("opacity", newCellOpacity);
        }

        function setHover()
        {
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
                else if (modeOption === "darken")
                {
                    darkenCell();
                }
            }
        }

        hoverFlag.addEventListener("change", (event) => {
            event.preventDefault();
            if (!hoverFlag.checked)
            {
                cell.removeEventListener("pointerenter", setHover);
            }
            else
            {
                cell.addEventListener("pointerenter", setHover);
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
            else if (modeOption === "darken")
            {
                darkenCell();
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
                    else if (modeOption === "darken")
                    {
                        darkenCell();
                    }
                }
            }
        });
    }
}

let width = 16;
let height = 16;

knobResize.addEventListener("click", () => {
    function getSizes()
    {
        function checkForValidInput(input)
        {
            let num = Number(input);
            if (input === null)
            {
                return null;
            }
            else if ((input === "") || (Number.isNaN(num)))
            {
                alert("Please enter a number.");
                return false;
            }
            else
            {
                if (!Number.isInteger(num))
                {
                    alert("Please enter a whole number.");
                    return false;
                }
                else
                {
                    if (!Number.isFinite(num))
                    {
                        alert("Please enter a finite number.");
                        return false;
                    }
                    else
                    {
                        if ((num <= 0) || (100 < num))
                        {
                            alert("Number must be between 1 and 100.");
                            return false;
                        }
                        else
                        {
                            return num;
                        }
                    }
                }
            }
        }

        function getDimensions(dimension)
        {
            while (true)
            {
                let input = prompt(`Enter your new ${dimension} size: `);
                let isValid = checkForValidInput(input);

                if (input === null)
                {
                    return null;
                }
                if (isValid)
                {
                    return Number(input);
                }
            }
        }

        let width = getDimensions("width");
        if (width === null)
        {
            return null;
        }
        let height = getDimensions("height");
        if (height === null)
        {
            return null;
        }
        let result = [width, height];
        return result;
    }
    let dimensions = getSizes();
    width = dimensions[0];
    height = dimensions[1];

    removeGridCells();
    generateGrid(width, height);
    modifyCell();
});