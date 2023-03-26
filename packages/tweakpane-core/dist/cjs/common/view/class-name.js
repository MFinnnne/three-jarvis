"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassName = void 0;
var PREFIX = 'tp';
/**
 * A utility function for generating BEM-like class name.
 * @param viewName The name of the view. Used as part of the block name.
 * @return A class name generator function.
 */
function ClassName(viewName) {
    /**
     * Generates a class name.
     * @param [opt_elementName] The name of the element.
     * @param [opt_modifier] The name of the modifier.
     * @return A class name.
     */
    var fn = function (opt_elementName, opt_modifier) {
        return [PREFIX, '-', viewName, 'v', opt_elementName ? "_" + opt_elementName : '', opt_modifier ? "-" + opt_modifier : ''].join('');
    };
    return fn;
}
exports.ClassName = ClassName;
