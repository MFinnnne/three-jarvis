"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphLogView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('grl');
/**
 * @hidden
 */
var GraphLogView = /** @class */ (function () {
    function GraphLogView(doc, config) {
        this.onCursorChange_ = this.onCursorChange_.bind(this);
        this.onValueUpdate_ = this.onValueUpdate_.bind(this);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        this.formatter_ = config.formatter;
        this.props_ = config.props;
        this.cursor_ = config.cursor;
        this.cursor_.emitter.on('change', this.onCursorChange_);
        var svgElem = doc.createElementNS(dom_util_1.SVG_NS, 'svg');
        svgElem.classList.add(className('g'));
        svgElem.style.height = "calc(var(--bld-us) * " + config.lineCount + ")";
        this.element.appendChild(svgElem);
        this.svgElem_ = svgElem;
        var lineElem = doc.createElementNS(dom_util_1.SVG_NS, 'polyline');
        this.svgElem_.appendChild(lineElem);
        this.lineElem_ = lineElem;
        var tooltipElem = doc.createElement('div');
        tooltipElem.classList.add(className('t'), class_name_1.ClassName('tt')());
        this.element.appendChild(tooltipElem);
        this.tooltipElem_ = tooltipElem;
        config.value.emitter.on('change', this.onValueUpdate_);
        this.value = config.value;
        this.update_();
    }
    Object.defineProperty(GraphLogView.prototype, "graphElement", {
        get: function () {
            return this.svgElem_;
        },
        enumerable: false,
        configurable: true
    });
    GraphLogView.prototype.update_ = function () {
        var bounds = this.svgElem_.getBoundingClientRect();
        // Graph
        var maxIndex = this.value.rawValue.length - 1;
        var min = this.props_.get('minValue');
        var max = this.props_.get('maxValue');
        var points = [];
        this.value.rawValue.forEach(function (v, index) {
            if (v === undefined) {
                return;
            }
            var x = number_util_1.mapRange(index, 0, maxIndex, 0, bounds.width);
            var y = number_util_1.mapRange(v, min, max, bounds.height, 0);
            points.push([x, y].join(','));
        });
        this.lineElem_.setAttributeNS(null, 'points', points.join(' '));
        // Cursor
        var tooltipElem = this.tooltipElem_;
        var value = this.value.rawValue[this.cursor_.rawValue];
        if (value === undefined) {
            tooltipElem.classList.remove(className('t', 'a'));
            return;
        }
        var tx = number_util_1.mapRange(this.cursor_.rawValue, 0, maxIndex, 0, bounds.width);
        var ty = number_util_1.mapRange(value, min, max, bounds.height, 0);
        tooltipElem.style.left = tx + "px";
        tooltipElem.style.top = ty + "px";
        tooltipElem.textContent = "" + this.formatter_(value);
        if (!tooltipElem.classList.contains(className('t', 'a'))) {
            // Suppresses unwanted initial transition
            tooltipElem.classList.add(className('t', 'a'), className('t', 'in'));
            dom_util_1.forceReflow(tooltipElem);
            tooltipElem.classList.remove(className('t', 'in'));
        }
    };
    GraphLogView.prototype.onValueUpdate_ = function () {
        this.update_();
    };
    GraphLogView.prototype.onCursorChange_ = function () {
        this.update_();
    };
    return GraphLogView;
}());
exports.GraphLogView = GraphLogView;
