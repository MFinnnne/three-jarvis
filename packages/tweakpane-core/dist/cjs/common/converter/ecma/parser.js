"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEcmaNumberExpression = void 0;
var nodes_1 = require("./nodes");
var reader_1 = require("./reader");
function parseLiteral(text, cursor) {
    var num = reader_1.readNumericLiteral(text, cursor);
    cursor += num.length;
    if (num === '') {
        return null;
    }
    return {
        evaluable: new nodes_1.NumberLiteralNode(num),
        cursor: cursor,
    };
}
function parseParenthesizedExpression(text, cursor) {
    var op = text.substr(cursor, 1);
    cursor += op.length;
    if (op !== '(') {
        return null;
    }
    var expr = parseExpression(text, cursor);
    if (!expr) {
        return null;
    }
    cursor = expr.cursor;
    cursor += reader_1.readWhitespace(text, cursor).length;
    var cl = text.substr(cursor, 1);
    cursor += cl.length;
    if (cl !== ')') {
        return null;
    }
    return {
        evaluable: expr.evaluable,
        cursor: cursor,
    };
}
function parsePrimaryExpression(text, cursor) {
    var _a;
    return (_a = parseLiteral(text, cursor)) !== null && _a !== void 0 ? _a : parseParenthesizedExpression(text, cursor);
}
function parseUnaryExpression(text, cursor) {
    var expr = parsePrimaryExpression(text, cursor);
    if (expr) {
        return expr;
    }
    var op = text.substr(cursor, 1);
    cursor += op.length;
    if (op !== '+' && op !== '-' && op !== '~') {
        return null;
    }
    var num = parseUnaryExpression(text, cursor);
    if (!num) {
        return null;
    }
    cursor = num.cursor;
    return {
        cursor: cursor,
        evaluable: new nodes_1.UnaryOperationNode(op, num.evaluable),
    };
}
function readBinaryOperator(ops, text, cursor) {
    cursor += reader_1.readWhitespace(text, cursor).length;
    var op = ops.filter(function (op) { return text.startsWith(op, cursor); })[0];
    if (!op) {
        return null;
    }
    cursor += op.length;
    cursor += reader_1.readWhitespace(text, cursor).length;
    return {
        cursor: cursor,
        operator: op,
    };
}
function createBinaryOperationExpressionParser(exprParser, ops) {
    return function (text, cursor) {
        var firstExpr = exprParser(text, cursor);
        if (!firstExpr) {
            return null;
        }
        cursor = firstExpr.cursor;
        var expr = firstExpr.evaluable;
        for (;;) {
            var op = readBinaryOperator(ops, text, cursor);
            if (!op) {
                break;
            }
            cursor = op.cursor;
            var nextExpr = exprParser(text, cursor);
            if (!nextExpr) {
                return null;
            }
            cursor = nextExpr.cursor;
            expr = new nodes_1.BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
        }
        return expr
            ? {
                cursor: cursor,
                evaluable: expr,
            }
            : null;
    };
}
var parseBinaryOperationExpression = [['**'], ['*', '/', '%'], ['+', '-'], ['<<', '>>>', '>>'], ['&'], ['^'], ['|']].reduce(function (parser, ops) {
    return createBinaryOperationExpressionParser(parser, ops);
}, parseUnaryExpression);
function parseExpression(text, cursor) {
    cursor += reader_1.readWhitespace(text, cursor).length;
    return parseBinaryOperationExpression(text, cursor);
}
/**
 * Parse ECMAScript expression with numeric literals.
 * https://262.ecma-international.org/
 * @param text The string to be parsed.
 * @return A parsing result, or null if failed.
 */
function parseEcmaNumberExpression(text) {
    var expr = parseExpression(text, 0);
    if (!expr) {
        return null;
    }
    var cursor = expr.cursor + reader_1.readWhitespace(text, expr.cursor).length;
    if (cursor !== text.length) {
        return null;
    }
    return expr.evaluable;
}
exports.parseEcmaNumberExpression = parseEcmaNumberExpression;
