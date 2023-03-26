"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindValueMap = exports.bindValue = void 0;
function compose(h1, h2) {
    return function (input) { return h2(h1(input)); };
}
function extractValue(ev) {
    return ev.rawValue;
}
function bindValue(value, applyValue) {
    value.emitter.on('change', compose(extractValue, applyValue));
    applyValue(value.rawValue);
}
exports.bindValue = bindValue;
function bindValueMap(valueMap, key, applyValue) {
    bindValue(valueMap.value(key), applyValue);
}
exports.bindValueMap = bindValueMap;
