const gridBoxContainer = document.querySelector(".grid-box-container");
gridBoxContainer.setAttribute("tabindex", "-1");

const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");

for (let i = 0; i < 256; i++)
{
    gridBoxContainer.appendChild(gridBox.cloneNode(true));
}

const gridBoxContainerBoxes = document.querySelectorAll(".grid-box-container > *");

for (let i = 0; i < gridBoxContainerBoxes.length; i++)
{
    let isDrawing = false;

    gridBoxContainer.addEventListener("focusin", () => {
        isDrawing = true;
    });

    gridBoxContainer.addEventListener("focusout", () => {
        isDrawing = false;
    });

    gridBoxContainerBoxes[i].addEventListener("pointerenter", () => {
        if (!isDrawing)
        {
            return;
        }
        gridBoxContainerBoxes[i].classList.add("active");
    });

    gridBoxContainer.addEventListener("pointerdown", (event) => {
        isDrawing = true;
        gridBoxContainer.setPointerCapture(event.pointerId);
        
        if (event.target.classList.contains("grid-box"))
        {
            event.target.classList.add("active");
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
    });
}