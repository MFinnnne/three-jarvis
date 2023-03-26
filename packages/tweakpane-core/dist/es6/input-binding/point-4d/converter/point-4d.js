"use strict";
exports.__esModule = true;
exports.writePoint4d = exports.point4dFromUnknown = void 0;
var point_4d_1 = require("../model/point-4d");
/**
 * @hidden
 */
function point4dFromUnknown(value) {
    return point_4d_1.Point4d.isObject(value) ? new point_4d_1.Point4d(value.x, value.y, value.z, value.w) : new point_4d_1.Point4d();
}
exports.point4dFromUnknown = point4dFromUnknown;
function writePoint4d(target, value) {
    target.writeProperty('x', value.x);
    target.writeProperty('y', value.y);
    target.writeProperty('z', value.z);
    target.writeProperty('w', value.w);
}
exports.writePoint4d = writePoint4d;
