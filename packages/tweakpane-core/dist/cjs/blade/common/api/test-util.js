"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUpdates = exports.assertDisposes = exports.assertInitialState = void 0;
var assert = require("assert");
function assertInitialState(api) {
    assert.strictEqual(api.disabled, false);
    assert.strictEqual(api.hidden, false);
    assert.strictEqual(api.controller_.viewProps.get('disposed'), false);
}
exports.assertInitialState = assertInitialState;
function assertDisposes(api) {
    api.dispose();
    assert.strictEqual(api.controller_.viewProps.get('disposed'), true);
}
exports.assertDisposes = assertDisposes;
function assertUpdates(api) {
    api.disabled = true;
    assert.strictEqual(api.disabled, true);
    assert.strictEqual(api.controller_.view.element.classList.contains('tp-v-disabled'), true);
    api.hidden = true;
    assert.strictEqual(api.hidden, true);
    assert.strictEqual(api.controller_.view.element.classList.contains('tp-v-hidden'), true);
}
exports.assertUpdates = assertUpdates;
