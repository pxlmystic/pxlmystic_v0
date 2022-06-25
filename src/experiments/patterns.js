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
exports.PatternsExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var element_1 = require("../element");
var bars_pattern_1 = require("../elements/bars-pattern");
var PatternsExperiment = /** @class */ (function (_super) {
    __extends(PatternsExperiment, _super);
    function PatternsExperiment(canvas) {
        var _this = _super.call(this, "patterns", canvas, 1) || this;
        _this.BORDER = 4;
        _this.patterns = [];
        return _this;
    }
    PatternsExperiment.prototype.addBarPattern = function (direction) {
        var size = {
            width: this.canvas.pixelGrid.x - this.BORDER,
            height: this.canvas.pixelGrid.y - this.BORDER
        };
        var origin = {
            x: this.BORDER,
            y: this.BORDER
        };
        var pattern = new bars_pattern_1.BarsPattern(size, origin, direction);
        this.patterns.push(pattern);
    };
    PatternsExperiment.prototype.addBarPatterns = function () {
        this.addBarPattern(element_1.Direction.horizontal);
        this.addBarPattern(element_1.Direction.vertical);
    };
    PatternsExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.white);
        // add our first pattern
        if (this.patterns.length == 0) {
            this.addBarPatterns();
        }
        // render the patterns
        for (var _i = 0, _a = this.patterns; _i < _a.length; _i++) {
            var pattern = _a[_i];
            pattern.tick();
            var points = pattern.getPoints();
            for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
                var point = points_1[_b];
                frame.appendPixel(point.x, point.y, colors_1.Pico8Pallete.darkGray);
            }
        }
        return frame;
    };
    return PatternsExperiment;
}(experiment_1.Experiment));
exports.PatternsExperiment = PatternsExperiment;
