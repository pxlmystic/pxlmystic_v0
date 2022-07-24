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
exports.MultilineExperiment = void 0;
var experiment_1 = require("../experiment");
var svg_1 = require("../svg");
var colors_1 = require("../colors");
var chance_1 = require("chance");
var multiline_1 = require("../elements/multiline");
var element_1 = require("../element");
var color_picker_1 = require("../color-picker");
var striped_square_1 = require("../elements/striped-square");
var MultilineExperiment = /** @class */ (function (_super) {
    __extends(MultilineExperiment, _super);
    function MultilineExperiment(canvas) {
        var _this = _super.call(this, "multiline", canvas, 69, "1x8") || this;
        _this.chance = new chance_1.Chance();
        _this.lineColors = [
            //Pico8Pallete.black,
            colors_1.Pico8Pallete.red,
            colors_1.Pico8Pallete.orange,
            colors_1.Pico8Pallete.yellow,
            colors_1.Pico8Pallete.green,
            colors_1.Pico8Pallete.blue,
            colors_1.Pico8Pallete.indigo,
            colors_1.Pico8Pallete.white
        ];
        // state
        _this.numLines = 1;
        _this.spacing = 2;
        _this.excludeSq = false;
        _this.persistFrames = 0;
        _this.persistedFrames = 0;
        _this.baseOnly = false;
        _this.colorPicker = new color_picker_1.ColorPicker(_this.lineColors);
        return _this;
    }
    MultilineExperiment.prototype.shuffleArray = function (items) {
        for (var i = items.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
    };
    MultilineExperiment.prototype.addBaseLayerMultiline = function (frame) {
        var colorPicker = new color_picker_1.ColorPicker([colors_1.Pico8Pallete.red, colors_1.Pico8Pallete.orange, colors_1.Pico8Pallete.yellow, colors_1.Pico8Pallete.green, colors_1.Pico8Pallete.blue, colors_1.Pico8Pallete.indigo]);
        var bg = new multiline_1.Multiline({ width: this.canvas.pixelGrid.x,
            height: this.canvas.pixelGrid.y
        }, { x: 0, y: 0 }, colorPicker, 3, element_1.Direction.vertical);
        for (var _i = 0, _a = bg.getPoints(); _i < _a.length; _i++) {
            var point = _a[_i];
            frame.appendPixel(point.x, point.y, point.color);
        }
    };
    MultilineExperiment.prototype.addBaseLayerPixels = function (frame) {
        for (var x = 0; x < this.canvas.pixelGrid.x; x++) {
            for (var y = 0; y < this.canvas.pixelGrid.y; y++) {
                var on = this.chance.bool({ likelihood: 5 });
                if (on) {
                    var colorPicker = new color_picker_1.ColorPicker(this.lineColors);
                    var color = colorPicker.nextColor();
                    color = colors_1.Pico8Pallete.white;
                    frame.appendPixel(x, y, color);
                }
            }
        }
    };
    MultilineExperiment.prototype.logConfig = function (frame) {
        frame.appendDebug("\n      baseOnly: ".concat(this.baseOnly, ", \n      spacing: ").concat(this.spacing, ",\n      excludeSq: ").concat(this.excludeSq, ",\n      persistFrames: ").concat(this.persistFrames, ",\n      persistedFrames: ").concat(this.persistedFrames, ",\n   "));
    };
    MultilineExperiment.prototype.configureParams = function (frame) {
        if (this.persistFrames <= 0 || this.persistedFrames > this.persistFrames) {
            this.baseOnly = this.chance.bool({ likelihood: 10 });
            this.spacing = this.chance.weighted([0, 2, 4], [20, 80, 0]);
            this.excludeSq = this.chance.bool({ likelihood: 50 });
            this.numLines = 1; //this.chance.integer({ min: 1, max: 2});
            this.persistFrames = this.chance.integer({ min: 2, max: 6 });
            this.persistedFrames = 1;
            this.logConfig(frame);
            return;
        }
        this.persistedFrames += 1;
        this.logConfig(frame);
    };
    MultilineExperiment.prototype.generateFrame = function () {
        var frame = new svg_1.Frame(this.canvas);
        frame.appendBG(colors_1.Pico8Pallete.black);
        this.configureParams(frame);
        //this.addBaseLayerMultiline(frame);
        this.addBaseLayerPixels(frame);
        if (this.baseOnly) {
            return frame;
        }
        var stripedSquare = new striped_square_1.StripedSquare({ width: this.canvas.pixelGrid.x,
            height: this.canvas.pixelGrid.y
        }, { x: 0, y: 0 }, new color_picker_1.SingleColorPicker(colors_1.Pico8Pallete.white));
        var lineSize = {
            width: 1,
            height: this.canvas.pixelGrid.y
        };
        var multilines = [];
        var numEls = Math.floor(this.canvas.pixelGrid.x / this.numLines);
        //let colorPicker = new SequentialColorPicker(this.lineColors);
        for (var _i = 0, _a = [element_1.Direction.vertical, element_1.Direction.horizontal]; _i < _a.length; _i++) {
            var direction = _a[_i];
            for (var i = 0; i < numEls; i++) {
                var origin = {
                    x: i * (this.numLines + this.spacing),
                    y: 0
                };
                var multiline_2 = new multiline_1.Multiline(lineSize, origin, this.colorPicker, this.numLines, direction);
                multilines.push(multiline_2);
            }
        }
        var colorPickerSq = new color_picker_1.ColorPicker([colors_1.Pico8Pallete.black]);
        this.shuffleArray(multilines);
        var excludeSq = this.excludeSq;
        for (var _b = 0, multilines_1 = multilines; _b < multilines_1.length; _b++) {
            var multiline = multilines_1[_b];
            for (var _c = 0, _d = multiline.getPoints(); _c < _d.length; _c++) {
                var point = _d[_c];
                if (!excludeSq || excludeSq && !stripedSquare.containsPoint(point)) {
                    frame.appendPixel(point.x, point.y, point.color);
                }
                else {
                    frame.appendPixel(point.x, point.y, colorPickerSq.nextColor());
                }
            }
        }
        return frame;
    };
    return MultilineExperiment;
}(experiment_1.Experiment));
exports.MultilineExperiment = MultilineExperiment;
