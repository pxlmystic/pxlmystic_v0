"use strict";
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
exports.ColorPicker = void 0;
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
