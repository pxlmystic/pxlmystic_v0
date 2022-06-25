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
exports.CheckersPattern = void 0;
var element_1 = require("../element");
var CheckersPattern = /** @class */ (function (_super) {
    __extends(CheckersPattern, _super);
    function CheckersPattern(size, origin, colorPicker, toggleOn) {
        var _this = _super.call(this) || this;
        _this.origin = { x: 0, y: 0 };
        _this.size = size;
        _this.origin = origin = origin ? origin : _this.origin;
        _this.colorPicker = colorPicker;
        _this.toggleOn = toggleOn == true;
        return _this;
    }
    CheckersPattern.prototype.tick = function () {
        // noop for now
    };
    CheckersPattern.prototype.getPoints = function () {
        var points = [];
        for (var x = this.origin.x; x < this.size.width; x++) {
            for (var y = this.origin.y; y < this.size.height; y++) {
                var on = (x % 2) == (y % 2 == 0 ? 1 : 0);
                on = on == this.toggleOn;
                if (on) {
                    var color = this.colorPicker.nextColor();
                    var point = {
                        x: x,
                        y: y,
                        color: color
                    };
                    points.push(point);
                }
            }
        }
        return points;
    };
    return CheckersPattern;
}(element_1.Element));
exports.CheckersPattern = CheckersPattern;
