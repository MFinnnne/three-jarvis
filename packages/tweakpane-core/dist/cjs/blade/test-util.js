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
exports.TestValueBladePlugin = exports.TestValueBladeApi = exports.createEmptyBladeController = exports.createLabelController = exports.createEmptyLabelableController = void 0;
var value_map_1 = require("../common/model/value-map");
var values_1 = require("../common/model/values");
var view_props_1 = require("../common/model/view-props");
var params_parsers_1 = require("../common/params-parsers");
var plain_1 = require("../common/view/plain");
var checkbox_1 = require("../input-binding/boolean/controller/checkbox");
var blade_1 = require("./common/api/blade");
var blade_2 = require("./common/controller/blade");
var blade_3 = require("./common/model/blade");
var label_1 = require("./label/controller/label");
var value_label_1 = require("./label/controller/value-label");
var LabelableController = /** @class */ (function () {
    function LabelableController(doc) {
        this.viewProps = view_props_1.ViewProps.create();
        this.view = new plain_1.PlainView(doc, {
            viewName: '',
            viewProps: this.viewProps,
        });
    }
    return LabelableController;
}());
function createEmptyLabelableController(doc) {
    return new LabelableController(doc);
}
exports.createEmptyLabelableController = createEmptyLabelableController;
function createLabelController(doc, vc) {
    return new label_1.LabelController(doc, {
        blade: blade_3.createBlade(),
        props: value_map_1.ValueMap.fromObject({ label: '' }),
        valueController: vc,
    });
}
exports.createLabelController = createLabelController;
function createEmptyBladeController(doc) {
    return new blade_2.BladeController({
        blade: blade_3.createBlade(),
        view: new plain_1.PlainView(doc, {
            viewName: '',
            viewProps: view_props_1.ViewProps.create(),
        }),
        viewProps: view_props_1.ViewProps.create(),
    });
}
exports.createEmptyBladeController = createEmptyBladeController;
var TestValueBladeApi = /** @class */ (function (_super) {
    __extends(TestValueBladeApi, _super);
    function TestValueBladeApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestValueBladeApi.prototype, "value", {
        get: function () {
            return this.controller_.valueController.value.rawValue;
        },
        set: function (value) {
            this.controller_.valueController.value.rawValue = value;
        },
        enumerable: false,
        configurable: true
    });
    return TestValueBladeApi;
}(blade_1.BladeApi));
exports.TestValueBladeApi = TestValueBladeApi;
exports.TestValueBladePlugin = {
    id: 'test',
    type: 'blade',
    accept: function (params) {
        var p = params_parsers_1.ParamsParsers;
        var r = params_parsers_1.parseParams(params, {
            view: p.required.constant('test'),
        });
        return r ? { params: r } : null;
    },
    controller: function (args) {
        return new value_label_1.LabeledValueController(args.document, {
            blade: blade_3.createBlade(),
            props: value_map_1.ValueMap.fromObject({
                label: '',
            }),
            valueController: new checkbox_1.CheckboxController(args.document, {
                value: values_1.createValue(false),
                viewProps: args.viewProps,
            }),
        });
    },
    api: function (args) {
        if (!(args.controller instanceof value_label_1.LabeledValueController)) {
            return null;
        }
        var vc = args.controller.valueController;
        if (!(vc instanceof checkbox_1.CheckboxController)) {
            return null;
        }
        return new TestValueBladeApi(args.controller);
    },
};
