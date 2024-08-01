

import * as fengari from 'fengari-web'
const luaconf = fengari.luaconf;
const lua = fengari.lua;
const lauxlib = fengari.lauxlib;
let lualib = fengari.lualib;
let L = fengari.L;

let clocks = [];

function HSLToRGB(h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

function registerClock() {
    const func = lua.lua_tojsstring(L, 1);
    const diff = lua.lua_tonumber(L, 2);

    console.log(func, diff);
    clocks.push({ callback: func, diff: diff * 10 });

    return 1;
}

function addHue() {
    const index = lua.lua_tonumber(L, 1);
    const hue = lua.lua_tonumber(L, 2);
    let led = document.getElementById("led" + index);
    const rgbNeu = HSLToRGB(hue, 100, 50);
    let rgb = led.style.backgroundColor;
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
    let r = (+rgb[0] + rgbNeu.r),
        g = (+rgb[1] + rgbNeu.g),
        b = (+rgb[2] + rgbNeu.b);
    led.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    return 1;
}

function fadeAllToBlack() {
    const speed = lua.lua_tonumber(L, 1);
    for (let i = 1; i <= 20; i++) {
        let led = document.getElementById("led" + i);
        let rgb = led.style.backgroundColor;
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        // Turn "rgb(r,g,b)" into [r,g,b]
        rgb = rgb.substr(4).split(")")[0].split(sep);
        let r = (+rgb[0] * (1 - speed / 255)),
            g = (+rgb[1] * (1 - speed / 255)),
            b = (+rgb[2] * (1 - speed / 255));
        led.style.backgroundColor = "rgb(" + (r) + ", " + g + ", " + (b) + ")";
    }
    return 1;

}

function showLeds() {
    return 1;
}

const myLib = {
    "registerClock": registerClock,
    "addHue": addHue,
    "fadeAllToBlack": fadeAllToBlack,
    "showLeds": showLeds,
}

function openLedsLib(l) {
    lauxlib.luaL_newlib(l, myLib);
    return 1;
}

export default function registerLuaFunctions() {
    lualib.luaL_openlibs(L);
    lauxlib.luaL_requiref(L, fengari.to_luastring("leds"), openLedsLib, 1);
    lua.lua_pop(L, 1);
}

export function saveClocks() {
    localStorage.setItem("clocks", JSON.stringify(clocks))
}

export function getClocks() {
    if (localStorage.clocks) {
        return JSON.parse(localStorage.clocks);
    }
    return [];

}
