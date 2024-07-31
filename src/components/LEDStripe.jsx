import { useCallback, useState } from "react";
import { createLEDs, moveLED } from "../functions";
import * as fengari from 'fengari-web'
import useChaser from "../hooks/useChaser";
import LED from "./LED";
import registerLuaFunctions, { getClocks, RunAnimation, saveClocks } from "../lua/luaFunctions";

export default function LEDStripe({ count, radius, x, y, prefix }) {

  let currentLED = createLEDs(x, y, radius, count);
  let divToDrag = null;
  const [luaCode, setLuaCode] = useState();

  
  

  const fx1 = useCallback((prefix, { id1, inc1 }, { setId1, setInc1 }) => {
    let currentId = prefix + (id1);
    let current = document.getElementById(currentId);
    if (!current) {
      inc1 *= -1;
      id1 += 2 * inc1;
      currentId = prefix + (id1);
      current = document.getElementById(currentId);
    }

    const prevId = prefix + (id1 - inc1);
    const prev = document.getElementById(prevId);
    if (prev) {
      prev.style.backgroundColor = "red";
    }

    if (current) {
      current.style.backgroundColor = "white";

      id1 += inc1;
    }


    setId1(id1);
    setInc1(inc1);
  })
  const fx2 = useCallback((prefix, { id2, inc2 }, { setId2, setInc2 }) => {
    let currentId = prefix + (id2);
    let current = document.getElementById(currentId);
    if (!current) {
      inc2 *= -1;
      id2 += 2 * inc2;
      currentId = prefix + (id2);
      current = document.getElementById(currentId);
    }

    const prevId = prefix + (id2 - inc2);
    const prev = document.getElementById(prevId);
    if (prev) {
      prev.style.backgroundColor = "red";
    }

    if (current) {
      current.style.backgroundColor = "white";

      id2 += inc2;
    }


    setId2(id2);
    setInc2(inc2);
  })
  const variables = { id1: 0, inc1: 1, id2: 19, inc2: -1 };
  let variablesKeys = [];
  for (const key in variables) {
    variablesKeys.push(key);
  }

  
  
  const { animation, setAnimation } = useChaser(prefix, getClocks(), variables, variablesKeys);

  console.log(getClocks());
  if(localStorage.luaCode && !animation){
    fengari.load(localStorage.luaCode)();
    setAnimation(true);
  }
  
  // const variablesKeys = ["id1", "inc1", "id2", "inc2"];
  // const { animation, setAnimation } = useChaser(prefix, [{ callback: fx1, diff: 199 }, { callback: fx2, diff: 400 }], variables, variablesKeys)

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function () {
    divToDrag = null;
  }, true);

  const stripe = [...Array(count)].map((e, i) => {
    const componentLED = <LED key={i} id={prefix + i} x={currentLED.x} y={currentLED.y} d={currentLED.r * 2} onMouseDown={(e) => onMouseDown(e)} />;
    currentLED = currentLED.next;
    return componentLED;
  })

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

  function runLuaAnimation() {
    console.log(luaCode);
    const luaconf = fengari.luaconf;
    const lua = fengari.lua;
    const lauxlib = fengari.lauxlib;
    let lualib = fengari.lualib;
    let L = fengari.L;
  
    const luaEnv = registerLuaFunctions()
  
    fengari.load(luaCode)();
  
    console.log("begin");
    lua.lua_getglobal(L, "config");
    lua.lua_pcall(L, 0, 1, 0);
    console.log(lua.lua_tonumber(L, -1));

    localStorage.setItem("luaCode", luaCode)
    saveClocks();
    window.location.reload(false);
  }

  return <> {stripe}
    <div className="lua"> 
      {/* <textarea></textarea> <button onClick={() => setAnimation(!animation)}>{animation ? "Stop" : "Start"}</button> */}
      <textarea name="luaCode" onChange={(event) => setLuaCode(event.target.value)}></textarea> <button onClick={() => runLuaAnimation()}>Start</button>
    </div>
    </>
}







