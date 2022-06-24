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
exports.LoaderElement = void 0;
var element_1 = require("../element");
var LoaderElement = /** @class */ (function (_super) {
    __extends(LoaderElement, _super);
    function LoaderElement(origin, colorPicker, onFrames, offFrames, dots, persistDots, spacing, height, direction, maxIterations) {
        var _this = _super.call(this) || this;
        _this.persistDots = false;
        _this.spacing = 0;
        _this.height = 1;
        _this.maxIterations = 420;
        // state
        _this.ticks = 0;
        _this.ticksOn = 0;
        _this.ticksOff = 0;
        _this.currentDot = 0;
        _this.iterations = 0;
        _this.origin = origin;
        _this.colorPicker = colorPicker;
        _this.onFrames = onFrames;
        _this.offFrames = offFrames;
        _this.dots = dots;
        _this.persistDots = persistDots == true;
        _this.spacing = spacing != 0 ? spacing : 0;
        _this.height = height != _this.height ? height : _this.height;
        _this.direction = direction ? direction : element_1.Direction.horizontal;
        _this.maxIterations = maxIterations ? maxIterations : _this.maxIterations;
        return _this;
    }
    LoaderElement.prototype.tick = function () {
        this.ticks += 1;
        if (this.isOn()) {
            this.ticksOn += 1;
        }
        else if (this.isOff()) {
            this.ticksOff += 1;
        }
        if (this.ticksOn > this.onFrames) {
            this.currentDot += 1;
            this.ticksOn = 1;
        }
        if (this.isOn() && this.currentDot >= this.dots) {
            this.currentDot = 0; // reset
            this.ticksOn = 0;
            this.ticksOff = 1;
            this.iterations += 1;
        }
        if (this.isOff() && this.ticksOff > this.offFrames) {
            this.currentDot = 0;
            this.ticksOn = 1;
            this.ticksOff = 0;
        }
    };
    LoaderElement.prototype.isOn = function () {
        return this.ticks <= 1 || this.ticksOn > 0;
    };
    LoaderElement.prototype.isOff = function () {
        return this.ticksOff > 0;
    };
    LoaderElement.prototype.expired = function () {
        return this.iterations >= this.maxIterations;
    };
    LoaderElement.prototype.skipToEndBeforeTick = function () {
        this.currentDot = this.dots - 1;
    };
    LoaderElement.prototype.getPoints = function () {
        if (this.expired() || this.isOff()) {
            return [];
        }
        var points = [];
        var x = this.origin.x;
        if (!this.persistDots) {
            x += this.currentDot;
        }
        var i = 0;
        while (x < this.origin.x + this.currentDot + 1) {
            for (var y = 0; y < this.height; y++) {
                var point = {
                    x: x + this.spacing * i,
                    y: this.origin.y + y,
                    color: this.colorPicker.nextColor()
                };
                if (this.direction == element_1.Direction.vertical) {
                    var vPoint = {
                        x: point.y,
                        y: point.x,
                        color: point.color
                    };
                    points.push(vPoint);
                }
                else {
                    points.push(point);
                }
            }
            x += 1;
            i += 1;
        }
        return points;
    };
    return LoaderElement;
}(element_1.Element));
exports.LoaderElement = LoaderElement;
