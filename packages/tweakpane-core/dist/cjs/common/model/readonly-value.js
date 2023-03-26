"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadonlyValue = void 0;
var ReadonlyValue = /** @class */ (function () {
    function ReadonlyValue(value) {
        this.value_ = value;
    }
    ReadonlyValue.create = function (value) {
        return [
            new ReadonlyValue(value),
            function (rawValue, options) {
                value.setRawValue(rawValue, options);
            },
        ];
    };
    Object.defineProperty(ReadonlyValue.prototype, "emitter", {
        /**
         * The event emitter for value changes.
         */
        get: function () {
            return this.value_.emitter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReadonlyValue.prototype, "rawValue", {
        /**
         * The raw value of the model.
         */
        get: function () {
            return this.value_.rawValue;
        },
        enumerable: false,
        configurable: true
    });
    return ReadonlyValue;
}());
exports.ReadonlyValue = ReadonlyValue;
