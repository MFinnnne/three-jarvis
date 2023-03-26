"use strict";
exports.__esModule = true;
exports.GraphLogController = void 0;
var dom_util_1 = require("../../../common/dom-util");
var values_1 = require("../../../common/model/values");
var number_util_1 = require("../../../common/number-util");
var pointer_handler_1 = require("../../../common/view/pointer-handler");
var graph_log_1 = require("../view/graph-log");
/**
 * @hidden
 */
var GraphLogController = /** @class */ (function () {
    function GraphLogController(doc, config) {
        this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
        this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
        this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
        this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
        this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
        this.props_ = config.props;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.cursor_ = values_1.createValue(-1);
        this.view = new graph_log_1.GraphLogView(doc, {
            cursor: this.cursor_,
            formatter: config.formatter,
            lineCount: config.lineCount,
            props: this.props_,
            value: this.value,
            viewProps: this.viewProps
        });
        if (!dom_util_1.supportsTouch(doc)) {
            this.view.element.addEventListener('mousemove', this.onGraphMouseMove_);
            this.view.element.addEventListener('mouseleave', this.onGraphMouseLeave_);
        }
        else {
            var ph = new pointer_handler_1.PointerHandler(this.view.element);
            ph.emitter.on('down', this.onGraphPointerDown_);
            ph.emitter.on('move', this.onGraphPointerMove_);
            ph.emitter.on('up', this.onGraphPointerUp_);
        }
    }
    GraphLogController.prototype.onGraphMouseLeave_ = function () {
        this.cursor_.rawValue = -1;
    };
    GraphLogController.prototype.onGraphMouseMove_ = function (ev) {
        var bounds = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(number_util_1.mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
    };
    GraphLogController.prototype.onGraphPointerDown_ = function (ev) {
        this.onGraphPointerMove_(ev);
    };
    GraphLogController.prototype.onGraphPointerMove_ = function (ev) {
        if (!ev.data.point) {
            this.cursor_.rawValue = -1;
            return;
        }
        this.cursor_.rawValue = Math.floor(number_util_1.mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
    };
    GraphLogController.prototype.onGraphPointerUp_ = function () {
        this.cursor_.rawValue = -1;
    };
    return GraphLogController;
}());
exports.GraphLogController = GraphLogController;
