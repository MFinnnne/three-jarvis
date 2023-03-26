"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('spr');
/**
 * @hidden
 */
var SeparatorView = /** @class */ (function () {
    function SeparatorView(doc, config) {
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var hrElem = doc.createElement('hr');
        hrElem.classList.add(className('r'));
        this.element.appendChild(hrElem);
    }
    return SeparatorView;
}());
exports.SeparatorView = SeparatorView;
