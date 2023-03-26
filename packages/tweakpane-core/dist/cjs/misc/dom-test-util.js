"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestWindow = void 0;
var jsdom_1 = require("jsdom");
var type_util_1 = require("./type-util");
function createTestWindow() {
    return type_util_1.forceCast(new jsdom_1.JSDOM('').window);
}
exports.createTestWindow = createTestWindow;
