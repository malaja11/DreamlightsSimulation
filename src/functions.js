export function createLEDs(x, y, r, count){
    let firstLED = {x, y, r, prev: null};
    firstLED.next = createLED(firstLED, count - 1);
    return firstLED;
}

function createLED(prev, count){
    if(count === 0){
        return null;
    }
    let currentLED = {x: prev.x + 2 * prev.r, y: prev.y, r: prev.r, prev: prev};
    currentLED.next = createLED(currentLED, count - 1);
    return currentLED;
}