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
exports.StripedSquare = void 0;
var element_1 = require("../element");
var StripedSquare = /** @class */ (function (_super) {
    __extends(StripedSquare, _super);
    function StripedSquare(size, origin, colorPicker) {
        var _this = _super.call(this) || this;
        _this.origin = { x: 0, y: 0 };
        _this.size = size;
        _this.origin = origin = origin ? origin : _this.origin;
        _this.colorPicker = colorPicker;
        return _this;
    }
    StripedSquare.prototype.tick = function () {
        // noop for now
    };
    StripedSquare.prototype.pointsForSquare = function (origin, size, points) {
        if (size.width <= 1 && size.height <= 1) {
            return points;
        }
        for (var x = origin.x; x < size.width; x++) {
            for (var y = origin.y; y < size.height; y++) {
                var draw = false;
                // top or bottom row
                if (y == origin.y || y == size.height - 1) {
                    draw = true;
                }
                // sides
                if (!draw && x == origin.x || x == size.width - 1) {
                    draw = true;
                }
                if (draw) {
                    var point = {
                        x: x,
                        y: y,
                        color: this.colorPicker.nextColor()
                    };
                    points.push(point);
                }
            }
        }
        // zoom in
        var nextSize = {
            width: size.width - 2,
            height: size.height - 2
        };
        var nextOrigin = {
            x: origin.x + 2,
            y: origin.y + 2
        };
        return this.pointsForSquare(nextOrigin, nextSize, points);
    };
    StripedSquare.prototype.getPoints = function () {
        return this.pointsForSquare(this.origin, this.size, []);
    };
    StripedSquare.prototype.containsPoint = function (point) {
        for (var _i = 0, _a = this.getPoints(); _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.x == point.x && p.y == point.y) {
                return true;
            }
        }
        return false;
    };
    return StripedSquare;
}(element_1.Element));
exports.StripedSquare = StripedSquare;
