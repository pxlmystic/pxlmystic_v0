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
exports.RainbowScreenExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var RainbowScreenExperiment = /** @class */ (function (_super) {
    __extends(RainbowScreenExperiment, _super);
    function RainbowScreenExperiment(canvas) {
        var _this = _super.call(this, "rainbow-screen", canvas) || this;
        _this.colors = [
            colors_1.Pico8Pallete.black,
            colors_1.Pico8Pallete.red,
            colors_1.Pico8Pallete.orange,
            colors_1.Pico8Pallete.yellow,
            colors_1.Pico8Pallete.green,
            colors_1.Pico8Pallete.blue,
            colors_1.Pico8Pallete.pink,
            colors_1.Pico8Pallete.lightGray,
            colors_1.Pico8Pallete.pink,
            colors_1.Pico8Pallete.blue,
            colors_1.Pico8Pallete.green,
            colors_1.Pico8Pallete.yellow,
            colors_1.Pico8Pallete.orange,
            colors_1.Pico8Pallete.red,
            colors_1.Pico8Pallete.darkGray,
            colors_1.Pico8Pallete.black
        ];
        _this.chance = new chance_1.Chance();
        return _this;
    }
    RainbowScreenExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        var fullyFlipped = this.chance.bool({ likelihood: 5 });
        for (var x = 0; x < this.canvas.pixelGrid.x; x++) {
            var colorIndex = this.chance.integer({ min: 0, max: this.colors.length - 1 });
            var flipped = fullyFlipped || this.chance.bool({ likelihood: 1 });
            for (var y = 0; y < this.canvas.pixelGrid.y; y++) {
                if (colorIndex >= this.colors.length) {
                    colorIndex = 0;
                }
                var color = this.colors[colorIndex];
                if (!fullyFlipped) {
                    frame.appendRect(y, x, 1, 1, color);
                }
                if (flipped) {
                    frame.appendRect(x, y, 1, 1, color);
                }
                colorIndex++;
            }
        }
        return frame;
    };
    return RainbowScreenExperiment;
}(experiment_1.Experiment));
exports.RainbowScreenExperiment = RainbowScreenExperiment;
