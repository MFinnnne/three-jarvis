"use strict";
exports.__esModule = true;
exports.RangeConstraint = void 0;
var type_util_1 = require("../../misc/type-util");
var value_map_1 = require("../model/value-map");
/**
 * A number range constraint.
 */
var RangeConstraint = /** @class */ (function () {
    function RangeConstraint(config) {
        this.values = value_map_1.ValueMap.fromObject({
            max: config.max,
            min: config.min
        });
    }
    Object.defineProperty(RangeConstraint.prototype, "maxValue", {
        // TODO: Remove property in the next major version
        /**
         * @deprecated Use values.get('max') instead.
         */
        get: function () {
            return this.values.get('max');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeConstraint.prototype, "minValue", {
        // TODO: Remove property in the next major version
        /**
         * @deprecated Use values.get('min') instead.
         */
        get: function () {
            return this.values.get('min');
        },
        enumerable: false,
        configurable: true
    });
    RangeConstraint.prototype.constrain = function (value) {
        var max = this.values.get('max');
        var min = this.values.get('min');
        var result = value;
        if (!type_util_1.isEmpty(min)) {
            result = Math.max(result, min);
        }
        if (!type_util_1.isEmpty(max)) {
            result = Math.min(result, max);
        }
        return result;
    };
    return RangeConstraint;
}());
exports.RangeConstraint = RangeConstraint;
