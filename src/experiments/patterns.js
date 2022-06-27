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
exports.PatternsExperiment = exports.Rect = void 0;
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
var filled_rect_1 = require("../elements/filled-rect");
var Rect = /** @class */ (function () {
    function Rect(size, origin) {
        this.size = size;
        this.origin = origin;
    }
    Rect.prototype.containsPoint = function (point) {
        return point.x >= this.origin.x && point.x <= this.origin.x + this.size.width &&
            point.y >= this.origin.y && point.y <= this.origin.y + this.size.height;
    };
    return Rect;
}());
exports.Rect = Rect;
var PatternsExperiment = /** @class */ (function (_super) {
    __extends(PatternsExperiment, _super);
    function PatternsExperiment(canvas) {
        var _this = _super.call(this, "patterns", canvas, 24, "1x4") || this;
        _this.BORDER = 4;
        _this.MARGIN = 2;
        _this.patterns = [];
        _this.windows = [];
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
    PatternsExperiment.prototype.addFilledRect = function (color) {
        var size = {
            width: this.canvas.pixelGrid.x - this.BORDER,
            height: this.canvas.pixelGrid.y - this.BORDER
        };
        var origin = {
            x: this.BORDER,
            y: this.BORDER
        };
        var colorPicker = new color_picker_1.SingleColorPicker(color);
        var pattern = new filled_rect_1.FilledRect(size, origin, colorPicker);
        this.patterns.push(pattern);
    };
    PatternsExperiment.prototype.addFilledRects = function () {
        this.addFilledRect(colors_1.Pico8Pallete.darkGray);
        this.addFilledRect(colors_1.Pico8Pallete.white);
    };
    PatternsExperiment.prototype.generateWindows = function (rows, columns, margin) {
        var windows = [];
        var windowSize = {
            width: Math.floor((this.canvas.pixelGrid.x - this.BORDER * 2 - (margin * (columns - 1))) / columns),
            height: Math.floor((this.canvas.pixelGrid.y - this.BORDER * 2 - (margin * (rows - 1))) / rows)
        };
        for (var row = 0; row < rows; row++) {
            for (var column = 0; column < columns; column++) {
                var origin = {
                    x: this.BORDER + (row * (windowSize.width + margin)),
                    y: this.BORDER + (column * (windowSize.height + margin))
                };
                var rect = new Rect(windowSize, origin);
                windows.push(rect);
            }
        }
        return windows;
    };
    PatternsExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.white);
        // add our first pattern
        if (this.patterns.length == 0) {
            this.addBarPatterns();
            this.addCheckersPattern();
            this.addStripedSquare();
            //this.addFilledRects();
        }
        if (true || this.windows.length == 0) {
            var rows = this.chance.integer({ min: 1, max: 6 });
            var columns = rows;
            this.windows = this.generateWindows(rows, columns, 2);
        }
        // render the windows
        for (var i = 0; i < this.windows.length; i++) {
            var randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
            var pattern = this.patterns[randomPatternIndex];
            var rect = this.windows[i];
            pattern.tick();
            var points = pattern.getPoints();
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                if (rect.containsPoint(point)) {
                    frame.appendPixel(point.x, point.y, point.color);
                }
            }
        }
        return frame;
    };
    return PatternsExperiment;
}(experiment_1.Experiment));
exports.PatternsExperiment = PatternsExperiment;
