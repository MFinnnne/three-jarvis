"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BladeApi = void 0;
var BladeApi = /** @class */ (function () {
    /**
     * @hidden
     */
    function BladeApi(controller) {
        this.controller_ = controller;
    }
    Object.defineProperty(BladeApi.prototype, "element", {
        get: function () {
            return this.controller_.view.element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeApi.prototype, "disabled", {
        get: function () {
            return this.controller_.viewProps.get('disabled');
        },
        set: function (disabled) {
            this.controller_.viewProps.set('disabled', disabled);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeApi.prototype, "hidden", {
        get: function () {
            return this.controller_.viewProps.get('hidden');
        },
        set: function (hidden) {
            this.controller_.viewProps.set('hidden', hidden);
        },
        enumerable: false,
        configurable: true
    });
    BladeApi.prototype.dispose = function () {
        this.controller_.viewProps.set('disposed', true);
    };
    return BladeApi;
}());
exports.BladeApi = BladeApi;
