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
exports.LinesExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var color_picker_1 = require("../color-picker");
var element_1 = require("../element");
var bars_pattern_1 = require("../elements/bars-pattern");
var shapes_1 = require("../shapes");
var glitch_1 = require("../glitch");
var LinesExperiment = /** @class */ (function (_super) {
    __extends(LinesExperiment, _super);
    function LinesExperiment(canvas) {
        var _this = _super.call(this, "lines", canvas, 40, "1x8") || this;
        _this.BORDER = 4;
        _this.patterns = [];
        _this.chance = new chance_1.Chance();
        _this.DEGRADE = 50;
        _this.processor = new glitch_1.DegradePointProcessor(_this.DEGRADE);
        _this.frameCount = 0;
        _this.TOTAL_FRAMES = 40;
        return _this;
    }
    LinesExperiment.prototype.primaryColor = function () {
        return colors_1.Pico8Pallete.white;
    };
    LinesExperiment.prototype.secondaryColor = function () {
        return colors_1.Pico8Pallete.darkGray;
    };
    LinesExperiment.prototype.addBarPattern = function (direction) {
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
    LinesExperiment.prototype.addBarPatterns = function () {
        this.addBarPattern(element_1.Direction.horizontal);
        //this.addBarPattern(Direction.vertical);
    };
    LinesExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(this.secondaryColor());
        this.frameCount += 1;
        // add our first pattern
        if (this.patterns.length == 0) {
            this.addBarPatterns();
        }
        // render
        var randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
        var pattern = this.patterns[randomPatternIndex];
        pattern.tick();
        var ratio = Math.floor((this.frameCount / this.TOTAL_FRAMES) * 100);
        // remove rows    
        var movePercent = this.chance.integer({ min: 0, max: 10 });
        this.processor = new glitch_1.RowMover(movePercent);
        var points = pattern.getPoints(); //this.processor.processPoints(pattern.getPoints());
        //points = new RowRemover(10).processPoints(points);
        // degrade 
        /*
        if (this.chance.bool({likelihood: 15})) {
          let degrade = ratio < 10 ? 0 : ratio;
          points = new DegradePointProcessor(degrade).processPoints(points);
        }*/
        //points = new ColumnRemover(5).processPoints(points);
        var s = 12;
        var hex = new shapes_1.Hexagon(s, frame.centerPoint());
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            if (hex.containsPoint(point)) {
                frame.appendPixel(point.x, point.y, point.color);
            }
        }
        return frame;
    };
    return LinesExperiment;
}(experiment_1.Experiment));
exports.LinesExperiment = LinesExperiment;
