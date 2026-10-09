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

const focusOutText = document.createElement("p");
focusOutText.classList.add("focus-out-text");
focusOutText.textContent = "Click on the screen to draw!";

let cells = document.querySelectorAll("grid > .grid-cell");
const gridObserver = new MutationObserver(mutations => {
    for (let mutation of mutations)
    {
        if ((mutation.type === "childList") || (mutation.type === "subtree"))
        {
            cells = document.querySelectorAll(".grid > .grid-cell");
        }
    }
});
gridObserver.observe(grid, {
    childList: true,
    subtree: true
});

let isDrawing = false;
document.addEventListener("click", (event) => {
    if (!grid.contains(event.target))
    {
        isDrawing = false;
        bottom.style.setProperty("padding-top", "calc(min(6.25em, 10%) - var(--difference)");
        etchASketch.insertBefore(focusOutText, bottom);
    }
    else
    {
        isDrawing = true;
        bottom.style.setProperty("padding-top", "min(6.25em, 10%)");
        focusOutText.remove();
    }
});

function modifyCell(mode)
{
    for (let i = 0; i < cells.length; i++)
    {
        cells[i].addEventListener("pointerenter", () => {
            if (!isDrawing)
            {
                return;
            }
            else
            {
                cells[i].classList.add(mode);
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