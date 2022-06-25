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
exports.BarsPattern = void 0;
var element_1 = require("../element");
var BarsPattern = /** @class */ (function (_super) {
    __extends(BarsPattern, _super);
    function BarsPattern(size, origin, direction) {
        var _this = _super.call(this) || this;
        _this.origin = { x: 0, y: 0 };
        _this.size = size;
        _this.origin = origin = origin ? origin : _this.origin;
        _this.direction = direction;
        return _this;
    }
    BarsPattern.prototype.tick = function () {
        // noop for now
    };
    BarsPattern.prototype.getPoints = function () {
        var points = [];
        for (var x = this.origin.x; x < this.size.width; x++) {
            for (var y = this.origin.y; y < this.size.height; y++) {
                var on = x % 2 == 1;
                if (on) {
                    var point = {
                        x: x,
                        y: y
                    };
                    if (this.direction == element_1.Direction.horizontal) {
                        var hPoint = {
                            x: point.y,
                            y: point.x
                        };
                        points.push(hPoint);
                    }
                    else {
                        points.push(point);
                    }
                }
            }
        }
        return points;
    };
    return BarsPattern;
}(element_1.Element));
exports.BarsPattern = BarsPattern;
