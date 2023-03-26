"use strict";
exports.__esModule = true;
exports.ColorPickerController = void 0;
var definite_range_1 = require("../../../common/constraint/definite-range");
var number_1 = require("../../../common/converter/number");
var value_map_1 = require("../../../common/model/value-map");
var value_sync_1 = require("../../../common/model/value-sync");
var values_1 = require("../../../common/model/values");
var number_text_1 = require("../../../common/number/controller/number-text");
var color_1 = require("../model/color");
var color_picker_1 = require("../view/color-picker");
var a_palette_1 = require("./a-palette");
var color_text_1 = require("./color-text");
var h_palette_1 = require("./h-palette");
var sv_palette_1 = require("./sv-palette");
/**
 * @hidden
 */
var ColorPickerController = /** @class */ (function () {
    function ColorPickerController(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.hPaletteC_ = new h_palette_1.HPaletteController(doc, {
            value: this.value,
            viewProps: this.viewProps
        });
        this.svPaletteC_ = new sv_palette_1.SvPaletteController(doc, {
            value: this.value,
            viewProps: this.viewProps
        });
        this.alphaIcs_ = config.supportsAlpha
            ? {
                palette: new a_palette_1.APaletteController(doc, {
                    value: this.value,
                    viewProps: this.viewProps
                }),
                text: new number_text_1.NumberTextController(doc, {
                    parser: number_1.parseNumber,
                    baseStep: 0.1,
                    props: value_map_1.ValueMap.fromObject({
                        draggingScale: 0.01,
                        formatter: number_1.createNumberFormatter(2)
                    }),
                    value: values_1.createValue(0, {
                        constraint: new definite_range_1.DefiniteRangeConstraint({ min: 0, max: 1 })
                    }),
                    viewProps: this.viewProps
                })
            }
            : null;
        if (this.alphaIcs_) {
            value_sync_1.connectValues({
                primary: this.value,
                secondary: this.alphaIcs_.text.value,
                forward: function (p) {
                    return p.rawValue.getComponents()[3];
                },
                backward: function (p, s) {
                    var comps = p.rawValue.getComponents();
                    comps[3] = s.rawValue;
                    return new color_1.Color(comps, p.rawValue.mode);
                }
            });
        }
        this.textC_ = new color_text_1.ColorTextController(doc, {
            colorType: config.colorType,
            parser: number_1.parseNumber,
            value: this.value,
            viewProps: this.viewProps
        });
        this.view = new color_picker_1.ColorPickerView(doc, {
            alphaViews: this.alphaIcs_
                ? {
                    palette: this.alphaIcs_.palette.view,
                    text: this.alphaIcs_.text.view
                }
                : null,
            hPaletteView: this.hPaletteC_.view,
            supportsAlpha: config.supportsAlpha,
            svPaletteView: this.svPaletteC_.view,
            textView: this.textC_.view,
            viewProps: this.viewProps
        });
    }
    Object.defineProperty(ColorPickerController.prototype, "textController", {
        get: function () {
            return this.textC_;
        },
        enumerable: false,
        configurable: true
    });
    return ColorPickerController;
}());
exports.ColorPickerController = ColorPickerController;
