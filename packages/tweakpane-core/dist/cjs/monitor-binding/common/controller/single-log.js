"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleLogController = void 0;
var single_log_1 = require("../view/single-log");
/**
 * @hidden
 */
var SingleLogController = /** @class */ (function () {
    function SingleLogController(doc, config) {
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new single_log_1.SingleLogView(doc, {
            formatter: config.formatter,
            value: this.value,
            viewProps: this.viewProps,
        });
    }
    return SingleLogController;
}());
exports.SingleLogController = SingleLogController;
