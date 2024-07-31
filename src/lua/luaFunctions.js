

import * as fengari from 'fengari-web'
import useChaser from '../hooks/useChaser';
const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
let lualib   = fengari.lualib;
let L = fengari.L;

let clocks = [];



function registerClock() {
    console.log("register ");
    const func = lua.lua_tojsstring(L, 1);
    const diff = lua.lua_tonumber(L, 2);
    
    clocks.push({callback: func, diff: diff*10});
    
    return 1;
}

function addHue() {
    const index = lua.lua_tonumber(L, 1);
    const hue = lua.lua_tonumber(L, 2);
    changeColor(index, hue);
    return 1;
}

function fadeAllToBlack() {
    const speed = lua.lua_tonumber(L, 1);
    return 1;

}

function showLeds() {
    return 1;
}

const myLib = {
    "registerClock": registerClock,
    "addHue": addHue,
    "fadeAllToBlack": fadeAllToBlack,
    "showLeds": showLeds

}

function changeColor(index, hue) {
    let led = document.getElementById("led" + index);
    console.log(led.style.backgroundColor);
    led.style.backgroundColor = "hsl("+hue+", 100%, 50%)";
}
    


export default function registerLuaFunctions() {
    lualib.luaL_openlibs(L);
    for(let key in myLib){
        console.log(key, myLib[key])
        lua.lua_register(L, key, myLib[key]);
    }
}

export function saveClocks() {
    localStorage.setItem("clocks", JSON.stringify(clocks))
}

export function getClocks() {
    if(localStorage.clocks){
        return JSON.parse(localStorage.clocks);
    }
    return [];
    
}