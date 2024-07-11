import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import LEDStripe from './components/LEDStripe';

function App() {
  const animationRef = useRef();
  const [animation, setAnimation] = useState("Start");
  const prefix = "led";

  const myCallback = useCallback(getFx1());

  function getFx1() {
    let id = 0;
    let inc = 1;
    const diff = 100;
    const millis = () => Date.now();
    let last = millis();
    return () => {
      if (millis() - last >= diff) {
        let currentId = prefix + (id);
        let current = document.getElementById(currentId);
        if (!current) {
          inc *= -1;
          id += 2 * inc;
          currentId = prefix + (id);
          current = document.getElementById(currentId);
        }

        const prevId = prefix + (id - inc);
        const prev = document.getElementById(prevId);
        if (prev) {
          prev.style.backgroundColor = "red";
        }

        if (current) {
          current.style.backgroundColor = "white";

          console.log(current);
          id += inc;
        }

        last = millis();
      }

      animationRef.current = requestAnimationFrame(myCallback);
    }
  }
  
  useEffect(() => {
    if (animation === "Stop") {
      animationRef.current = requestAnimationFrame(myCallback);

      return () => {
        cancelAnimationFrame(animationRef.current);
      }
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

  }, [animation]);

  function animate(event) {
    if (event.target.innerText === "Start") {
      setAnimation("Stop");
    } else {
      setAnimation("Start");
    }
  }


  return (
    <div className="App">

      <LEDStripe count={20} radius={20} x={200} y={200} prefix={"led"} />

      <header className="App-header">

        DREAMLIGHTS

      </header>

      <button onClick={(e) => animate(e)}>{animation}</button>
    </div>
  );



}


export default App;
