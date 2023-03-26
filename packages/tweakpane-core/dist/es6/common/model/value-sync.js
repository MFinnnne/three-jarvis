"use strict";
exports.__esModule = true;
exports.connectValues = void 0;
/**
 * Synchronizes two values.
 */
function connectValues(_a) {
    var primary = _a.primary, secondary = _a.secondary, forward = _a.forward, backward = _a.backward;
    // Prevents an event firing loop
    // e.g.
    // primary changed
    // -> applies changes to secondary
    // -> secondary changed
    // -> applies changes to primary
    // -> ...
    var changing = false;
    function preventFeedback(callback) {
        if (changing) {
            return;
        }
        changing = true;
        callback();
        changing = false;
    }
    primary.emitter.on('change', function (ev) {
        preventFeedback(function () {
            secondary.setRawValue(forward(primary, secondary), ev.options);
        });
    });
    secondary.emitter.on('change', function (ev) {
        preventFeedback(function () {
            primary.setRawValue(backward(primary, secondary), ev.options);
        });
        // Re-update secondary value
        // to apply change from constraint of primary value
        preventFeedback(function () {
            secondary.setRawValue(forward(primary, secondary), ev.options);
        });
    });
    preventFeedback(function () {
        secondary.setRawValue(forward(primary, secondary), {
            forceEmit: false,
            emit: true,
            last: true
        });
    });
}
exports.connectValues = connectValues;
