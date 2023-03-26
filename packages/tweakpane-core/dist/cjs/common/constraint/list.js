"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListConstraint = void 0;
var value_map_1 = require("../model/value-map");
/**
 * A list constranit.
 * @template T The type of the value.
 */
var ListConstraint = /** @class */ (function () {
    function ListConstraint(options) {
        this.values = value_map_1.ValueMap.fromObject({
            options: options,
        });
    }
    Object.defineProperty(ListConstraint.prototype, "options", {
        // TODO: Remove property in the next major version
        /**
         * @deprecated Use values.get('options') instead.
         */
        get: function () {
            return this.values.get('options');
        },
        enumerable: false,
        configurable: true
    });
    ListConstraint.prototype.constrain = function (value) {
        var opts = this.values.get('options');
        if (opts.length === 0) {
            return value;
        }
        var matched = opts.filter(function (item) {
            return item.value === value;
        }).length > 0;
        return matched ? value : opts[0].value;
    };
    return ListConstraint;
}());
exports.ListConstraint = ListConstraint;
