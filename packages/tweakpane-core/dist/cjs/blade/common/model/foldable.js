"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindFoldable = exports.getFoldableStyleHeight = exports.getFoldableStyleExpanded = exports.createFoldable = exports.Foldable = void 0;
var dom_util_1 = require("../../../common/dom-util");
var reactive_1 = require("../../../common/model/reactive");
var value_map_1 = require("../../../common/model/value-map");
var type_util_1 = require("../../../misc/type-util");
/**
 * @hidden
 */
var Foldable = /** @class */ (function (_super) {
    __extends(Foldable, _super);
    function Foldable(valueMap) {
        return _super.call(this, valueMap) || this;
    }
    Foldable.create = function (expanded) {
        var coreObj = {
            completed: true,
            expanded: expanded,
            expandedHeight: null,
            shouldFixHeight: false,
            temporaryExpanded: null,
        };
        var core = value_map_1.ValueMap.createCore(coreObj);
        return new Foldable(core);
    };
    Object.defineProperty(Foldable.prototype, "styleExpanded", {
        get: function () {
            var _a;
            return (_a = this.get('temporaryExpanded')) !== null && _a !== void 0 ? _a : this.get('expanded');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foldable.prototype, "styleHeight", {
        get: function () {
            if (!this.styleExpanded) {
                return '0';
            }
            var exHeight = this.get('expandedHeight');
            if (this.get('shouldFixHeight') && !type_util_1.isEmpty(exHeight)) {
                return exHeight + "px";
            }
            return 'auto';
        },
        enumerable: false,
        configurable: true
    });
    Foldable.prototype.bindExpandedClass = function (elem, expandedClassName) {
        var _this = this;
        var onExpand = function () {
            var expanded = _this.styleExpanded;
            if (expanded) {
                elem.classList.add(expandedClassName);
            }
            else {
                elem.classList.remove(expandedClassName);
            }
        };
        reactive_1.bindValueMap(this, 'expanded', onExpand);
        reactive_1.bindValueMap(this, 'temporaryExpanded', onExpand);
    };
    Foldable.prototype.cleanUpTransition = function () {
        this.set('shouldFixHeight', false);
        this.set('expandedHeight', null);
        this.set('completed', true);
    };
    return Foldable;
}(value_map_1.ValueMap));
exports.Foldable = Foldable;
/**
 * @deprecated Use Foldable.create instead.
 */
function createFoldable(expanded) {
    // TODO: Warn deprecation at next minor version
    return Foldable.create(expanded);
}
exports.createFoldable = createFoldable;
function computeExpandedFolderHeight(folder, containerElement) {
    var height = 0;
    dom_util_1.disableTransitionTemporarily(containerElement, function () {
        // Expand folder temporarily
        folder.set('expandedHeight', null);
        folder.set('temporaryExpanded', true);
        dom_util_1.forceReflow(containerElement);
        // Compute height
        height = containerElement.clientHeight;
        // Restore expanded
        folder.set('temporaryExpanded', null);
        dom_util_1.forceReflow(containerElement);
    });
    return height;
}
/**
 * @deprecated Use foldable.styleExpanded instead.
 */
function getFoldableStyleExpanded(foldable) {
    return foldable.styleExpanded;
}
exports.getFoldableStyleExpanded = getFoldableStyleExpanded;
/**
 * @deprecated Use foldable.styleHeight instead.
 */
function getFoldableStyleHeight(foldable) {
    return foldable.styleHeight;
}
exports.getFoldableStyleHeight = getFoldableStyleHeight;
function applyHeight(foldable, elem) {
    elem.style.height = foldable.styleHeight;
}
function bindFoldable(foldable, elem) {
    foldable.value('expanded').emitter.on('beforechange', function () {
        foldable.set('completed', false);
        if (type_util_1.isEmpty(foldable.get('expandedHeight'))) {
            foldable.set('expandedHeight', computeExpandedFolderHeight(foldable, elem));
        }
        foldable.set('shouldFixHeight', true);
        dom_util_1.forceReflow(elem);
    });
    foldable.emitter.on('change', function () {
        applyHeight(foldable, elem);
    });
    applyHeight(foldable, elem);
    elem.addEventListener('transitionend', function (ev) {
        if (ev.propertyName !== 'height') {
            return;
        }
        foldable.cleanUpTransition();
    });
}
exports.bindFoldable = bindFoldable;
