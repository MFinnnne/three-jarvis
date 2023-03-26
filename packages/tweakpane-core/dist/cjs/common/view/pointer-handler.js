"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerHandler = void 0;
var emitter_1 = require("../model/emitter");
function computeOffset(ev, elem) {
    var _a, _b;
    // NOTE: OffsetX/Y should be computed from page and window properties to capture mouse events
    var win = elem.ownerDocument.defaultView;
    var rect = elem.getBoundingClientRect();
    return {
        x: ev.pageX - (((_a = (win && win.scrollX)) !== null && _a !== void 0 ? _a : 0) + rect.left),
        y: ev.pageY - (((_b = (win && win.scrollY)) !== null && _b !== void 0 ? _b : 0) + rect.top),
    };
}
/**
 * A utility class to handle both mouse and touch events.
 */
var PointerHandler = /** @class */ (function () {
    function PointerHandler(element) {
        this.lastTouch_ = null;
        this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
        this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
        this.onMouseDown_ = this.onMouseDown_.bind(this);
        this.onTouchEnd_ = this.onTouchEnd_.bind(this);
        this.onTouchMove_ = this.onTouchMove_.bind(this);
        this.onTouchStart_ = this.onTouchStart_.bind(this);
        this.elem_ = element;
        this.emitter = new emitter_1.Emitter();
        element.addEventListener('touchstart', this.onTouchStart_, {
            passive: false,
        });
        element.addEventListener('touchmove', this.onTouchMove_, {
            passive: true,
        });
        element.addEventListener('touchend', this.onTouchEnd_);
        element.addEventListener('mousedown', this.onMouseDown_);
    }
    PointerHandler.prototype.computePosition_ = function (offset) {
        var rect = this.elem_.getBoundingClientRect();
        return {
            bounds: {
                width: rect.width,
                height: rect.height,
            },
            point: offset
                ? {
                    x: offset.x,
                    y: offset.y,
                }
                : null,
        };
    };
    PointerHandler.prototype.onMouseDown_ = function (ev) {
        var _a;
        // Prevent native text selection
        ev.preventDefault();
        (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
        var doc = this.elem_.ownerDocument;
        doc.addEventListener('mousemove', this.onDocumentMouseMove_);
        doc.addEventListener('mouseup', this.onDocumentMouseUp_);
        this.emitter.emit('down', {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey,
        });
    };
    PointerHandler.prototype.onDocumentMouseMove_ = function (ev) {
        this.emitter.emit('move', {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey,
        });
    };
    PointerHandler.prototype.onDocumentMouseUp_ = function (ev) {
        var doc = this.elem_.ownerDocument;
        doc.removeEventListener('mousemove', this.onDocumentMouseMove_);
        doc.removeEventListener('mouseup', this.onDocumentMouseUp_);
        this.emitter.emit('up', {
            altKey: ev.altKey,
            data: this.computePosition_(computeOffset(ev, this.elem_)),
            sender: this,
            shiftKey: ev.shiftKey,
        });
    };
    PointerHandler.prototype.onTouchStart_ = function (ev) {
        // Prevent native page scroll
        ev.preventDefault();
        var touch = ev.targetTouches.item(0);
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit('down', {
            altKey: ev.altKey,
            data: this.computePosition_(touch
                ? {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                }
                : undefined),
            sender: this,
            shiftKey: ev.shiftKey,
        });
        this.lastTouch_ = touch;
    };
    PointerHandler.prototype.onTouchMove_ = function (ev) {
        var touch = ev.targetTouches.item(0);
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit('move', {
            altKey: ev.altKey,
            data: this.computePosition_(touch
                ? {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                }
                : undefined),
            sender: this,
            shiftKey: ev.shiftKey,
        });
        this.lastTouch_ = touch;
    };
    PointerHandler.prototype.onTouchEnd_ = function (ev) {
        var _a;
        var touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
        var rect = this.elem_.getBoundingClientRect();
        this.emitter.emit('up', {
            altKey: ev.altKey,
            data: this.computePosition_(touch
                ? {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                }
                : undefined),
            sender: this,
            shiftKey: ev.shiftKey,
        });
    };
    return PointerHandler;
}());
exports.PointerHandler = PointerHandler;
