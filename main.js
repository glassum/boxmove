const child = document.getElementById("child");
const parent = document.getElementById("parent");

function moveAt(elementX, elementY, shiftX, shiftY) {
    let x = elementX - shiftX;
    let y = elementY - shiftY;
    const checkLimits = (value, min, max) => value < min ? min : value > max ? max : value;
    x = checkLimits(x, parent.offsetLeft, parent.offsetLeft + parent.offsetWidth - child.offsetWidth);
    y = checkLimits(y, parent.offsetTop, parent.offsetTop + parent.offsetHeight - child.offsetHeight);
    child.style.left = x + "px";
    child.style.top = y + "px";
}

child.ondragstart = () => false;
child.onmousedown = event => {

    event.preventDefault();
    let shiftX = event.clientX - child.getBoundingClientRect().left;
    let shiftY = event.clientY - child.getBoundingClientRect().top;
    const onMouseMove = event => moveAt(event.pageX, event.pageY, shiftX, shiftY);

    document.body.append(child);
    document.onmouseup = () => document.removeEventListener("mousemove", onMouseMove); // free up all document events
    document.addEventListener("mousemove", onMouseMove);
    moveAt(event.pageX, event.pageY, shiftX, shiftY);

};
