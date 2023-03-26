"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalTicker = void 0;
var emitter_1 = require("../../model/emitter");
/**
 * @hidden
 */
var IntervalTicker = /** @class */ (function () {
    function IntervalTicker(doc, interval) {
        this.disabled_ = false;
        this.timerId_ = null;
        this.onTick_ = this.onTick_.bind(this);
        // this.onWindowBlur_ = this.onWindowBlur_.bind(this);
        // this.onWindowFocus_ = this.onWindowFocus_.bind(this);
        this.doc_ = doc;
        this.emitter = new emitter_1.Emitter();
        this.interval_ = interval;
        this.setTimer_();
        // TODO: Stop on blur?
        // const win = document.defaultView;
        // if (win) {
        //   win.addEventListener('blur', this.onWindowBlur_);
        //   win.addEventListener('focus', this.onWindowFocus_);
        // }
    }
    Object.defineProperty(IntervalTicker.prototype, "disabled", {
        get: function () {
            return this.disabled_;
        },
        set: function (inactive) {
            this.disabled_ = inactive;
            if (this.disabled_) {
                this.clearTimer_();
            }
            else {
                this.setTimer_();
            }
        },
        enumerable: false,
        configurable: true
    });
    IntervalTicker.prototype.dispose = function () {
        this.clearTimer_();
    };
    IntervalTicker.prototype.clearTimer_ = function () {
        if (this.timerId_ === null) {
            return;
        }
        var win = this.doc_.defaultView;
        if (win) {
            win.clearInterval(this.timerId_);
        }
        this.timerId_ = null;
    };
    IntervalTicker.prototype.setTimer_ = function () {
        this.clearTimer_();
        if (this.interval_ <= 0) {
            return;
        }
        var win = this.doc_.defaultView;
        if (win) {
            this.timerId_ = win.setInterval(this.onTick_, this.interval_);
        }
    };
    IntervalTicker.prototype.onTick_ = function () {
        if (this.disabled_) {
            return;
        }
        this.emitter.emit('tick', {
            sender: this,
        });
    };
    return IntervalTicker;
}());
exports.IntervalTicker = IntervalTicker;
