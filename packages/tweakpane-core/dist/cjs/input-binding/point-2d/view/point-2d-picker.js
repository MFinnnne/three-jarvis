"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2dPickerView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('p2dp');
/**
 * @hidden
 */
var Point2dPickerView = /** @class */ (function () {
    function Point2dPickerView(doc, config) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this);
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.invertsY_ = config.invertsY;
        this.maxValue_ = config.maxValue;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        if (config.layout === 'popup') {
            this.element.classList.add(className(undefined, 'p'));
        }
        config.viewProps.bindClassModifiers(this.element);
        var padElem = doc.createElement('div');
        padElem.classList.add(className('p'));
        config.viewProps.bindTabIndex(padElem);
        this.element.appendChild(padElem);
        this.padElement = padElem;
        var svgElem = doc.createElementNS(dom_util_1.SVG_NS, 'svg');
        svgElem.classList.add(className('g'));
        this.padElement.appendChild(svgElem);
        this.svgElem_ = svgElem;
        var xAxisElem = doc.createElementNS(dom_util_1.SVG_NS, 'line');
        xAxisElem.classList.add(className('ax'));
        xAxisElem.setAttributeNS(null, 'x1', '0');
        xAxisElem.setAttributeNS(null, 'y1', '50%');
        xAxisElem.setAttributeNS(null, 'x2', '100%');
        xAxisElem.setAttributeNS(null, 'y2', '50%');
        this.svgElem_.appendChild(xAxisElem);
        var yAxisElem = doc.createElementNS(dom_util_1.SVG_NS, 'line');
        yAxisElem.classList.add(className('ax'));
        yAxisElem.setAttributeNS(null, 'x1', '50%');
        yAxisElem.setAttributeNS(null, 'y1', '0');
        yAxisElem.setAttributeNS(null, 'x2', '50%');
        yAxisElem.setAttributeNS(null, 'y2', '100%');
        this.svgElem_.appendChild(yAxisElem);
        var lineElem = doc.createElementNS(dom_util_1.SVG_NS, 'line');
        lineElem.classList.add(className('l'));
        lineElem.setAttributeNS(null, 'x1', '50%');
        lineElem.setAttributeNS(null, 'y1', '50%');
        this.svgElem_.appendChild(lineElem);
        this.lineElem_ = lineElem;
        var markerElem = doc.createElement('div');
        markerElem.classList.add(className('m'));
        this.padElement.appendChild(markerElem);
        this.markerElem_ = markerElem;
        config.value.emitter.on('change', this.onValueChange_);
        this.value = config.value;
        this.update_();
    }
    Object.defineProperty(Point2dPickerView.prototype, "allFocusableElements", {
        get: function () {
            return [this.padElement];
        },
        enumerable: false,
        configurable: true
    });
    Point2dPickerView.prototype.update_ = function () {
        var _a = this.value.rawValue.getComponents(), x = _a[0], y = _a[1];
        var max = this.maxValue_;
        var px = number_util_1.mapRange(x, -max, +max, 0, 100);
        var py = number_util_1.mapRange(y, -max, +max, 0, 100);
        var ipy = this.invertsY_ ? 100 - py : py;
        this.lineElem_.setAttributeNS(null, 'x2', px + "%");
        this.lineElem_.setAttributeNS(null, 'y2', ipy + "%");
        this.markerElem_.style.left = px + "%";
        this.markerElem_.style.top = ipy + "%";
    };
    Point2dPickerView.prototype.onValueChange_ = function () {
        this.update_();
    };
    Point2dPickerView.prototype.onFoldableChange_ = function () {
        this.update_();
    };
    return Point2dPickerView;
}());
exports.Point2dPickerView = Point2dPickerView;
