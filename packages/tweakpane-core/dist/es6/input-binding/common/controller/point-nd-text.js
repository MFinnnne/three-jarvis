"use strict";
exports.__esModule = true;
exports.PointNdTextController = void 0;
var value_sync_1 = require("../../../common/model/value-sync");
var values_1 = require("../../../common/model/values");
var number_text_1 = require("../../../common/number/controller/number-text");
var point_nd_text_1 = require("../view/point-nd-text");
function createAxisController(doc, config, index) {
    return new number_text_1.NumberTextController(doc, {
        arrayPosition: index === 0 ? 'fst' : index === config.axes.length - 1 ? 'lst' : 'mid',
        baseStep: config.axes[index].baseStep,
        parser: config.parser,
        props: config.axes[index].textProps,
        value: values_1.createValue(0, {
            constraint: config.axes[index].constraint
        }),
        viewProps: config.viewProps
    });
}
/**
 * @hidden
 */
var PointNdTextController = /** @class */ (function () {
    function PointNdTextController(doc, config) {
        var _this = this;
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.acs_ = config.axes.map(function (_, index) { return createAxisController(doc, config, index); });
        this.acs_.forEach(function (c, index) {
            value_sync_1.connectValues({
                primary: _this.value,
                secondary: c.value,
                forward: function (p) {
                    return config.assembly.toComponents(p.rawValue)[index];
                },
                backward: function (p, s) {
                    var comps = config.assembly.toComponents(p.rawValue);
                    comps[index] = s.rawValue;
                    return config.assembly.fromComponents(comps);
                }
            });
        });
        this.view = new point_nd_text_1.PointNdTextView(doc, {
            textViews: this.acs_.map(function (ac) { return ac.view; })
        });
    }
    return PointNdTextController;
}());
exports.PointNdTextController = PointNdTextController;
