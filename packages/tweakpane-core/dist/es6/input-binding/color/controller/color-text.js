"use strict";
exports.__esModule = true;
exports.ColorTextController = void 0;
var definite_range_1 = require("../../../common/constraint/definite-range");
var number_1 = require("../../../common/converter/number");
var value_map_1 = require("../../../common/model/value-map");
var value_sync_1 = require("../../../common/model/value-sync");
var values_1 = require("../../../common/model/values");
var number_text_1 = require("../../../common/number/controller/number-text");
var color_1 = require("../model/color");
var color_model_1 = require("../model/color-model");
var util_1 = require("../util");
var color_text_1 = require("../view/color-text");
function createFormatter(type) {
    return number_1.createNumberFormatter(type === 'float' ? 2 : 0);
}
function createConstraint(mode, type, index) {
    var max = color_model_1.getColorMaxComponents(mode, type)[index];
    return new definite_range_1.DefiniteRangeConstraint({
        min: 0,
        max: max
    });
}
function createComponentController(doc, config, index) {
    return new number_text_1.NumberTextController(doc, {
        arrayPosition: index === 0 ? 'fst' : index === 3 - 1 ? 'lst' : 'mid',
        baseStep: util_1.getBaseStepForColor(false),
        parser: config.parser,
        props: value_map_1.ValueMap.fromObject({
            draggingScale: config.colorType === 'float' ? 0.01 : 1,
            formatter: createFormatter(config.colorType)
        }),
        value: values_1.createValue(0, {
            constraint: createConstraint(config.colorMode, config.colorType, index)
        }),
        viewProps: config.viewProps
    });
}
/**
 * @hidden
 */
var ColorTextController = /** @class */ (function () {
    function ColorTextController(doc, config) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
        this.colorType_ = config.colorType;
        this.parser_ = config.parser;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.colorMode = values_1.createValue(this.value.rawValue.mode);
        this.ccs_ = this.createComponentControllers_(doc);
        this.view = new color_text_1.ColorTextView(doc, {
            colorMode: this.colorMode,
            textViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
            viewProps: this.viewProps
        });
        this.view.modeSelectElement.addEventListener('change', this.onModeSelectChange_);
    }
    ColorTextController.prototype.createComponentControllers_ = function (doc) {
        var _this = this;
        var cc = {
            colorMode: this.colorMode.rawValue,
            colorType: this.colorType_,
            parser: this.parser_,
            viewProps: this.viewProps
        };
        var ccs = [createComponentController(doc, cc, 0), createComponentController(doc, cc, 1), createComponentController(doc, cc, 2)];
        ccs.forEach(function (cs, index) {
            value_sync_1.connectValues({
                primary: _this.value,
                secondary: cs.value,
                forward: function (p) {
                    return p.rawValue.getComponents(_this.colorMode.rawValue, _this.colorType_)[index];
                },
                backward: function (p, s) {
                    var pickedMode = _this.colorMode.rawValue;
                    var comps = p.rawValue.getComponents(pickedMode, _this.colorType_);
                    comps[index] = s.rawValue;
                    return new color_1.Color(color_model_1.appendAlphaComponent(color_model_1.removeAlphaComponent(comps), comps[3]), pickedMode, _this.colorType_);
                }
            });
        });
        return ccs;
    };
    ColorTextController.prototype.onModeSelectChange_ = function (ev) {
        var selectElem = ev.currentTarget;
        this.colorMode.rawValue = selectElem.value;
        this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
        this.view.textViews = [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view];
    };
    return ColorTextController;
}());
exports.ColorTextController = ColorTextController;
