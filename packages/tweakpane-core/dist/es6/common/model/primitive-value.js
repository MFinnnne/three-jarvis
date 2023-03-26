"use strict";
exports.__esModule = true;
exports.PrimitiveValue = void 0;
var emitter_1 = require("./emitter");
var PrimitiveValue = /** @class */ (function () {
    function PrimitiveValue(initialValue) {
        this.emitter = new emitter_1.Emitter();
        this.value_ = initialValue;
    }
    Object.defineProperty(PrimitiveValue.prototype, "rawValue", {
        get: function () {
            return this.value_;
        },
        set: function (value) {
            this.setRawValue(value, {
                forceEmit: false,
                last: true,
                emit: true
            });
        },
        enumerable: false,
        configurable: true
    });
    PrimitiveValue.prototype.setRawValue = function (value, options) {
        var opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            last: true,
            emit: true
        };
        var prevValue = this.value_;
        if (prevValue === value && !opts.forceEmit) {
            return;
        }
        this.emitter.emit('beforechange', {
            sender: this
        });
        this.value_ = value;
        this.emitter.emit('change', {
            options: opts,
            previousRawValue: prevValue,
            rawValue: this.value_,
            sender: this
        });
    };
    return PrimitiveValue;
}());
exports.PrimitiveValue = PrimitiveValue;
