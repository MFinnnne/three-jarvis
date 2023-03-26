"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSwatchController = void 0;
var color_swatch_1 = require("../view/color-swatch");
/**
 * @hidden
 */
var ColorSwatchController = /** @class */ (function () {
    function ColorSwatchController(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new color_swatch_1.ColorSwatchView(doc, {
            value: this.value,
            viewProps: this.viewProps,
        });
    }
    return ColorSwatchController;
}());
exports.ColorSwatchController = ColorSwatchController;
