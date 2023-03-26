"use strict";
exports.__esModule = true;
exports.UnaryOperationNode = exports.BinaryOperationNode = exports.NumberLiteralNode = void 0;
var NumberLiteralNode = /** @class */ (function () {
    function NumberLiteralNode(text) {
        this.text = text;
    }
    NumberLiteralNode.prototype.evaluate = function () {
        return Number(this.text);
    };
    NumberLiteralNode.prototype.toString = function () {
        return this.text;
    };
    return NumberLiteralNode;
}());
exports.NumberLiteralNode = NumberLiteralNode;
var BINARY_OPERATION_MAP = {
    '**': function (v1, v2) { return Math.pow(v1, v2); },
    '*': function (v1, v2) { return v1 * v2; },
    '/': function (v1, v2) { return v1 / v2; },
    '%': function (v1, v2) { return v1 % v2; },
    '+': function (v1, v2) { return v1 + v2; },
    '-': function (v1, v2) { return v1 - v2; },
    '<<': function (v1, v2) { return v1 << v2; },
    '>>': function (v1, v2) { return v1 >> v2; },
    '>>>': function (v1, v2) { return v1 >>> v2; },
    '&': function (v1, v2) { return v1 & v2; },
    '^': function (v1, v2) { return v1 ^ v2; },
    '|': function (v1, v2) { return v1 | v2; }
};
var BinaryOperationNode = /** @class */ (function () {
    function BinaryOperationNode(operator, left, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    BinaryOperationNode.prototype.evaluate = function () {
        var op = BINARY_OPERATION_MAP[this.operator];
        if (!op) {
            throw new Error("unexpected binary operator: '" + this.operator);
        }
        return op(this.left.evaluate(), this.right.evaluate());
    };
    BinaryOperationNode.prototype.toString = function () {
        return ['b(', this.left.toString(), this.operator, this.right.toString(), ')'].join(' ');
    };
    return BinaryOperationNode;
}());
exports.BinaryOperationNode = BinaryOperationNode;
var UNARY_OPERATION_MAP = {
    '+': function (v) { return v; },
    '-': function (v) { return -v; },
    '~': function (v) { return ~v; }
};
var UnaryOperationNode = /** @class */ (function () {
    function UnaryOperationNode(operator, expr) {
        this.operator = operator;
        this.expression = expr;
    }
    UnaryOperationNode.prototype.evaluate = function () {
        var op = UNARY_OPERATION_MAP[this.operator];
        if (!op) {
            throw new Error("unexpected unary operator: '" + this.operator);
        }
        return op(this.expression.evaluate());
    };
    UnaryOperationNode.prototype.toString = function () {
        return ['u(', this.operator, this.expression.toString(), ')'].join(' ');
    };
    return UnaryOperationNode;
}());
exports.UnaryOperationNode = UnaryOperationNode;
