

import * as fengari from 'fengari-web'
const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
let lualib   = fengari.lualib;
let L = fengari.L;

let clocks = [];



function registerClock() {
    console.log("hello");
    lua.lua_pushinteger(L, 7);
    return 1;
}

const myLib = [
    registerClock
]

export default function registerLuaFunctions() {
    lualib.luaL_openlibs(L);
    lua.lua_register(L, "test", registerClock);
}