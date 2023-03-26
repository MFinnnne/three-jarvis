"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundValue = void 0;
var emitter_1 = require("./emitter");
var BoundValue = /** @class */ (function () {
    function BoundValue(initialValue, config) {
        var _a;
        this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
        this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (function (v1, v2) { return v1 === v2; });
        this.emitter = new emitter_1.Emitter();
        this.rawValue_ = initialValue;
    }
    Object.defineProperty(BoundValue.prototype, "constraint", {
        get: function () {
            return this.constraint_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundValue.prototype, "rawValue", {
        get: function () {
            return this.rawValue_;
        },
        set: function (rawValue) {
            this.setRawValue(rawValue, {
                forceEmit: false,
                emit: true,
                last: true,
            });
        },
        enumerable: false,
        configurable: true
    });
    BoundValue.prototype.setRawValue = function (rawValue, options) {
        var opts = options !== null && options !== void 0 ? options : {
            forceEmit: false,
            emit: true,
            last: true,
        };
        var constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
        var prevValue = this.rawValue_;
        var changed = !this.equals_(prevValue, constrainedValue);
        if (!changed && !opts.forceEmit) {
            return;
        }
        this.emitter.emit('beforechange', {
            sender: this,
        });
        this.rawValue_ = constrainedValue;
        this.emitter.emit('change', {
            options: opts,
            previousRawValue: prevValue,
            rawValue: constrainedValue,
            sender: this,
        });
    };
    return BoundValue;
}());
exports.BoundValue = BoundValue;
