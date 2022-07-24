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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.SequentialColorPicker = exports.SingleColorPicker = exports.ColorPicker = void 0;
var chance_1 = require("chance");
var ColorPicker = /** @class */ (function () {
    function ColorPicker(colors, weights, maxColors) {
        this.colors = [];
        this.chance = new chance_1.Chance();
        this.weights = !weights ? [] : weights;
        this.maxColors = maxColors > 0 ? maxColors : colors.length;
        // remove random colors to meet max
        var colorsCopy = __spreadArray([], colors, true);
        if (maxColors < colors.length) {
            for (var i = 0; i < maxColors; i++) {
                var randomIndex = this.chance.integer({ min: 0, max: colorsCopy.length - 1 });
                var randomItem = colorsCopy[randomIndex];
                this.colors.push(randomItem);
                colorsCopy.splice(randomIndex, 1);
            }
        }
        else {
            this.colors = colors;
        }
    }
    ColorPicker.prototype.randomColor = function () {
        if (this.weights.length > 0) {
            return this.chance.weighted(this.colors, this.weights);
        }
        var randomIndex = this.chance.integer({ min: 0, max: this.colors.length - 1 });
        return this.colors[randomIndex];
    };
    ColorPicker.prototype.nextColor = function () {
        return this.randomColor();
    };
    return ColorPicker;
}());
exports.ColorPicker = ColorPicker;
var SingleColorPicker = /** @class */ (function (_super) {
    __extends(SingleColorPicker, _super);
    function SingleColorPicker(color) {
        var _this = _super.call(this, [color]) || this;
        _this.color = color;
        return _this;
    }
    SingleColorPicker.prototype.nextColor = function () {
        return this.color;
    };
    return SingleColorPicker;
}(ColorPicker));
exports.SingleColorPicker = SingleColorPicker;
var SequentialColorPicker = /** @class */ (function (_super) {
    __extends(SequentialColorPicker, _super);
    function SequentialColorPicker(colors) {
        var _this = _super.call(this, colors) || this;
        _this.colorCursor = 0;
        return _this;
    }
    SequentialColorPicker.prototype.nextColor = function () {
        if (this.colorCursor >= this.colors.length) {
            this.colorCursor = 0;
        }
        var color = this.colors[this.colorCursor];
        this.colorCursor += 1;
        return color;
    };
    return SequentialColorPicker;
}(ColorPicker));
exports.SequentialColorPicker = SequentialColorPicker;
