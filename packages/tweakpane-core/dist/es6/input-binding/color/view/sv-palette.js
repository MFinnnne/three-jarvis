"use strict";
exports.__esModule = true;
exports.SvPaletteView = void 0;
var dom_util_1 = require("../../../common/dom-util");
var number_util_1 = require("../../../common/number-util");
var class_name_1 = require("../../../common/view/class-name");
var color_model_1 = require("../model/color-model");
var className = class_name_1.ClassName('svp');
var CANVAS_RESOL = 64;
/**
 * @hidden
 */
var SvPaletteView = /** @class */ (function () {
    function SvPaletteView(doc, config) {
        this.onValueChange_ = this.onValueChange_.bind(this);
        this.value = config.value;
        this.value.emitter.on('change', this.onValueChange_);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
        config.viewProps.bindTabIndex(this.element);
        var canvasElem = doc.createElement('canvas');
        canvasElem.height = CANVAS_RESOL;
        canvasElem.width = CANVAS_RESOL;
        canvasElem.classList.add(className('c'));
        this.element.appendChild(canvasElem);
        this.canvasElement = canvasElem;
        var markerElem = doc.createElement('div');
        markerElem.classList.add(className('m'));
        this.element.appendChild(markerElem);
        this.markerElem_ = markerElem;
        this.update_();
    }
    SvPaletteView.prototype.update_ = function () {
        var ctx = dom_util_1.getCanvasContext(this.canvasElement);
        if (!ctx) {
            return;
        }
        var c = this.value.rawValue;
        var hsvComps = c.getComponents('hsv');
        var width = this.canvasElement.width;
        var height = this.canvasElement.height;
        var imgData = ctx.getImageData(0, 0, width, height);
        var data = imgData.data;
        for (var iy = 0; iy < height; iy++) {
            for (var ix = 0; ix < width; ix++) {
                var s = number_util_1.mapRange(ix, 0, width, 0, 100);
                var v = number_util_1.mapRange(iy, 0, height, 100, 0);
                var rgbComps = color_model_1.hsvToRgbInt(hsvComps[0], s, v);
                var i = (iy * width + ix) * 4;
                data[i] = rgbComps[0];
                data[i + 1] = rgbComps[1];
                data[i + 2] = rgbComps[2];
                data[i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        var left = number_util_1.mapRange(hsvComps[1], 0, 100, 0, 100);
        this.markerElem_.style.left = left + "%";
        var top = number_util_1.mapRange(hsvComps[2], 0, 100, 100, 0);
        this.markerElem_.style.top = top + "%";
    };
    SvPaletteView.prototype.onValueChange_ = function () {
        this.update_();
    };
    return SvPaletteView;
}());
exports.SvPaletteView = SvPaletteView;
