"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtil = void 0;
exports.TestUtil = {
    createEvent: function (win, type, options) {
        return options ? new win.Event(type, options) : new win.Event(type);
    },
    createKeyboardEvent: function (win, type, options) {
        return new win.KeyboardEvent(type, options);
    },
    closeTo: function (actual, expected, delta) {
        return Math.abs(actual - expected) < delta;
    },
};
