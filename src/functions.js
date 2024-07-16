export function createLEDs(x, y, r, count) {
    let firstLED = { x, y, r, prev: null };
    firstLED.next = createLED(firstLED, count - 1);
    return firstLED;
}


export function moveLED(div, x, y, prefix) {
    div.style.left = x + "px";
    div.style.top = y + "px";
    const id = parseInt(div.id.substring(prefix.length));

    if (id !== 0) {
        moveLEDNextTo(document.getElementById(prefix + (id - 1)), x, y, -1, prefix);
    }

    const next = document.getElementById(prefix + (id + 1));
    if (next) {
        moveLEDNextTo(next, x, y, 1, prefix)
    }
}

function moveLEDNextTo(div, x, y, diff, prefix) {
    const oldX = div.style.left;
    const oldY = div.style.top;
    let posX = parseInt(oldX) - x;
    let posY = parseInt(oldY) - y;
    const length = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
    const faktor = parseInt(div.style.width) / length;
    posX = Math.floor(posX * faktor) + x;
    posY = Math.floor(posY * faktor) + y;


    div.style.left = posX + "px";
    div.style.top = posY + "px";

    const nextId = prefix + (parseInt(div.id.substring(prefix.length)) + diff);
    const next = document.getElementById(nextId);
    if (next) {
        moveLEDNextTo(next, posX, posY, diff, prefix)
    }
}

function createLED(prev, count) {
    if (count === 0) {
        return null;
    }
    let currentLED = { x: prev.x + 2 * prev.r, y: prev.y, r: prev.r, prev: prev };
    currentLED.next = createLED(currentLED, count - 1);
    return currentLED;
}


