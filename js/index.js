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
        let choice = confirm("Do you want to reset the screen?");
        if (choice === false)
        {
            return;
        }
        else
        {
            const gridBoxContainerBoxes = document.querySelectorAll(".active");
            for (let i = 0; i < gridBoxContainerBoxes.length; i++)
            {
                gridBoxContainerBoxes[i].classList.remove("active");
            }
        }
    }
    const currentGridBox = gridBoxContainerBoxes[0];
    let totalGridBoxes = gridBoxContainerBoxes.length;
    let currentGridBoxWidth = currentGridBox.getBoundingClientRect().width;
    let currentGridBoxContainerWidth = gridBoxContainer.getBoundingClientRect().width;

    let gridBoxWidthSize = Math.floor(currentGridBoxContainerWidth / currentGridBoxWidth);
    let gridBoxHeightSize = totalGridBoxes / gridBoxWidthSize;

    if ((gridBoxWidthSize === 16) && (gridBoxHeightSize === 16))
    {
    window.removeEventListener("beforeunload", warnBeforeUnload);
    }
});

function checkForCorrectSize(num)
{
    let convertNum = Number(num);
    if (num === null)
    {
        return null;
    }
    else if ((num === "") || (Number.isNaN(convertNum)))
    {
        alert("Please enter a number.");
        return false;
    }
    else if (convertNum <= 0)
    {
        alert("Value must be above or equal to 1.");
        return false;
    }
    else if (convertNum > 0)
    {
        if (!Number.isInteger(convertNum))
        {
            alert("Please enter a whole number.");
            return false;
        }
        else if (!Number.isFinite(convertNum))
        {
            alert("Please enter a finite number.");
            return false;
        }
        else
        {
            if (convertNum > 100)
            {
                alert("Value must be below or equal to 100.");
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}

knobResize.addEventListener("click", () => {
    function getSize()
    {
        function getDimensions(label)
        {
            while (true)
            {
                let input = prompt(`Enter your ${label} size: `);
                let isValid = checkForCorrectSize(input);

                if (isValid === null)
                {
                    return null;
                }
                if (isValid)
                {
                    return input;
                }
            }
        }
        let width = getDimensions("width");
        if (width === null)
        {
            return;
        }
        let height = getDimensions("height");
        if (height === null)
        {
            return;
        }
        let result = [width, height];
        return result;
    }
    let dimensions = getSize();
    if (dimensions.length !== 2)
    {
        return;
    }
    else
    {
        let width = dimensions[0];
        let height = dimensions[1];

        gridBoxContainer.replaceChildren();

        const newGridBox = document.createElement("div");

        totalGridBoxes = width * height;

        newGridBox.classList.add("grid-box");
        newGridBox.style.setProperty("--current-width", `calc(100% / ${width})`);

        gridBoxContainer.style.setProperty("aspect-ratio", `${width} / ${height}`);

        knobSizeText.textContent = `${width} x ${height}`;

        for(let i = 0; i < totalGridBoxes; i ++)
        {
            gridBoxContainer.appendChild(newGridBox.cloneNode(true));
        }

        window.addEventListener("beforeunload", warnBeforeUnload);

        const newGridBoxContainerBoxes = document.querySelectorAll(".grid-box-container > *");

        for (let i = 0; i < newGridBoxContainerBoxes.length; i++)
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

            newGridBoxContainerBoxes[i].addEventListener("pointerenter", () => {
                if (!isDrawing)
                {
                    return;
                }
                newGridBoxContainerBoxes[i].classList.add("active");
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
    }
});

const modeSelect = document.querySelector("#mode-select");
let mode = modeSelect.value;
function updateMode()
{
    mode = modeSelect.value;
}
modeSelect.addEventListener("change", updateMode);

const activeGridBox = document.querySelector(".active");