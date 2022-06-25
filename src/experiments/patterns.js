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
var chance_1 = require("chance");
var color_picker_1 = require("../color-picker");
var element_1 = require("../element");
var bars_pattern_1 = require("../elements/bars-pattern");
var checkers_pattern_1 = require("../elements/checkers-pattern");
var circle_1 = require("../elements/circle");
var striped_square_1 = require("../elements/striped-square");
var PatternsExperiment = /** @class */ (function (_super) {
    __extends(PatternsExperiment, _super);
    function PatternsExperiment(canvas) {
        var _this = _super.call(this, "patterns", canvas, 10) || this;
        _this.BORDER = 1;
        _this.patterns = [];
        _this.chance = new chance_1.Chance();
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
        var colorPicker = new color_picker_1.SingleColorPicker(colors_1.Pico8Pallete.darkGray);
        var toggle = this.chance.bool({ likelihood: 100 });
        var pattern = new bars_pattern_1.BarsPattern(size, origin, colorPicker, direction, toggle);
        this.patterns.push(pattern);
    };
    PatternsExperiment.prototype.addBarPatterns = function () {
        var toggle = this.chance.bool({ likelihood: 0 });
        if (toggle) {
            this.addBarPattern(element_1.Direction.horizontal);
        }
        else {
            this.addBarPattern(element_1.Direction.vertical);
        }
    };
    PatternsExperiment.prototype.addCheckersPattern = function () {
        var size = {
            width: this.canvas.pixelGrid.x - this.BORDER,
            height: this.canvas.pixelGrid.y - this.BORDER
        };
        var origin = {
            x: this.BORDER,
            y: this.BORDER
        };
        var colorPicker = new color_picker_1.SingleColorPicker(colors_1.Pico8Pallete.darkGray);
        var toggle = this.chance.bool({ likelihood: 50 });
        var pattern = new checkers_pattern_1.CheckersPattern(size, origin, colorPicker, toggle);
        this.patterns.push(pattern);
    };
    PatternsExperiment.prototype.addCircle = function (frame) {
        var centerPoint = frame.centerPoint();
        var colorPicker = new color_picker_1.SingleColorPicker(colors_1.Pico8Pallete.white);
        var circle = new circle_1.CircleElement(40, centerPoint, colorPicker);
        this.patterns.push(circle);
    };
    PatternsExperiment.prototype.addStripedSquare = function () {
        var size = {
            width: this.canvas.pixelGrid.x - this.BORDER,
            height: this.canvas.pixelGrid.y - this.BORDER
        };
        var origin = {
            x: this.BORDER,
            y: this.BORDER
        };
        var colorPicker = new color_picker_1.SingleColorPicker(colors_1.Pico8Pallete.darkGray);
        var pattern = new striped_square_1.StripedSquare(size, origin, colorPicker);
        this.patterns.push(pattern);
    };
    PatternsExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.white);
        this.patterns = [];
        // add our first pattern
        if (this.patterns.length == 0) {
            //this.addBarPatterns();
            //this.addCheckersPattern();
            //this.addCircle(frame);
            this.addStripedSquare();
        }
        // render the patterns
        for (var _i = 0, _a = this.patterns; _i < _a.length; _i++) {
            var pattern = _a[_i];
            pattern.tick();
            var points = pattern.getPoints();
            for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
                var point = points_1[_b];
                frame.appendPixel(point.x, point.y, point.color);
            }
        }
        return frame;
    };
    return PatternsExperiment;
}(experiment_1.Experiment));
exports.PatternsExperiment = PatternsExperiment;
