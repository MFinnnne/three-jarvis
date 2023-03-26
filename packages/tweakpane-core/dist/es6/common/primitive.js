"use strict";
exports.__esModule = true;
exports.writePrimitive = void 0;
/**
 * Writes the primitive value.
 * @param target The target to be written.
 * @param value The value to write.
 */
function writePrimitive(target, value) {
    target.write(value);
}
exports.writePrimitive = writePrimitive;
