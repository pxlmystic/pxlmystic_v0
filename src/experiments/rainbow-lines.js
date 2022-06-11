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
exports.RainbowLinesExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var RainbowLinesExperiment = /** @class */ (function (_super) {
    __extends(RainbowLinesExperiment, _super);
    function RainbowLinesExperiment(canvas) {
        var _this = _super.call(this, "rainbow-lines", canvas) || this;
        _this.colors = [
            colors_1.Pico8Pallete.white,
            colors_1.Pico8Pallete.lightGray,
            colors_1.Pico8Pallete.red,
            colors_1.Pico8Pallete.orange,
            colors_1.Pico8Pallete.yellow,
            colors_1.Pico8Pallete.green,
            colors_1.Pico8Pallete.blue,
            colors_1.Pico8Pallete.pink,
            colors_1.Pico8Pallete.blue,
            colors_1.Pico8Pallete.green,
            colors_1.Pico8Pallete.yellow,
            colors_1.Pico8Pallete.orange,
            colors_1.Pico8Pallete.red,
        ];
        _this.chance = new chance_1.Chance();
        return _this;
    }
    RainbowLinesExperiment.prototype.addRandomElement = function (frame, centerX, centerY) {
        var height = 1;
        var width = 1;
        var extend = this.chance.bool({ likelihood: 60 });
        if (extend) {
            height = this.chance.weighted([1, 3], [99, 1]);
            width = this.chance.integer({ min: 2, max: 12 });
        }
        var xHorizontal = centerX - Math.floor(width / 2);
        var yVertical = centerY - Math.floor(height / 2);
        var colorIndex = 0;
        if (extend) {
            colorIndex = this.chance.integer({ min: 1, max: this.colors.length - 1 });
        }
        var flipped = this.chance.bool({ likelihood: 40 });
        for (var i = xHorizontal; i < xHorizontal + width; i++) {
            if (colorIndex >= this.colors.length) {
                colorIndex = 0;
            }
            var color = this.colors[colorIndex];
            var x = flipped ? centerY : i;
            var y = flipped ? i : centerY;
            frame.appendRect(x, y, 1, height, color);
            colorIndex++;
        }
    };
    RainbowLinesExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.black);
        var totalElements = this.chance.integer({ min: 420, max: 555 });
        for (var i = 0; i < totalElements; i++) {
            var x = this.chance.integer({ min: 0, max: 64 });
            var y = this.chance.integer({ min: 0, max: 64 });
            this.addRandomElement(frame, x, y);
        }
        return frame;
    };
    return RainbowLinesExperiment;
}(experiment_1.Experiment));
exports.RainbowLinesExperiment = RainbowLinesExperiment;
