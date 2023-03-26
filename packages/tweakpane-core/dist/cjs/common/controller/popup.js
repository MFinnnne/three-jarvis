"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupController = void 0;
var values_1 = require("../model/values");
var popup_1 = require("../view/popup");
var PopupController = /** @class */ (function () {
    function PopupController(doc, config) {
        this.shows = values_1.createValue(false);
        this.viewProps = config.viewProps;
        this.view = new popup_1.PopupView(doc, {
            shows: this.shows,
            viewProps: this.viewProps,
        });
    }
    return PopupController;
}());
exports.PopupController = PopupController;
