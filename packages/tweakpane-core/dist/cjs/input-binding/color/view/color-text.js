"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorTextView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var reactive_1 = require("../../../common/model/reactive");
var class_name_1 = require("../../../common/view/class-name");
var className = class_name_1.ClassName('coltxt');
function createModeSelectElement(doc) {
    var selectElem = doc.createElement('select');
    var items = [
        { text: 'RGB', value: 'rgb' },
        { text: 'HSL', value: 'hsl' },
        { text: 'HSV', value: 'hsv' },
    ];
    selectElem.appendChild(items.reduce(function (frag, item) {
        var optElem = doc.createElement('option');
        optElem.textContent = item.text;
        optElem.value = item.value;
        frag.appendChild(optElem);
        return frag;
    }, doc.createDocumentFragment()));
    return selectElem;
}
/**
 * @hidden
 */
var ColorTextView = /** @class */ (function () {
    function ColorTextView(doc, config) {
        var _this = this;
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        var modeElem = doc.createElement('div');
        modeElem.classList.add(className('m'));
        this.modeElem_ = createModeSelectElement(doc);
        this.modeElem_.classList.add(className('ms'));
        modeElem.appendChild(this.modeSelectElement);
        config.viewProps.bindDisabled(this.modeElem_);
        var modeMarkerElem = doc.createElement('div');
        modeMarkerElem.classList.add(className('mm'));
        modeMarkerElem.appendChild(dom_util_1.createSvgIconElement(doc, 'dropdown'));
        modeElem.appendChild(modeMarkerElem);
        this.element.appendChild(modeElem);
        var textsElem = doc.createElement('div');
        textsElem.classList.add(className('w'));
        this.element.appendChild(textsElem);
        this.textsElem_ = textsElem;
        this.textViews_ = config.textViews;
        this.applyTextViews_();
        reactive_1.bindValue(config.colorMode, function (mode) {
            _this.modeElem_.value = mode;
        });
    }
    Object.defineProperty(ColorTextView.prototype, "modeSelectElement", {
        get: function () {
            return this.modeElem_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorTextView.prototype, "textViews", {
        get: function () {
            return this.textViews_;
        },
        set: function (textViews) {
            this.textViews_ = textViews;
            this.applyTextViews_();
        },
        enumerable: false,
        configurable: true
    });
    ColorTextView.prototype.applyTextViews_ = function () {
        var _this = this;
        dom_util_1.removeChildElements(this.textsElem_);
        var doc = this.element.ownerDocument;
        this.textViews_.forEach(function (v) {
            var compElem = doc.createElement('div');
            compElem.classList.add(className('c'));
            compElem.appendChild(v.element);
            _this.textsElem_.appendChild(compElem);
        });
    };
    return ColorTextView;
}());
exports.ColorTextView = ColorTextView;
