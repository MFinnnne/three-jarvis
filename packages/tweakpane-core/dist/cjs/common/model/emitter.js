"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
/**
 * A type-safe event emitter.
 * @template E The interface that maps event names and event objects.
 */
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.observers_ = {};
    }
    /**
     * Adds an event listener to the emitter.
     * @param eventName The event name to listen.
     * @param handler The event handler.
     */
    Emitter.prototype.on = function (eventName, handler) {
        var observers = this.observers_[eventName];
        if (!observers) {
            observers = this.observers_[eventName] = [];
        }
        observers.push({
            handler: handler,
        });
        return this;
    };
    /**
     * Removes an event listener from the emitter.
     * @param eventName The event name.
     * @param handler The event handler to remove.
     */
    Emitter.prototype.off = function (eventName, handler) {
        var observers = this.observers_[eventName];
        if (observers) {
            this.observers_[eventName] = observers.filter(function (observer) {
                return observer.handler !== handler;
            });
        }
        return this;
    };
    Emitter.prototype.emit = function (eventName, event) {
        var observers = this.observers_[eventName];
        if (!observers) {
            return;
        }
        observers.forEach(function (observer) {
            observer.handler(event);
        });
    };
    return Emitter;
}());
exports.Emitter = Emitter;
