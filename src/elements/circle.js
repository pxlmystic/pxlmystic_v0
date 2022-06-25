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
exports.CircleElement = void 0;
var element_1 = require("../element");
var chance_1 = require("chance");
var CircleElement = /** @class */ (function (_super) {
    __extends(CircleElement, _super);
    function CircleElement(radius, center) {
        var _this = _super.call(this) || this;
        _this.chance = new chance_1.Chance();
        _this.radius = radius;
        _this.center = center;
        return _this;
    }
    CircleElement.prototype.randomPoint = function () {
        var ang = Math.random() * 2 * Math.PI, hyp = Math.sqrt(Math.random()) * this.radius, adj = Math.cos(ang) * hyp, opp = Math.sin(ang) * hyp;
        var point = { x: Math.floor(this.center.x + adj), y: Math.floor(this.center.y + opp) };
        return point;
    };
    CircleElement.prototype.getPoints = function () {
        var points = [];
        var n = this.radius * 20;
        for (var i = 0; i < n; i++) {
            var point = this.randomPoint();
            points.push(point);
        }
        return points;
    };
    return CircleElement;
}(element_1.Element));
exports.CircleElement = CircleElement;
