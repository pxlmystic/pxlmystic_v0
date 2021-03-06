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
exports.Patterns2Experiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var color_picker_1 = require("../color-picker");
var element_1 = require("../element");
var bars_pattern_1 = require("../elements/bars-pattern");
var shapes_1 = require("../shapes");
var Patterns2Experiment = /** @class */ (function (_super) {
    __extends(Patterns2Experiment, _super);
    function Patterns2Experiment(canvas) {
        var _this = _super.call(this, "patterns2", canvas, 20, "1x2") || this;
        _this.BORDER = 4;
        _this.patterns = [];
        _this.equilateralTriangles = [];
        _this.chance = new chance_1.Chance();
        return _this;
    }
    Patterns2Experiment.prototype.primaryColor = function () {
        return colors_1.Pico8Pallete.darkGray;
    };
    Patterns2Experiment.prototype.secondaryColor = function () {
        return colors_1.Pico8Pallete.white;
    };
    Patterns2Experiment.prototype.addBarPattern = function (direction) {
        var size = {
            width: this.canvas.pixelGrid.x - this.BORDER,
            height: this.canvas.pixelGrid.y - this.BORDER
        };
        var origin = {
            x: this.BORDER,
            y: this.BORDER
        };
        var colorPicker = new color_picker_1.SingleColorPicker(this.primaryColor());
        var toggle = this.chance.bool({ likelihood: 100 });
        var pattern = new bars_pattern_1.BarsPattern(size, origin, colorPicker, direction, toggle);
        this.patterns.push(pattern);
    };
    Patterns2Experiment.prototype.addBarPatterns = function () {
        this.addBarPattern(element_1.Direction.horizontal);
        this.addBarPattern(element_1.Direction.vertical);
    };
    Patterns2Experiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(this.secondaryColor());
        // add our first pattern
        if (this.patterns.length == 0) {
            this.addBarPatterns();
        }
        // equilateral triangles
        if (this.equilateralTriangles.length == 0) {
            var triangleTop = new shapes_1.EquilateralTriangle({ x: this.BORDER,
                y: this.BORDER
            }, Math.floor(-1 * ((this.canvas.pixelGrid.y - (this.BORDER * 2)) - 0) / 2), ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0));
            var triangleRight = new shapes_1.RightEquilateralTriangle({ x: this.BORDER,
                y: this.BORDER
            }, Math.floor(-1 * ((this.canvas.pixelGrid.y - (this.BORDER * 2)) - 0) / 2), ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0));
            var triangleBottom = new shapes_1.EquilateralTriangle({ x: this.BORDER,
                y: this.canvas.pixelGrid.y - this.BORDER
            }, Math.floor((this.canvas.pixelGrid.y - (this.BORDER * 2)) / 2), ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0));
            var triangleLeft = new shapes_1.LeftEquilateralTriangle({ x: this.BORDER,
                y: this.canvas.pixelGrid.y - this.BORDER
            }, Math.floor((this.canvas.pixelGrid.y - (this.BORDER * 2)) / 2), ((this.canvas.pixelGrid.x - (this.BORDER * 2)) - 0));
            this.equilateralTriangles.push(triangleTop);
            this.equilateralTriangles.push(triangleBottom);
            this.equilateralTriangles.push(triangleLeft);
            this.equilateralTriangles.push(triangleRight);
        }
        // render
        for (var i = 0; i < this.equilateralTriangles.length; i++) {
            var randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
            var pattern = this.patterns[randomPatternIndex];
            var shape = this.equilateralTriangles[i];
            pattern.tick();
            var points = pattern.getPoints();
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                if (shape.containsPoint(point)) {
                    frame.appendPixel(point.x, point.y, point.color);
                }
            }
        }
        return frame;
    };
    return Patterns2Experiment;
}(experiment_1.Experiment));
exports.Patterns2Experiment = Patterns2Experiment;
