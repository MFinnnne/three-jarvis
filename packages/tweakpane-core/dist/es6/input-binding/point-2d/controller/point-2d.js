"use strict";
exports.__esModule = true;
exports.Point2dController = void 0;
var foldable_1 = require("../../../blade/common/model/foldable");
var popup_1 = require("../../../common/controller/popup");
var dom_util_1 = require("../../../common/dom-util");
var value_sync_1 = require("../../../common/model/value-sync");
var type_util_1 = require("../../../misc/type-util");
var point_nd_text_1 = require("../../common/controller/point-nd-text");
var point_2d_1 = require("../model/point-2d");
var point_2d_2 = require("../view/point-2d");
var point_2d_picker_1 = require("./point-2d-picker");
/**
 * @hidden
 */
var Point2dController = /** @class */ (function () {
    function Point2dController(doc, config) {
        var _this = this;
        var _a, _b;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
        this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
        this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.foldable_ = foldable_1.Foldable.create(config.expanded);
        this.popC_ =
            config.pickerLayout === 'popup'
                ? new popup_1.PopupController(doc, {
                    viewProps: this.viewProps
                })
                : null;
        var padC = new point_2d_picker_1.Point2dPickerController(doc, {
            baseSteps: [config.axes[0].baseStep, config.axes[1].baseStep],
            invertsY: config.invertsY,
            layout: config.pickerLayout,
            maxValue: config.maxValue,
            value: this.value,
            viewProps: this.viewProps
        });
        padC.view.allFocusableElements.forEach(function (elem) {
            elem.addEventListener('blur', _this.onPopupChildBlur_);
            elem.addEventListener('keydown', _this.onPopupChildKeydown_);
        });
        this.pickerC_ = padC;
        this.textC_ = new point_nd_text_1.PointNdTextController(doc, {
            assembly: point_2d_1.Point2dAssembly,
            axes: config.axes,
            parser: config.parser,
            value: this.value,
            viewProps: this.viewProps
        });
        this.view = new point_2d_2.Point2dView(doc, {
            expanded: this.foldable_.value('expanded'),
            pickerLayout: config.pickerLayout,
            viewProps: this.viewProps
        });
        this.view.textElement.appendChild(this.textC_.view.element);
        (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', this.onPadButtonBlur_);
        (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.onPadButtonClick_);
        if (this.popC_) {
            this.view.element.appendChild(this.popC_.view.element);
            this.popC_.view.element.appendChild(this.pickerC_.view.element);
            value_sync_1.connectValues({
                primary: this.foldable_.value('expanded'),
                secondary: this.popC_.shows,
                forward: function (p) { return p.rawValue; },
                backward: function (_, s) { return s.rawValue; }
            });
        }
        else if (this.view.pickerElement) {
            this.view.pickerElement.appendChild(this.pickerC_.view.element);
            foldable_1.bindFoldable(this.foldable_, this.view.pickerElement);
        }
    }
    Point2dController.prototype.onPadButtonBlur_ = function (e) {
        if (!this.popC_) {
            return;
        }
        var elem = this.view.element;
        var nextTarget = type_util_1.forceCast(e.relatedTarget);
        if (!nextTarget || !elem.contains(nextTarget)) {
            this.popC_.shows.rawValue = false;
        }
    };
    Point2dController.prototype.onPadButtonClick_ = function () {
        this.foldable_.set('expanded', !this.foldable_.get('expanded'));
        if (this.foldable_.get('expanded')) {
            this.pickerC_.view.allFocusableElements[0].focus();
        }
    };
    Point2dController.prototype.onPopupChildBlur_ = function (ev) {
        if (!this.popC_) {
            return;
        }
        var elem = this.popC_.view.element;
        var nextTarget = dom_util_1.findNextTarget(ev);
        if (nextTarget && elem.contains(nextTarget)) {
            // Next target is in the popup
            return;
        }
        if (nextTarget && nextTarget === this.view.buttonElement && !dom_util_1.supportsTouch(elem.ownerDocument)) {
            // Next target is the trigger button
            return;
        }
        this.popC_.shows.rawValue = false;
    };
    Point2dController.prototype.onPopupChildKeydown_ = function (ev) {
        if (this.popC_) {
            if (ev.key === 'Escape') {
                this.popC_.shows.rawValue = false;
            }
        }
        else if (this.view.pickerElement) {
            if (ev.key === 'Escape') {
                this.view.buttonElement.focus();
            }
        }
    };
    return Point2dController;
}());
exports.Point2dController = Point2dController;
