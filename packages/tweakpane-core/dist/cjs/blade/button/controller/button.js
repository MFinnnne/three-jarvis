"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonController = void 0;
var emitter_1 = require("../../../common/model/emitter");
var button_1 = require("../view/button");
/**
 * @hidden
 */
var ButtonController = /** @class */ (function () {
    function ButtonController(doc, config) {
        this.emitter = new emitter_1.Emitter();
        this.onClick_ = this.onClick_.bind(this);
        this.props = config.props;
        this.viewProps = config.viewProps;
        this.view = new button_1.ButtonView(doc, {
            props: this.props,
            viewProps: this.viewProps,
        });
        this.view.buttonElement.addEventListener('click', this.onClick_);
    }
    ButtonController.prototype.onClick_ = function () {
        this.emitter.emit('click', {
            sender: this,
        });
    };
    return ButtonController;
}());
exports.ButtonController = ButtonController;
