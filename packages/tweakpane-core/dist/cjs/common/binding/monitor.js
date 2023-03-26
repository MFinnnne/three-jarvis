"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorBinding = void 0;
var buffered_value_1 = require("../model/buffered-value");
var emitter_1 = require("../model/emitter");
/**
 * @hidden
 */
var MonitorBinding = /** @class */ (function () {
    function MonitorBinding(config) {
        this.onTick_ = this.onTick_.bind(this);
        this.reader_ = config.reader;
        this.target = config.target;
        this.emitter = new emitter_1.Emitter();
        this.value = config.value;
        this.ticker = config.ticker;
        this.ticker.emitter.on('tick', this.onTick_);
        this.read();
    }
    MonitorBinding.prototype.dispose = function () {
        this.ticker.dispose();
    };
    MonitorBinding.prototype.read = function () {
        var targetValue = this.target.read();
        if (targetValue === undefined) {
            return;
        }
        var buffer = this.value.rawValue;
        var newValue = this.reader_(targetValue);
        this.value.rawValue = buffered_value_1.createPushedBuffer(buffer, newValue);
        this.emitter.emit('update', {
            rawValue: newValue,
            sender: this,
        });
    };
    MonitorBinding.prototype.onTick_ = function (_) {
        this.read();
    };
    return MonitorBinding;
}());
exports.MonitorBinding = MonitorBinding;
