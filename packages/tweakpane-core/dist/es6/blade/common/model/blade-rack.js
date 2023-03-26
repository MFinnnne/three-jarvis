"use strict";
exports.__esModule = true;
exports.BladeRack = void 0;
var compat_1 = require("../../../common/compat");
var emitter_1 = require("../../../common/model/emitter");
var tp_error_1 = require("../../../common/tp-error");
var type_util_1 = require("../../../misc/type-util");
var input_binding_1 = require("../../input-binding/controller/input-binding");
var monitor_binding_1 = require("../../monitor-binding/controller/monitor-binding");
var rack_1 = require("../../rack/controller/rack");
var rack_like_1 = require("../controller/rack-like");
var value_blade_1 = require("../controller/value-blade");
var nested_ordered_set_1 = require("./nested-ordered-set");
function findInputBindingController(bcs, b) {
    for (var i = 0; i < bcs.length; i++) {
        var bc = bcs[i];
        if (bc instanceof input_binding_1.InputBindingController && bc.binding === b) {
            return bc;
        }
    }
    return null;
}
function findMonitorBindingController(bcs, b) {
    for (var i = 0; i < bcs.length; i++) {
        var bc = bcs[i];
        if (bc instanceof monitor_binding_1.MonitorBindingController && bc.binding === b) {
            return bc;
        }
    }
    return null;
}
function findValueBladeController(bcs, v) {
    for (var i = 0; i < bcs.length; i++) {
        var bc = bcs[i];
        if (bc instanceof value_blade_1.ValueBladeController && bc.value === v) {
            return bc;
        }
    }
    return null;
}
function findSubRack(bc) {
    if (bc instanceof rack_1.RackController) {
        return bc.rack;
    }
    if (bc instanceof rack_like_1.RackLikeController) {
        return bc.rackController.rack;
    }
    return null;
}
function findSubBladeControllerSet(bc) {
    var rack = findSubRack(bc);
    return rack ? rack['bcSet_'] : null;
}
/**
 * A collection of blade controllers that manages positions and event propagation.
 */
