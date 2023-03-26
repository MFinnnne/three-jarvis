"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
var foldable_1 = require("../../../blade/common/model/foldable");
var popup_1 = require("../../../common/controller/popup");
var text_1 = require("../../../common/controller/text");
var dom_util_1 = require("../../../common/dom-util");
var value_map_1 = require("../../../common/model/value-map");
var value_sync_1 = require("../../../common/model/value-sync");
var type_util_1 = require("../../../misc/type-util");
var color_1 = require("../view/color");
var color_picker_1 = require("./color-picker");
var color_swatch_1 = require("./color-swatch");
/**
 * @hidden
 */
var ColorController = /** @class */ (function () {
    function ColorController(doc, config) {
        var _this = this;
        this.onButtonBlur_ = this.onButtonBlur_.bind(this);
        this.onButtonClick_ = this.onButtonClick_.bind(this);
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.foldable_ = foldable_1.Foldable.create(config.expanded);
        this.swatchC_ = new color_swatch_1.ColorSwatchController(doc, {
            value: this.value,
            viewProps: this.viewProps,
        });
        var buttonElem = this.swatchC_.view.buttonElement;
        buttonElem.addEventListener('blur', this.onButtonBlur_);
        buttonElem.addEventListener('click', this.onButtonClick_);
        this.textC_ = new text_1.TextController(doc, {
            parser: config.parser,
            props: value_map_1.ValueMap.fromObject({
                formatter: config.formatter,
            }),
            value: this.value,
            viewProps: this.viewProps,
        });
        this.view = new color_1.ColorView(doc, {
            foldable: this.foldable_,
            pickerLayout: config.pickerLayout,
        });
        this.view.swatchElement.appendChild(this.swatchC_.view.element);
        this.view.textElement.appendChild(this.textC_.view.element);
        this.popC_ =
            config.pickerLayout === 'popup'
                ? new popup_1.PopupController(doc, {
                    viewProps: this.viewProps,
                })
                : null;
        var pickerC = new color_picker_1.ColorPickerController(doc, {
            colorType: config.colorType,
            supportsAlpha: config.supportsAlpha,
            value: this.value,
            viewProps: this.viewProps,
        });
        pickerC.view.allFocusableElements.forEach(function (elem) {
            elem.addEventListener('blur', _this.onPopupChildBlur_);
            elem.addEventListener('keydown', _this.onPopupChildKeydown_);
        });
        this.pickerC_ = pickerC;
        if (this.popC_) {
            this.view.element.appendChild(this.popC_.view.element);
            this.popC_.view.element.appendChild(pickerC.view.element);
            value_sync_1.connectValues({
                primary: this.foldable_.value('expanded'),
                secondary: this.popC_.shows,
                forward: function (p) { return p.rawValue; },
                backward: function (_, s) { return s.rawValue; },
            });
        }
        else if (this.view.pickerElement) {
            this.view.pickerElement.appendChild(this.pickerC_.view.element);
            foldable_1.bindFoldable(this.foldable_, this.view.pickerElement);
        }
    }
    Object.defineProperty(ColorController.prototype, "textController", {
        get: function () {
            return this.textC_;
        },
        enumerable: false,
        configurable: true
    });
    ColorController.prototype.onButtonBlur_ = function (e) {
        if (!this.popC_) {
            return;
        }
        var elem = this.view.element;
        var nextTarget = type_util_1.forceCast(e.relatedTarget);
        if (!nextTarget || !elem.contains(nextTarget)) {
            this.popC_.shows.rawValue = false;
        }
    };
    ColorController.prototype.onButtonClick_ = function () {
        this.foldable_.set('expanded', !this.foldable_.get('expanded'));
        if (this.foldable_.get('expanded')) {
            this.pickerC_.view.allFocusableElements[0].focus();
        }
    };
    ColorController.prototype.onPopupChildBlur_ = function (ev) {
        if (!this.popC_) {
            return;
        }
        var elem = this.popC_.view.element;
        var nextTarget = dom_util_1.findNextTarget(ev);
        if (nextTarget && elem.contains(nextTarget)) {
            // Next target is in the picker
            return;
        }
        if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !dom_util_1.supportsTouch(elem.ownerDocument)) {
            // Next target is the trigger button
            return;
        }
        this.popC_.shows.rawValue = false;
    };
    ColorController.prototype.onPopupChildKeydown_ = function (ev) {
        if (this.popC_) {
            if (ev.key === 'Escape') {
                this.popC_.shows.rawValue = false;
            }
        }
        else if (this.view.pickerElement) {
            if (ev.key === 'Escape') {
                this.swatchC_.view.buttonElement.focus();
            }
        }
    };
    return ColorController;
}());
exports.ColorController = ColorController;
