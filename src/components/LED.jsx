
import { createLEDs, moveLED } from "../functions";
export default function LED({ id, x, y, d, prefix }) {
    let divToDrag = null;
    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function () {
        divToDrag = null;
    }, true);
    return <div className='led' onMouseDown={(e) => onMouseDown(e)} id={id} style={{ left: x, top: y, width: d, height: d, backgroundColor: "rgb(0,0,0)" }}></div>
    function onMouseDown(e) {
        console.log("hallo");
        divToDrag = e.target;
    }

    function onMouseMove(event) {
        event.preventDefault();
        if (divToDrag) {
            let mousePosition = {

                x: event.clientX,
                y: event.clientY

            };
            moveLED(divToDrag, mousePosition.x, mousePosition.y, prefix);
        }
    }
}