"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberTextView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('txt');
var NumberTextView = /** @class */ (function () {
    function NumberTextView(doc, config) {
        this.onChange_ = this.onChange_.bind(this);
        this.props_ = config.props;
        this.props_.emitter.on('change', this.onChange_);
        this.element = doc.createElement('div');
        this.element.classList.add(className(), className(undefined, 'num'));
        if (config.arrayPosition) {
            this.element.classList.add(className(undefined, config.arrayPosition));
        }
        config.viewProps.bindClassModifiers(this.element);
        var inputElem = doc.createElement('input');
        inputElem.classList.add(className('i'));
        inputElem.type = 'text';
        config.viewProps.bindDisabled(inputElem);
        this.element.appendChild(inputElem);
        this.inputElement = inputElem;
        this.onDraggingChange_ = this.onDraggingChange_.bind(this);
        this.dragging_ = config.dragging;
        this.dragging_.emitter.on('change', this.onDraggingChange_);
        this.element.classList.add(className());
        this.inputElement.classList.add(className('i'));
        var knobElem = doc.createElement('div');
        knobElem.classList.add(className('k'));
        this.element.appendChild(knobElem);
        this.knobElement = knobElem;
        var guideElem = doc.createElementNS(dom_util_1.SVG_NS, 'svg');
        guideElem.classList.add(className('g'));
        this.knobElement.appendChild(guideElem);
        var bodyElem = doc.createElementNS(dom_util_1.SVG_NS, 'path');
        bodyElem.classList.add(className('gb'));
        guideElem.appendChild(bodyElem);
        this.guideBodyElem_ = bodyElem;
        var headElem = doc.createElementNS(dom_util_1.SVG_NS, 'path');
        headElem.classList.add(className('gh'));
        guideElem.appendChild(headElem);
        this.guideHeadElem_ = headElem;
        var tooltipElem = doc.createElement('div');
        tooltipElem.classList.add(class_name_1.ClassName('tt')());
        this.knobElement.appendChild(tooltipElem);
        this.tooltipElem_ = tooltipElem;
        config.value.emitter.on('change', this.onChange_);
        this.value = config.value;
        this.refresh();
    }
    NumberTextView.prototype.onDraggingChange_ = function (ev) {
        if (ev.rawValue === null) {
            this.element.classList.remove(className(undefined, 'drg'));
            return;
        }
        this.element.classList.add(className(undefined, 'drg'));
        var x = ev.rawValue / this.props_.get('draggingScale');
        var aox = x + (x > 0 ? -1 : x < 0 ? +1 : 0);
        var adx = number_util_1.constrainRange(-aox, -4, +4);
        this.guideHeadElem_.setAttributeNS(null, 'd', ["M " + (aox + adx) + ",0 L" + aox + ",4 L" + (aox + adx) + ",8", "M " + x + ",-1 L" + x + ",9"].join(' '));
        this.guideBodyElem_.setAttributeNS(null, 'd', "M 0,4 L" + x + ",4");
        var formatter = this.props_.get('formatter');
        this.tooltipElem_.textContent = formatter(this.value.rawValue);
        this.tooltipElem_.style.left = x + "px";
    };
    NumberTextView.prototype.refresh = function () {
        var formatter = this.props_.get('formatter');
        this.inputElement.value = formatter(this.value.rawValue);
    };
    NumberTextView.prototype.onChange_ = function () {
        this.refresh();
    };
    return NumberTextView;
}());
exports.NumberTextView = NumberTextView;
