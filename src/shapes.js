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
exports.Hexagon = exports.RightEquilateralTriangle = exports.LeftEquilateralTriangle = exports.EquilateralTriangle = exports.RightTriangle = exports.Circle = exports.Rect = exports.Shape = void 0;
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.containsPoint = function (point) {
        return false;
    };
    return Shape;
}());
exports.Shape = Shape;
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(size, origin) {
        var _this = _super.call(this) || this;
        _this.size = size;
        _this.origin = origin;
        return _this;
    }
    Rect.prototype.containsPoint = function (point) {
        return point.x >= this.origin.x && point.x <= this.origin.x + this.size.width &&
            point.y >= this.origin.y && point.y <= this.origin.y + this.size.height;
    };
    return Rect;
}(Shape));
exports.Rect = Rect;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius, center) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        _this.center = center;
        return _this;
    }
    Circle.prototype.containsPoint = function (point) {
        return (this.center.x - point.x) * (this.center.x - point.x) +
            (this.center.y - point.y) * (this.center.y - point.y) < this.radius * this.radius;
    };
    return Circle;
}(Shape));
exports.Circle = Circle;
var RightTriangle = /** @class */ (function (_super) {
    __extends(RightTriangle, _super);
    function RightTriangle(origin, adjacent, opposite) {
        var _this = _super.call(this) || this;
        _this.origin = origin;
        _this.adjacent = adjacent;
        _this.opposite = opposite;
        return _this;
    }
    RightTriangle.prototype.pointA = function () {
        return { x: this.origin.x, y: this.origin.y - this.adjacent };
    };
    RightTriangle.prototype.pointB = function () {
        return { x: this.origin.x + this.opposite, y: this.origin.y };
    };
    RightTriangle.prototype.sign = function (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };
    // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
    RightTriangle.prototype.hitTest = function (pt, v1, v2, v3) {
        var d1, d2, d3;
        var hasNeg, hasPos;
        d1 = this.sign(pt, v1, v2);
        d2 = this.sign(pt, v2, v3);
        d3 = this.sign(pt, v3, v1);
        hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        return !(hasNeg && hasPos);
    };
    // https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
    RightTriangle.prototype.containsPoint = function (point) {
        return this.hitTest(point, this.origin, this.pointA(), this.pointB());
    };
    return RightTriangle;
}(Shape));
exports.RightTriangle = RightTriangle;
var EquilateralTriangle = /** @class */ (function (_super) {
    __extends(EquilateralTriangle, _super);
    function EquilateralTriangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EquilateralTriangle.prototype.pointA = function () {
        var x = this.origin.x + Math.floor(this.opposite / 2);
        return { x: x, y: _super.prototype.pointA.call(this).y };
    };
    return EquilateralTriangle;
}(RightTriangle));
exports.EquilateralTriangle = EquilateralTriangle;
// converts a bottom anchored triangle to left
var LeftEquilateralTriangle = /** @class */ (function (_super) {
    __extends(LeftEquilateralTriangle, _super);
    function LeftEquilateralTriangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftEquilateralTriangle.prototype.pointB = function () {
        return { x: this.origin.x, y: this.origin.y - this.opposite };
    };
    return LeftEquilateralTriangle;
}(EquilateralTriangle));
exports.LeftEquilateralTriangle = LeftEquilateralTriangle;
// converts a top anchored triangle to right
var RightEquilateralTriangle = /** @class */ (function (_super) {
    __extends(RightEquilateralTriangle, _super);
    function RightEquilateralTriangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightEquilateralTriangle.prototype.containsPoint = function (point) {
        var adjustedOrigin = {
            x: this.origin.x + this.opposite,
            y: this.origin.y + this.opposite
        };
        return this.hitTest(point, adjustedOrigin, this.pointA(), this.pointB());
    };
    return RightEquilateralTriangle;
}(EquilateralTriangle));
exports.RightEquilateralTriangle = RightEquilateralTriangle;
var Hexagon = /** @class */ (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon(side, center) {
        var _this = _super.call(this) || this;
        _this.side = side;
        _this.center = center;
        return _this;
    }
    Hexagon.prototype.containsPoint = function (point) {
        // center rect
        var r = Math.floor(this.side / 2);
        if (point.y > this.center.y - this.side && point.y < this.center.y + this.side && point.x > this.center.x - r && point.x < this.center.x + r) {
            return true;
        }
        // top right triangle
        var rOrigin = { x: this.center.x + r, y: this.center.y };
        var rt = new EquilateralTriangle(this.center, this.side, this.side);
        if (rt.containsPoint(point)) {
            return true;
        }
        // bottom right triangle
        var rb = new EquilateralTriangle(this.center, -1 * this.side, this.side);
        if (rb.containsPoint(point)) {
            return true;
        }
        // top left triangle
        var lOrigin = { x: this.center.x - r, y: this.center.y };
        var lt = new EquilateralTriangle(this.center, this.side, -1 * this.side);
        if (lt.containsPoint(point)) {
            return true;
        }
        // bottom left triangle
        var lb = new EquilateralTriangle(this.center, -1 * this.side, -1 * this.side);
        if (lb.containsPoint(point)) {
            return true;
        }
        return false;
    };
    return Hexagon;
}(Shape));
exports.Hexagon = Hexagon;
