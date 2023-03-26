"use strict";
exports.__esModule = true;
exports.PlainView = void 0;
var class_name_1 = require("./class-name");
/**
 * @hidden
 */
var PlainView = /** @class */ (function () {
    function PlainView(doc, config) {
        var className = class_name_1.ClassName(config.viewName);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
    }
    return PlainView;
}());
exports.PlainView = PlainView;
