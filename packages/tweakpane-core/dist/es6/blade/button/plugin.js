"use strict";
exports.__esModule = true;
exports.ButtonBladePlugin = void 0;
var value_map_1 = require("../../common/model/value-map");
var params_parsers_1 = require("../../common/params-parsers");
var label_1 = require("../label/controller/label");
var button_1 = require("./api/button");
var button_2 = require("./controller/button");
exports.ButtonBladePlugin = {
    id: 'button',
    type: 'blade',
    accept: function (params) {
        var p = params_parsers_1.ParamsParsers;
        var result = params_parsers_1.parseParams(params, {
            title: p.required.string,
            view: p.required.constant('button'),
            label: p.optional.string
        });
        return result ? { params: result } : null;
    },
    controller: function (args) {
        return new label_1.LabelController(args.document, {
            blade: args.blade,
            props: value_map_1.ValueMap.fromObject({
                label: args.params.label
            }),
            valueController: new button_2.ButtonController(args.document, {
                props: value_map_1.ValueMap.fromObject({
                    title: args.params.title
                }),
                viewProps: args.viewProps
            })
        });
    },
    api: function (args) {
        if (!(args.controller instanceof label_1.LabelController)) {
            return null;
        }
        if (!(args.controller.valueController instanceof button_2.ButtonController)) {
            return null;
        }
        return new button_1.ButtonApi(args.controller);
    }
};
