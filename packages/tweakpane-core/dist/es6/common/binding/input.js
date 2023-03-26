"use strict";
exports.__esModule = true;
exports.InputBinding = void 0;
var emitter_1 = require("../model/emitter");
/**
 * @hidden
 */
var InputBinding = /** @class */ (function () {
    function InputBinding(config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.reader = config.reader;
        this.writer = config.writer;
        this.emitter = new emitter_1.Emitter();
        this.value = config.value;
        this.value.emitter.on('change', this.onValueChange_);
        this.target = config.target;
        this.read();
    }
    InputBinding.prototype.read = function () {
        var targetValue = this.target.read();
        if (targetValue !== undefined) {
            this.value.rawValue = this.reader(targetValue);
        }
    };
    InputBinding.prototype.write_ = function (rawValue) {
        this.writer(this.target, rawValue);
    };
    InputBinding.prototype.setValue = function (rawValue, isEmitt) {
        if (isEmitt === void 0) { isEmitt = false; }
        this.value.setRawValue(rawValue, {
            forceEmit: false,
            last: false,
            emit: isEmitt
        });
    };
    InputBinding.prototype.onValueChange_ = function (ev) {
        this.write_(ev.rawValue);
        this.emitter.emit('change', {
            options: ev.options,
            rawValue: ev.rawValue,
            sender: this
        });
    };
    return InputBinding;
}());
exports.InputBinding = InputBinding;