var BladeRack = /** @class */ (function () {
    function BladeRack(config) {
        var _a, _b;
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
        this.onSetAdd_ = this.onSetAdd_.bind(this);
        this.onSetRemove_ = this.onSetRemove_.bind(this);
        this.onChildDispose_ = this.onChildDispose_.bind(this);
        this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
        this.onChildInputChange_ = this.onChildInputChange_.bind(this);
        this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
        this.onChildValueChange_ = this.onChildValueChange_.bind(this);
        this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
        this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
        this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
        this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this);
        this.emitter = new emitter_1.Emitter();
        this.blade_ = (_a = config.blade) !== null && _a !== void 0 ? _a : null;
        (_b = this.blade_) === null || _b === void 0 ? void 0 : _b.value('positions').emitter.on('change', this.onBladePositionsChange_);
        this.viewProps = config.viewProps;
        this.bcSet_ = new nested_ordered_set_1.NestedOrderedSet(findSubBladeControllerSet);
        this.bcSet_.emitter.on('add', this.onSetAdd_);
        this.bcSet_.emitter.on('remove', this.onSetRemove_);
    }
    Object.defineProperty(BladeRack.prototype, "children", {
        get: function () {
            return this.bcSet_.items;
        },
        enumerable: false,
        configurable: true
    });
    BladeRack.prototype.add = function (bc, opt_index) {
        var _a;
        (_a = bc.parent) === null || _a === void 0 ? void 0 : _a.remove(bc);
        if (type_util_1.isPropertyWritable(bc, 'parent')) {
            bc.parent = this;
        }
        else {
            // TODO: Remove it in the next major version
            bc['parent_'] = this;
            compat_1.warnMissing({
                key: 'parent',
                target: 'BladeController',
                place: 'BladeRack.add'
            });
        }
        this.bcSet_.add(bc, opt_index);
    };
    BladeRack.prototype.remove = function (bc) {
        if (type_util_1.isPropertyWritable(bc, 'parent')) {
            bc.parent = null;
        }
        else {
            // TODO: Remove it in the next major version
            bc['parent_'] = null;
            compat_1.warnMissing({
                key: 'parent',
                target: 'BladeController',
                place: 'BladeRack.remove'
            });
        }
        this.bcSet_.remove(bc);
    };
    BladeRack.prototype.find = function (controllerClass) {
        return type_util_1.forceCast(this.bcSet_.allItems().filter(function (bc) {
            return bc instanceof controllerClass;
        }));
    };
    BladeRack.prototype.onSetAdd_ = function (ev) {
        this.updatePositions_();
        var isRoot = ev.target === ev.root;
        this.emitter.emit('add', {
            bladeController: ev.item,
            index: ev.index,
            isRoot: isRoot,
            sender: this
        });
        if (!isRoot) {
            return;
        }
        var bc = ev.item;
        bc.viewProps.emitter.on('change', this.onChildViewPropsChange_);
        bc.blade.value('positions').emitter.on('change', this.onChildPositionsChange_);
        bc.viewProps.handleDispose(this.onChildDispose_);
        if (bc instanceof input_binding_1.InputBindingController) {
            bc.binding.emitter.on('change', this.onChildInputChange_);
        }
        else if (bc instanceof monitor_binding_1.MonitorBindingController) {
            bc.binding.emitter.on('update', this.onChildMonitorUpdate_);
        }
        else if (bc instanceof value_blade_1.ValueBladeController) {
            bc.value.emitter.on('change', this.onChildValueChange_);
        }
        else {
            var rack = findSubRack(bc);
            if (rack) {
                var emitter = rack.emitter;
                emitter.on('layout', this.onDescendantLayout_);
                emitter.on('inputchange', this.onDescendantInputChange_);
                emitter.on('monitorupdate', this.onDescendantMonitorUpdate_);
            }
        }
    };
    BladeRack.prototype.onSetRemove_ = function (ev) {
        this.updatePositions_();
        var isRoot = ev.target === ev.root;
        this.emitter.emit('remove', {
            bladeController: ev.item,
            isRoot: isRoot,
            sender: this
        });
        if (!isRoot) {
            return;
        }
        var bc = ev.item;
        if (bc instanceof input_binding_1.InputBindingController) {
            bc.binding.emitter.off('change', this.onChildInputChange_);
        }
        else if (bc instanceof monitor_binding_1.MonitorBindingController) {
            bc.binding.emitter.off('update', this.onChildMonitorUpdate_);
        }
        else if (bc instanceof value_blade_1.ValueBladeController) {
            bc.value.emitter.off('change', this.onChildValueChange_);
        }
        else {
            var rack = findSubRack(bc);
            if (rack) {
                var emitter = rack.emitter;
                emitter.off('layout', this.onDescendantLayout_);
                emitter.off('inputchange', this.onDescendantInputChange_);
                emitter.off('monitorupdate', this.onDescendantMonitorUpdate_);
            }
        }
    };
    BladeRack.prototype.updatePositions_ = function () {
        var _this = this;
        var visibleItems = this.bcSet_.items.filter(function (bc) { return !bc.viewProps.get('hidden'); });
        var firstVisibleItem = visibleItems[0];
        var lastVisibleItem = visibleItems[visibleItems.length - 1];
        this.bcSet_.items.forEach(function (bc) {
            var ps = [];
            if (bc === firstVisibleItem) {
                ps.push('first');
                if (!_this.blade_ || _this.blade_.get('positions').includes('veryfirst')) {
                    ps.push('veryfirst');
                }
            }
            if (bc === lastVisibleItem) {
                ps.push('last');
                if (!_this.blade_ || _this.blade_.get('positions').includes('verylast')) {
                    ps.push('verylast');
                }
            }
            bc.blade.set('positions', ps);
        });
    };
    BladeRack.prototype.onChildPositionsChange_ = function () {
        this.updatePositions_();
        this.emitter.emit('layout', {
            sender: this
        });
    };
    BladeRack.prototype.onChildViewPropsChange_ = function (_ev) {
        this.updatePositions_();
        this.emitter.emit('layout', {
            sender: this
        });
    };
    BladeRack.prototype.onChildDispose_ = function () {
        var _this = this;
        var disposedUcs = this.bcSet_.items.filter(function (bc) {
            return bc.viewProps.get('disposed');
        });
        disposedUcs.forEach(function (bc) {
            _this.bcSet_.remove(bc);
        });
    };
    BladeRack.prototype.onChildInputChange_ = function (ev) {
        var bc = findInputBindingController(this.find(input_binding_1.InputBindingController), ev.sender);
        if (!bc) {
            throw tp_error_1.TpError.alreadyDisposed();
        }
        this.emitter.emit('inputchange', {
            bladeController: bc,
            options: ev.options,
            sender: this
        });
    };
    BladeRack.prototype.onChildMonitorUpdate_ = function (ev) {
        var bc = findMonitorBindingController(this.find(monitor_binding_1.MonitorBindingController), ev.sender);
        if (!bc) {
            throw tp_error_1.TpError.alreadyDisposed();
        }
        this.emitter.emit('monitorupdate', {
            bladeController: bc,
            sender: this
        });
    };
    BladeRack.prototype.onChildValueChange_ = function (ev) {
        var bc = findValueBladeController(this.find(value_blade_1.ValueBladeController), ev.sender);
        if (!bc) {
            throw tp_error_1.TpError.alreadyDisposed();
        }
        this.emitter.emit('inputchange', {
            bladeController: bc,
            options: ev.options,
            sender: this
        });
    };
    BladeRack.prototype.onDescendantLayout_ = function (_) {
        this.updatePositions_();
        this.emitter.emit('layout', {
            sender: this
        });
    };
    BladeRack.prototype.onDescendantInputChange_ = function (ev) {
        this.emitter.emit('inputchange', {
            bladeController: ev.bladeController,
            options: ev.options,
            sender: this
        });
    };
    BladeRack.prototype.onDescendantMonitorUpdate_ = function (ev) {
        this.emitter.emit('monitorupdate', {
            bladeController: ev.bladeController,
            sender: this
        });
    };
    BladeRack.prototype.onBladePositionsChange_ = function () {
        this.updatePositions_();
    };
    return BladeRack;
}());
exports.BladeRack = BladeRack;
