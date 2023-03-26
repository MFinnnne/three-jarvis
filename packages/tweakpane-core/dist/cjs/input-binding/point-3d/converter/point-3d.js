"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePoint3d = exports.point3dFromUnknown = void 0;
var point_3d_1 = require("../model/point-3d");
/**
 * @hidden
 */
function point3dFromUnknown(value) {
    return point_3d_1.Point3d.isObject(value) ? new point_3d_1.Point3d(value.x, value.y, value.z) : new point_3d_1.Point3d();
}
exports.point3dFromUnknown = point3dFromUnknown;
function writePoint3d(target, value) {
    target.writeProperty('x', value.x);
    target.writeProperty('y', value.y);
    target.writeProperty('z', value.z);
}
exports.writePoint3d = writePoint3d;
