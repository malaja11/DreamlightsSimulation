import { getFx1 } from "../effects";
import { createLEDs, moveLED } from "../functions";
import { useCallback, useEffect, useRef, useState } from 'react';
import useAnimation from "../hooks/useAnimation";
import LED from "./LED";

export default function LEDStripe({ count, radius, x, y, prefix }) {

  let currentLED = createLEDs(x, y, radius, count);
  let divToDrag = null;
  const {animation, setAnimation} = useAnimation(prefix)

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function () {
    divToDrag = null;
  }, true);

  const stripe = [...Array(count)].map((e, i) => {
    const componentLED = <LED key={i} id={prefix + i} x={currentLED.x} y={currentLED.y} d={currentLED.r * 2} onMouseDown={(e) => onMouseDown(e)}/>;
    currentLED = currentLED.next;
    return componentLED;
  })

  return <> {stripe} <button onClick={() => setAnimation(!animation)}>{animation ? "Stop" : "Start"}</button> </>

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
      moveLED(divToDrag, mousePosition.x, mousePosition.y, prefix);
    }
  }

}






