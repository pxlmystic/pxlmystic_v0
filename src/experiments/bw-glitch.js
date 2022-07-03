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
exports.BWGlitchExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var color_picker_1 = require("../color-picker");
var filled_rect_1 = require("../elements/filled-rect");
var glitch_1 = require("../glitch");
var BWGlitchExperiment = /** @class */ (function (_super) {
    __extends(BWGlitchExperiment, _super);
    function BWGlitchExperiment(canvas) {
        var _this = _super.call(this, "bw-glitch", canvas, 69, "1x8") || this;
        _this.BORDER = 4;
        _this.patterns = [];
        _this.chance = new chance_1.Chance();
        _this.DEGRADE = 50;
        _this.processor = new glitch_1.DegradePointProcessor(_this.DEGRADE);
        _this.frameCount = 0;
        _this.TOTAL_FRAMES = 69;
        _this.inverted = false;
        _this.invertDuration = 0;
        _this.invertCount = 0;
        return _this;
    }
    BWGlitchExperiment.prototype.primaryColor = function () {
        return !this.inverted ? colors_1.Pico8Pallete.white : colors_1.Pico8Pallete.darkGray;
    };
    BWGlitchExperiment.prototype.secondaryColor = function () {
        return !this.inverted ? colors_1.Pico8Pallete.darkGray : colors_1.Pico8Pallete.white;
    };
    BWGlitchExperiment.prototype.addFilledRect = function (color) {
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
    BWGlitchExperiment.prototype.invert = function () {
        if (this.inverted) {
            this.invertCount += 1;
        }
        else {
            this.inverted = this.chance.bool({ likelihood: 5 });
            if (!this.inverted) {
                return;
            }
            this.invertDuration = this.chance.integer({ min: 1, max: 6 });
            this.invertCount = 1;
            return;
        }
        if (this.invertCount > this.invertDuration) {
            this.inverted = false;
            this.invertCount = 0;
            return;
        }
    };
    BWGlitchExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        this.invert();
        frame.appendBG(this.secondaryColor());
        if (this.chance.bool({ likelihood: 2 })) {
            return frame;
        }
        this.frameCount += 1;
        this.patterns = [];
        // add our first pattern
        if (this.patterns.length == 0) {
            //this.addBarPatterns();
            var fillColor = !this.inverted ? colors_1.Pico8Pallete.white : colors_1.Pico8Pallete.darkGray;
            this.addFilledRect(fillColor);
        }
        // render
        var randomPatternIndex = this.chance.integer({ min: 0, max: this.patterns.length - 1 });
        var pattern = this.patterns[randomPatternIndex];
        pattern.tick();
        var ratio = Math.floor((this.frameCount / this.TOTAL_FRAMES) * 100);
        var processPercent = .069;
        this.processor = new glitch_1.DegradePointProcessor(processPercent);
        var points = this.processor.processPoints(pattern.getPoints());
        if (this.chance.bool({ likelihood: 50 })) {
            points = new glitch_1.RowRemover(.5, .5).processPoints(points);
        }
        else {
            points = new glitch_1.ColumnRemover(.5, .5).processPoints(points);
        }
        //if (this.chance.bool({ likelihood: 5 })) { return frame; }
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            frame.appendPixel(point.x, point.y, point.color);
        }
        return frame;
    };
    return BWGlitchExperiment;
}(experiment_1.Experiment));
exports.BWGlitchExperiment = BWGlitchExperiment;
