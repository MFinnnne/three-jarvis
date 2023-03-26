"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConstraint = exports.CompositeConstraint = void 0;
/**
 * A constraint to combine multiple constraints.
 * @template T The type of the value.
 */
var CompositeConstraint = /** @class */ (function () {
    function CompositeConstraint(constraints) {
        this.constraints = constraints;
    }
    CompositeConstraint.prototype.constrain = function (value) {
        return this.constraints.reduce(function (result, c) {
            return c.constrain(result);
        }, value);
    };
    return CompositeConstraint;
}());
exports.CompositeConstraint = CompositeConstraint;
function findConstraint(c, constraintClass) {
    if (c instanceof constraintClass) {
        return c;
    }
    if (c instanceof CompositeConstraint) {
        var result = c.constraints.reduce(function (tmpResult, sc) {
            if (tmpResult) {
                return tmpResult;
            }
            return sc instanceof constraintClass ? sc : null;
        }, null);
        if (result) {
            return result;
        }
    }
    return null;
}
exports.findConstraint = findConstraint;
