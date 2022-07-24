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
exports.Multiline = void 0;
var element_1 = require("../element");
var Multiline = /** @class */ (function (_super) {
    __extends(Multiline, _super);
    function Multiline(lineSize, origin, colorPicker, numLines, direction) {
        var _this = _super.call(this) || this;
        _this.origin = { x: 0, y: 0 };
        _this.lineSize = lineSize;
        _this.origin = origin = origin ? origin : _this.origin;
        _this.colorPicker = colorPicker;
        _this.numLines = numLines;
        _this.direction = direction;
        return _this;
    }
    Multiline.prototype.tick = function () {
        // noop for now
    };
    Multiline.prototype.getPoints = function () {
        var points = [];
        var color = this.colorPicker.nextColor();
        for (var x = this.origin.x; x < this.origin.x + this.lineSize.width * this.numLines; x++) {
            var color_1 = this.colorPicker.nextColor();
            for (var y = 0; y < this.lineSize.height; y++) {
                if (this.direction == element_1.Direction.horizontal) {
                    points.push({ x: y, y: x, color: color_1 });
                }
                else {
                    points.push({ x: x, y: y, color: color_1 });
                }
            }
        }
        return points;
    };
    return Multiline;
}(element_1.Element));
exports.Multiline = Multiline;
