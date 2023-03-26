"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualTicker = void 0;
var emitter_1 = require("../../model/emitter");
/**
 * @hidden
 */
var ManualTicker = /** @class */ (function () {
    function ManualTicker() {
        this.disabled = false;
        this.emitter = new emitter_1.Emitter();
    }
    ManualTicker.prototype.dispose = function () { };
    ManualTicker.prototype.tick = function () {
        if (this.disabled) {
            return;
        }
        this.emitter.emit('tick', {
            sender: this,
        });
    };
    return ManualTicker;
}());
exports.ManualTicker = ManualTicker;
