"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPropertyWritable = exports.deepEqualsArray = exports.isEmpty = exports.forceCast = void 0;
function forceCast(v) {
    return v;
}
exports.forceCast = forceCast;
function isEmpty(value) {
    return value === null || value === undefined;
}
exports.isEmpty = isEmpty;
function deepEqualsArray(a1, a2) {
    if (a1.length !== a2.length) {
        return false;
    }
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
exports.deepEqualsArray = deepEqualsArray;
function isPropertyWritable(obj, key) {
    var target = obj;
    do {
        var d = Object.getOwnPropertyDescriptor(target, key);
        if (d && (d.set !== undefined || d.writable === true)) {
            return true;
        }
        target = Object.getPrototypeOf(target);
    } while (target !== null);
    return false;
}
exports.isPropertyWritable = isPropertyWritable;
