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
exports.CircleExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var circle_1 = require("../elements/circle");
var CircleExperiment = /** @class */ (function (_super) {
    __extends(CircleExperiment, _super);
    function CircleExperiment(canvas) {
        var _this = _super.call(this, "circle", canvas) || this;
        _this.chance = new chance_1.Chance();
        return _this;
    }
    CircleExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.white);
        var centerPoint = frame.centerPoint();
        var circle = new circle_1.CircleElement(20, centerPoint);
        var points = circle.getPoints();
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            frame.appendPixel(point.x, point.y, colors_1.Pico8Pallete.darkGray);
        }
        return frame;
    };
    return CircleExperiment;
}(experiment_1.Experiment));
exports.CircleExperiment = CircleExperiment;
