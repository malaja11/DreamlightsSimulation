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

  const variables = { id1: 0, inc1: 1, id2: 19, inc2: -1 };
  let variablesKeys = [];
  for (const key in variables) {
    variablesKeys.push(key);
  }
  
  const { animation, setAnimation } = useChaser(getClocks());

  console.log(getClocks());
  if(localStorage.luaCode && !animation){
    const luaEnv = registerLuaFunctions()
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
    const componentLED = <LED key={i} id={prefix + (i + 1)} x={currentLED.x} y={currentLED.y} d={currentLED.r * 2} onMouseDown={(e) => onMouseDown(e)} />;
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







