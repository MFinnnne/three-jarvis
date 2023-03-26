"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointNdTextView = void 0;
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('pndtxt');
/**
 * @hidden
 */
var PointNdTextView = /** @class */ (function () {
    function PointNdTextView(doc, config) {
        var _this = this;
        this.textViews = config.textViews;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        this.textViews.forEach(function (v) {
            var axisElem = doc.createElement('div');
            axisElem.classList.add(className('a'));
            axisElem.appendChild(v.element);
            _this.element.appendChild(axisElem);
        });
    }
    return PointNdTextView;
}());
exports.PointNdTextView = PointNdTextView;
