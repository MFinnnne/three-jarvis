"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLogController = void 0;
var multi_log_1 = require("../view/multi-log");
/**
 * @hidden
 */
var MultiLogController = /** @class */ (function () {
    function MultiLogController(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new multi_log_1.MultiLogView(doc, {
            formatter: config.formatter,
            lineCount: config.lineCount,
            value: this.value,
            viewProps: this.viewProps,
        });
    }
    return MultiLogController;
}());
exports.MultiLogController = MultiLogController;
