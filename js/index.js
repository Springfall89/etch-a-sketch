const gridBoxContainer = document.querySelector(".grid-box-container");

const gridBox = document.createElement("div");
gridBox.classList.add("grid-box");

for (let i = 0; i < 256; i++)
{
    gridBoxContainer.appendChild(gridBox.cloneNode(true));
}

const gridBoxContainerBoxes = document.querySelectorAll(".grid-box-container > *");

for (let i = 0; i < gridBoxContainerBoxes.length; i++)
{
    gridBoxContainerBoxes[i].addEventListener("pointerenter", () => {
        gridBoxContainerBoxes[i].classList.add("active");
    });

    gridBoxContainer.addEventListener("pointerdown", (event) => {
        gridBoxContainer.setPointerCapture(event.pointerId);
        
        if (event.target.classList.contains("grid-box"))
        {
            event.target.classList.add("active");
        }
    });
    gridBoxContainer.addEventListener("pointermove", (event) => {

        if (event.buttons !== 1)
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