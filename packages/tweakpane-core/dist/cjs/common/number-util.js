"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopRange = exports.constrainRange = exports.getDecimalDigits = exports.mapRange = void 0;
function mapRange(value, start1, end1, start2, end2) {
    var p = (value - start1) / (end1 - start1);
    return start2 + p * (end2 - start2);
}
exports.mapRange = mapRange;
function getDecimalDigits(value) {
    var text = String(value.toFixed(10));
    var frac = text.split('.')[1];
    return frac.replace(/0+$/, '').length;
}
exports.getDecimalDigits = getDecimalDigits;
function constrainRange(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
exports.constrainRange = constrainRange;
function loopRange(value, max) {
    return ((value % max) + max) % max;
}
exports.loopRange = loopRange;
