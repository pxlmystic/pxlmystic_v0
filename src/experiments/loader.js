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
exports.LoaderExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var color_picker_1 = require("../color-picker");
var element_1 = require("../element");
var LoaderExperiment = /** @class */ (function (_super) {
    __extends(LoaderExperiment, _super);
    function LoaderExperiment(canvas) {
        var _this = _super.call(this, "loader", canvas, 150) || this;
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
        _this.screenColors = [
            colors_1.Pico8Pallete.black,
            colors_1.Pico8Pallete.darkGray,
            colors_1.Pico8Pallete.lightGray,
        ];
        _this.screenWeights = [
            50,
            1,
            .05
        ];
        _this.chance = new chance_1.Chance();
        _this.elements = [];
        _this.screenColorPicker = new color_picker_1.ColorPicker(_this.screenColors, _this.screenWeights);
        return _this;
    }
    LoaderExperiment.prototype.addBlinkers = function (frame) {
        var blinkerSpeeds = [
            [2, 3],
            [3, 5],
            [1, 4],
            [3, 3]
        ];
        var blinkerSizes = [
            { height: 2, width: 1 },
        ];
        for (var i = 0; i < 25; i++) {
            var blinkerSize = blinkerSizes[this.chance.integer({ min: 0, max: blinkerSizes.length - 1 })];
            var blinkerOrigin = frame.randomPoint();
            var blinkerSpeed = blinkerSpeeds[this.chance.integer({ min: 0, max: blinkerSpeeds.length - 1 })];
            var blinker = new element_1.BlinkerElement(blinkerSize, blinkerOrigin, colors_1.Pico8Pallete.green, blinkerSpeed[0], blinkerSpeed[1]);
            blinker.ticksOn = this.chance.integer({ min: 0, max: 2 });
            this.elements.push(blinker);
        }
    };
    LoaderExperiment.prototype.addElements = function (frame) {
        var firstRun = this.elements.length == 0;
        if (this.elements.length == 0) {
            this.addBlinkers(frame);
        }
        var maxLoaders = 3;
        var totalLoaders = firstRun ? maxLoaders * 2 : this.chance.integer({ min: 1, max: maxLoaders });
        for (var i = 0; i < totalLoaders; i++) {
            var dots = this.chance.integer({ min: 1, max: 24 });
            var off = this.chance.integer({ min: 0, max: 3 });
            var on = this.chance.integer({ min: 1, max: 4 });
            var persist = this.chance.bool({ likelihood: 50 });
            var colorPicker = new color_picker_1.ColorPicker(Object.values(this.colors), [], 2);
            var height = this.chance.weighted([1, 2, 6, 24], [20, 20, 1, 1]);
            var spacing = this.chance.integer({ min: 0, max: 2 });
            if (height > 1) {
                persist = true;
            } // no 1px bars
            var direction = this.chance.weighted([element_1.Direction.horizontal, element_1.Direction.vertical], [80, 20]);
            var skipToEnd = this.chance.bool({ likelihood: 20 });
            var maxIterations = this.chance.weighted([1, 2, 3], [90, 5, 5]);
            var loader = new element_1.LoaderElement(frame.randomPoint(), colorPicker, on, off, dots, persist, spacing, height, direction, maxIterations);
            if (skipToEnd) {
                loader.skipToEndBeforeTick();
                loader.onFrames = this.chance.integer({ min: 1, max: 12 });
            }
            this.elements.push(loader);
        }
    };
    LoaderExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        this.addElements(frame);
        for (var x = 0; x < this.canvas.pixelGrid.x; x++) {
            for (var y = 0; y < this.canvas.pixelGrid.y; y++) {
                var color = this.screenColorPicker.randomColor();
                frame.appendPixel(x, y, color);
            }
        }
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            element.tick();
            var points = element.getPoints();
            for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
                var point = points_1[_b];
                frame.appendPixel(point.x, point.y, point.color);
            }
        }
        return frame;
    };
    return LoaderExperiment;
}(experiment_1.Experiment));
exports.LoaderExperiment = LoaderExperiment;
