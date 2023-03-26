"use strict";
exports.__esModule = true;
exports.convertColor = exports.constrainColorComponents = exports.getColorMaxComponents = exports.appendAlphaComponent = exports.removeAlphaComponent = exports.hsvToHslInt = exports.hslToHsvInt = exports.hsvToRgbInt = void 0;
var number_util_1 = require("../../../common/number-util");
/**
 * Converts RGB color components into HSL (cylindrical, used in CSS).
 */
function rgbToHslInt(r, g, b) {
    var rp = number_util_1.constrainRange(r / 255, 0, 1);
    var gp = number_util_1.constrainRange(g / 255, 0, 1);
    var bp = number_util_1.constrainRange(b / 255, 0, 1);
    var cmax = Math.max(rp, gp, bp);
    var cmin = Math.min(rp, gp, bp);
    var c = cmax - cmin;
    var h = 0;
    var s = 0;
    var l = (cmin + cmax) / 2;
    if (c !== 0) {
        s = c / (1 - Math.abs(cmax + cmin - 1));
        if (rp === cmax) {
            h = (gp - bp) / c;
        }
        else if (gp === cmax) {
            h = 2 + (bp - rp) / c;
        }
        else {
            h = 4 + (rp - gp) / c;
        }
        h = h / 6 + (h < 0 ? 1 : 0);
    }
    return [h * 360, s * 100, l * 100];
}
function hslToRgbInt(h, s, l) {
    var _a, _b, _c, _d, _e, _f;
    var hp = ((h % 360) + 360) % 360;
    var sp = number_util_1.constrainRange(s / 100, 0, 1);
    var lp = number_util_1.constrainRange(l / 100, 0, 1);
    var c = (1 - Math.abs(2 * lp - 1)) * sp;
    var x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
    var m = lp - c / 2;
    var rp, gp, bp;
    if (hp >= 0 && hp < 60) {
        _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
    }
    else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
    }
    else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
    }
    else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
    }
    else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
    }
    else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
    }
    return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function rgbToHsvInt(r, g, b) {
    var rp = number_util_1.constrainRange(r / 255, 0, 1);
    var gp = number_util_1.constrainRange(g / 255, 0, 1);
    var bp = number_util_1.constrainRange(b / 255, 0, 1);
    var cmax = Math.max(rp, gp, bp);
    var cmin = Math.min(rp, gp, bp);
    var d = cmax - cmin;
    var h;
    if (d === 0) {
        h = 0;
    }
    else if (cmax === rp) {
        h = 60 * (((((gp - bp) / d) % 6) + 6) % 6);
    }
    else if (cmax === gp) {
        h = 60 * ((bp - rp) / d + 2);
    }
    else {
        h = 60 * ((rp - gp) / d + 4);
    }
    var s = cmax === 0 ? 0 : d / cmax;
    var v = cmax;
    return [h, s * 100, v * 100];
}
/**
 * @hidden
 */
function hsvToRgbInt(h, s, v) {
    var _a, _b, _c, _d, _e, _f;
    var hp = number_util_1.loopRange(h, 360);
    var sp = number_util_1.constrainRange(s / 100, 0, 1);
    var vp = number_util_1.constrainRange(v / 100, 0, 1);
    var c = vp * sp;
    var x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
    var m = vp - c;
    var rp, gp, bp;
    if (hp >= 0 && hp < 60) {
        _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
    }
    else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
    }
    else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
    }
    else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
    }
    else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
    }
    else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
    }
    return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
exports.hsvToRgbInt = hsvToRgbInt;
/**
 * @hidden
 */
function hslToHsvInt(h, s, l) {
    var sd = l + (s * (100 - Math.abs(2 * l - 100))) / (2 * 100);
    return [h, sd !== 0 ? (s * (100 - Math.abs(2 * l - 100))) / sd : 0, l + (s * (100 - Math.abs(2 * l - 100))) / (2 * 100)];
}
exports.hslToHsvInt = hslToHsvInt;
/**
 * @hidden
 */
function hsvToHslInt(h, s, v) {
    var sd = 100 - Math.abs((v * (200 - s)) / 100 - 100);
    return [h, sd !== 0 ? (s * v) / sd : 0, (v * (200 - s)) / (2 * 100)];
}
exports.hsvToHslInt = hsvToHslInt;
/**
 * @hidden
 */
function removeAlphaComponent(comps) {
    return [comps[0], comps[1], comps[2]];
}
exports.removeAlphaComponent = removeAlphaComponent;
/**
 * @hidden
 */
function appendAlphaComponent(comps, alpha) {
    return [comps[0], comps[1], comps[2], alpha];
}
exports.appendAlphaComponent = appendAlphaComponent;
var MODE_CONVERTER_MAP = {
    hsl: {
        hsl: function (h, s, l) { return [h, s, l]; },
        hsv: hslToHsvInt,
        rgb: hslToRgbInt
    },
    hsv: {
        hsl: hsvToHslInt,
        hsv: function (h, s, v) { return [h, s, v]; },
        rgb: hsvToRgbInt
    },
    rgb: {
        hsl: rgbToHslInt,
        hsv: rgbToHsvInt,
        rgb: function (r, g, b) { return [r, g, b]; }
    }
};
/**
 * @hidden
 */
function getColorMaxComponents(mode, type) {
    return [type === 'float' ? 1 : mode === 'rgb' ? 255 : 360, type === 'float' ? 1 : mode === 'rgb' ? 255 : 100, type === 'float' ? 1 : mode === 'rgb' ? 255 : 100];
}
exports.getColorMaxComponents = getColorMaxComponents;
function loopHueRange(hue, max) {
    // Maximum value of the slider (e.g. 360deg) should be kept
    return hue === max ? max : number_util_1.loopRange(hue, max);
}
/**
 * @hidden
 */
function constrainColorComponents(components, mode, type) {
    var _a;
    var ms = getColorMaxComponents(mode, type);
    return [
        mode === 'rgb' ? number_util_1.constrainRange(components[0], 0, ms[0]) : loopHueRange(components[0], ms[0]),
        number_util_1.constrainRange(components[1], 0, ms[1]),
        number_util_1.constrainRange(components[2], 0, ms[2]),
        number_util_1.constrainRange((_a = components[3]) !== null && _a !== void 0 ? _a : 1, 0, 1),
    ];
}
exports.constrainColorComponents = constrainColorComponents;
function convertColorType(comps, mode, from, to) {
    var fms = getColorMaxComponents(mode, from);
    var tms = getColorMaxComponents(mode, to);
    return comps.map(function (c, index) { return (c / fms[index]) * tms[index]; });
}
/**
 * @hidden
 */
function convertColor(components, from, to) {
    var _a;
    var intComps = convertColorType(components, from.mode, from.type, 'int');
    var result = (_a = MODE_CONVERTER_MAP[from.mode])[to.mode].apply(_a, intComps);
    return convertColorType(result, to.mode, 'int', to.type);
}
exports.convertColor = convertColor;
