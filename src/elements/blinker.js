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
exports.BlinkerElement = void 0;
var element_1 = require("../element");
var BlinkerElement = /** @class */ (function (_super) {
    __extends(BlinkerElement, _super);
    function BlinkerElement(size, origin, color, onFrames, offFrames) {
        var _this = _super.call(this) || this;
        _this.ticks = 0;
        _this.ticksOn = 0;
        _this.ticksOff = 0;
        _this.size = size;
        _this.origin = origin;
        _this.color = color;
        _this.onFrames = onFrames;
        _this.offFrames = offFrames;
        return _this;
    }
    BlinkerElement.prototype.tick = function () {
        this.ticks += 1;
        // start with on state
        if (this.ticksOn == 0 && this.ticksOff == 0) {
            this.ticksOn += 1;
            return;
        }
        if (this.isOn()) {
            this.ticksOn += 1;
        }
        else if (this.isOff()) {
            this.ticksOff += 1;
        }
        // switch off
        if (this.ticksOn > this.onFrames) {
            this.ticksOn = 0;
            this.ticksOff = 1;
            return;
        }
        // switch on
        if (this.ticksOff > this.offFrames) {
            this.ticksOff = 0;
            this.ticksOn = 1;
            return;
        }
    };
    BlinkerElement.prototype.isOn = function () {
        return this.ticksOn > 0;
    };
    BlinkerElement.prototype.isOff = function () {
        return this.ticksOff > 0;
    };
    BlinkerElement.prototype.getPoints = function () {
        if (this.isOff()) {
            return [];
        }
        var points = [];
        for (var x = this.origin.x; x < this.origin.x + this.size.width; x++) {
            for (var y = this.origin.y; y < this.origin.y + this.size.height; y++) {
                var point = { x: x, y: y, color: this.color };
                points.push(point);
            }
        }
        return points;
    };
    return BlinkerElement;
}(element_1.Element));
exports.BlinkerElement = BlinkerElement;
