let child = document.getElementById("child");
let parent = document.getElementById("parent");
const checkLimits = (value, min, max) => value < min ? min : value > max ? max : value;

// Mouse events
let isDown = false;
child.addEventListener("mousedown", () => isDown = true);
document.addEventListener("mouseup", () => isDown = false);
document.addEventListener("mousemove", event => {
    event.preventDefault();
    if (isDown) {
        child.style.left = checkLimits(child.offsetLeft + event.movementX, 0, parent.offsetWidth - child.offsetWidth) + "px";
        child.style.top = checkLimits(child.offsetTop + event.movementY, 0, parent.offsetHeight - child.offsetHeight) + "px";
    }
});

// Touch events
let globalX = 0;
let globalY = 0;
child.addEventListener("touchstart", event => {
    globalX = event.changedTouches[0].pageX;
    globalY = event.changedTouches[0].pageY;
});

child.addEventListener("touchmove", event => {
    event.preventDefault();
    let deltaX = event.changedTouches[0].pageX - globalX;
    let deltaY = event.changedTouches[0].pageY - globalY;
    child.style.left = checkLimits(child.offsetLeft + deltaX, 0, parent.offsetWidth - child.offsetWidth) + "px";
    child.style.top = checkLimits(child.offsetTop + deltaY, 0, parent.offsetHeight - child.offsetHeight) + "px";
    globalX = event.changedTouches[0].pageX;
    globalY = event.changedTouches[0].pageY;
});