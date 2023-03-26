"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiniteRangeConstraint = void 0;
var value_map_1 = require("../model/value-map");
/**
 * A number range constraint that cannot be undefined. Used for slider control.
 */
var DefiniteRangeConstraint = /** @class */ (function () {
    function DefiniteRangeConstraint(config) {
        this.values = value_map_1.ValueMap.fromObject({
            max: config.max,
            min: config.min,
        });
    }
    DefiniteRangeConstraint.prototype.constrain = function (value) {
        var max = this.values.get('max');
        var min = this.values.get('min');
        return Math.min(Math.max(value, min), max);
    };
    return DefiniteRangeConstraint;
}());
exports.DefiniteRangeConstraint = DefiniteRangeConstraint;
