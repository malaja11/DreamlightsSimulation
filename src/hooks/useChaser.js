import { useCallback, useEffect, useRef, useState } from 'react';
import * as fengari from 'fengari-web'
const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
let lualib   = fengari.lualib;
let L = fengari.L;

const useChaser = (functions) => {
    const animationRef = useRef();
    const [animation, setAnimation] = useState(false);
    const [lastExecs, setLastExecs] = useState (null);
    
    const myCallback = useCallback(getAnimation(functions, {lastExecs, setLastExecs}, animationRef, () => myCallback));

    useEffect(() => {
        if (animation) {
            animationRef.current = requestAnimationFrame(myCallback);

            return () => {
                cancelAnimationFrame(animationRef.current);
            }
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

    }, [animation, myCallback]);

    return { animation, setAnimation }
}

function getAnimation(functions, {lastExecs, setLastExecs}, animationRef, callback) {
    const millis = () => Date.now();
    if(lastExecs === null){
        let startLastExecs = {};
        functions.forEach((fn) => startLastExecs[fn.callback] = 0);
        setLastExecs(startLastExecs)
    }
    
    return () => {
        functions.forEach(element => {
            if(millis() - lastExecs[element.callback] >= element.diff){
                lua.lua_getglobal(L, element.callback);
                lua.lua_pcall(L, 0, 1, 0);
                lua.lua_pop(L, 1)
                // element.callback(prefix, startValues, setStartValues);
                lastExecs[element.callback] = millis();
            }
        });

        animationRef.current = requestAnimationFrame(callback());
    }
}

export default useChaser;