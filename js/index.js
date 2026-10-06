const etchASketch = document.querySelector(".etch-a-sketch");

const gridBoxContainer = document.querySelector(".grid-box-container");
gridBoxContainer.setAttribute("tabindex", "-1");

const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");

for (let i = 0; i < 256; i++)
{
    gridBoxContainer.appendChild(gridBox.cloneNode(true));
}

const gridBoxContainerBoxes = document.querySelectorAll(".grid-box-container > *");

const focusOutText = document.createElement("p");
focusOutText.classList.add("focus-out-text");
focusOutText.textContent = "Click on the screen to draw!";

document.body.setAttribute("style", "padding-top: 0");
document.body.insertBefore(focusOutText, etchASketch);

function warnBeforeUnload(event)
{
    event.preventDefault();
}

for (let i = 0; i < gridBoxContainerBoxes.length; i++)
{
    let isDrawing = false;
    gridBoxContainer.addEventListener("focusin", () => {
        isDrawing = true;
        focusOutText.remove();
        document.body.setAttribute("style", "padding-top: 50px");
    });

    gridBoxContainer.addEventListener("focusout", () => {
        isDrawing = false;

        document.body.setAttribute("style", "padding-top: 0");
        document.body.insertBefore(focusOutText, etchASketch);
    });

    document.addEventListener("click", (event) => {
        if (!gridBoxContainer.contains(event.target))
        {
        document.body.setAttribute("style", "padding-top: 0");
        document.body.insertBefore(focusOutText, etchASketch);
        }
    });

    gridBoxContainerBoxes[i].addEventListener("pointerenter", () => {
        if (!isDrawing)
        {
            return;
        }
        gridBoxContainerBoxes[i].classList.add("active");
        if (document.querySelector(".active") !== null)
        {
            window.addEventListener("beforeunload", warnBeforeUnload);
        }
    });

    gridBoxContainer.addEventListener("pointerdown", (event) => {
        isDrawing = true;

        focusOutText.remove();
        document.body.setAttribute("style", "padding-top: 50px");

        gridBoxContainer.setPointerCapture(event.pointerId);
        
        if (event.target.classList.contains("grid-box"))
        {
            event.target.classList.add("active");
        }
        if (document.querySelector(".active") !== null)
        {
            window.addEventListener("beforeunload", warnBeforeUnload);
        }
    });

    gridBoxContainer.addEventListener("pointermove", (event) => {

        if ((event.buttons !== 1) || (!isDrawing))
        {
            return;
        }
        const currentBox = document.elementFromPoint(event.clientX, event.clientY);

        if (currentBox && currentBox.classList.contains("grid-box"))
        {
            currentBox.classList.add("active");
        }
        if (document.querySelector(".active") !== null)
        {
            window.addEventListener("beforeunload", warnBeforeUnload);
        }
    });
}

const knobResize = document.querySelector("#knob-resize");
const knobReset = document.querySelector("#knob-reset");

const currentGridBox = gridBoxContainerBoxes[0];
let totalGridBoxes = gridBoxContainerBoxes.length;
let currentGridBoxWidth = currentGridBox.getBoundingClientRect().width;
let currentGridBoxContainerWidth = gridBoxContainer.getBoundingClientRect().width;

let gridBoxWidthSize = Math.floor(currentGridBoxContainerWidth / currentGridBoxWidth);
let gridBoxHeightSize = totalGridBoxes / gridBoxWidthSize;

const knobSizeText = document.createElement("p");
knobSizeText.textContent = `${gridBoxWidthSize} x ${gridBoxHeightSize}`;

knobResize.appendChild(knobSizeText);

knobReset.addEventListener("click", () => {
    if (document.querySelector(".active") === null)
    {
        return;
    }
    else
    {
        location.reload();
    }
});