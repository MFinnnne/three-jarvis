"use strict";
exports.__esModule = true;
exports.formatPercentage = void 0;
var number_1 = require("./number");
var innerFormatter = number_1.createNumberFormatter(0);
/**
 * @hidden
 */
function formatPercentage(value) {
    return innerFormatter(value) + '%';
}
exports.formatPercentage = formatPercentage;
