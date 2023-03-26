"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValue = void 0;
var bound_value_1 = require("./bound-value");
var primitive_value_1 = require("./primitive-value");
function createValue(initialValue, config) {
    var constraint = config === null || config === void 0 ? void 0 : config.constraint;
    var equals = config === null || config === void 0 ? void 0 : config.equals;
    if (!constraint && !equals) {
        return new primitive_value_1.PrimitiveValue(initialValue);
    }
    return new bound_value_1.BoundValue(initialValue, config);
}
exports.createValue = createValue;
