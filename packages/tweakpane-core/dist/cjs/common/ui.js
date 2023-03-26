"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrowKey = exports.isVerticalArrowKey = exports.getHorizontalStepKeys = exports.getVerticalStepKeys = exports.getStepForKey = void 0;
/**
 * @hidden
 */
function getStepForKey(baseStep, keys) {
    var step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
    if (keys.upKey) {
        return +step;
    }
    else if (keys.downKey) {
        return -step;
    }
    return 0;
}
exports.getStepForKey = getStepForKey;
/**
 * @hidden
 */
function getVerticalStepKeys(ev) {
    return {
        altKey: ev.altKey,
        downKey: ev.key === 'ArrowDown',
        shiftKey: ev.shiftKey,
        upKey: ev.key === 'ArrowUp',
    };
}
exports.getVerticalStepKeys = getVerticalStepKeys;
/**
 * @hidden
 */
function getHorizontalStepKeys(ev) {
    return {
        altKey: ev.altKey,
        downKey: ev.key === 'ArrowLeft',
        shiftKey: ev.shiftKey,
        upKey: ev.key === 'ArrowRight',
    };
}
exports.getHorizontalStepKeys = getHorizontalStepKeys;
/**
 * @hidden
 */
function isVerticalArrowKey(key) {
    return key === 'ArrowUp' || key === 'ArrowDown';
}
exports.isVerticalArrowKey = isVerticalArrowKey;
/**
 * @hidden
 */
function isArrowKey(key) {
    return isVerticalArrowKey(key) || key === 'ArrowLeft' || key === 'ArrowRight';
}
exports.isArrowKey = isArrowKey;
