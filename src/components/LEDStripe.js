import { createLEDs } from "../functions";

export default function LEDStripe({count, radius, x, y, prefix}) {
    let currentLED = createLEDs(x, y, radius, count);
    let divToDrag = null;


    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function () {
        divToDrag = null;
    }, true);

    function onMouseDown(e) {
        divToDrag = e.target;
    }


    function onMouseMove(event) {
        event.preventDefault();
        if (divToDrag) {
            let mousePosition = {

                x: event.clientX,
                y: event.clientY

            };
            moveLED(divToDrag, mousePosition.x, mousePosition.y);
        }
    }


    function moveLED(div, x, y) {
        div.style.left = x + "px";
        div.style.top = y + "px";
        const id = parseInt(div.id.substring(prefix.length));

        if (id !== 0) {
            moveLEDNextTo(document.getElementById(prefix + (id - 1)), x, y, -1);
        }

        const next = document.getElementById(prefix + (id + 1));
        if (next) {
            moveLEDNextTo(next, x, y, 1)
        }
    }

    function moveLEDNextTo(div, x, y, diff) {
        const oldX = div.style.left;
        const oldY = div.style.top;
        let posX = parseInt(oldX.substring(0, oldX.length - 2)) - x;
        let posY = parseInt(oldY.substring(0, oldY.length - 2)) - y;
        const length = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
        const faktor = 2 * radius / length;
        posX = Math.floor(posX * faktor) + x;
        posY = Math.floor(posY * faktor) + y;


        div.style.left = posX + "px";
        div.style.top = posY + "px";

        const nextId = prefix + (parseInt(div.id.substring(prefix.length)) + diff);
        const next = document.getElementById(nextId);
        if (next) {
            moveLEDNextTo(next, posX, posY, diff)
        }
    }

    return [...Array(count)].map((e, i) => {
        const componentLED = <div className='led' key={i} id={prefix + i} style={{ left: currentLED.x, top: currentLED.y, width: currentLED.r * 2, height: currentLED.r * 2 }} onMouseDown={(e) => onMouseDown(e)} ></div>;
        currentLED = currentLED.next;
        return componentLED;
    })

}






