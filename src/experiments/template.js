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
exports.__esModule = true;
exports.MultilineExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var MultilineExperiment = /** @class */ (function (_super) {
    __extends(MultilineExperiment, _super);
    function MultilineExperiment(canvas) {
        return _super.call(this, "multiline", canvas, 10, "1x8") || this;
    }
    MultilineExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        return frame;
    };
    return MultilineExperiment;
}(experiment_1.Experiment));
exports.MultilineExperiment = MultilineExperiment;
