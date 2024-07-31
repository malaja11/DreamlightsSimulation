

import * as fengari from 'fengari-web'
import useChaser from '../hooks/useChaser';
const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
let lualib   = fengari.lualib;
let L = fengari.L;

let clocks = [];



function test() {
    console.log("hello");
    lua.lua_pushnumber(L, 7);
    return 1;
}

function registerClock() {
    console.log("registerClock");
    const func = lua.lua_tojsstring(L, 1);
    console.log(func);
    const diff = lua.lua_tonumber(L, 2);
    clocks.push({callback: func, diff: diff*10});
    
    return 1;
}

const myLib = [
    registerClock
]

export default function registerLuaFunctions() {
    lualib.luaL_openlibs(L);
    lua.lua_register(L, "test", test);
    lua.lua_register(L, "registerClock", registerClock)
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