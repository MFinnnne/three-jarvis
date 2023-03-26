"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlade = void 0;
var value_map_1 = require("../../../common/model/value-map");
var values_1 = require("../../../common/model/values");
var type_util_1 = require("../../../misc/type-util");
function createBlade() {
    return new value_map_1.ValueMap({
        positions: values_1.createValue([], {
            equals: type_util_1.deepEqualsArray,
        }),
    });
}
exports.createBlade = createBlade;
