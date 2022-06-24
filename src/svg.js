"use strict";
exports.__esModule = true;
exports.Frame = void 0;
var chance_1 = require("chance");
var Frame = /** @class */ (function () {
    function Frame(canvas) {
        this.canvas = canvas;
        this.body = "";
        this.chance = new chance_1.Chance();
    }
    Frame.prototype.centerPoint = function () {
        return {
            x: Math.floor(this.canvas.pixelGrid.x / 2),
            y: Math.floor(this.canvas.pixelGrid.y / 2)
        };
    };
    Frame.prototype.randomPoint = function () {
        var randomX = this.chance.integer({ min: 0, max: this.canvas.pixelGrid.x });
        var randomY = this.chance.integer({ min: 0, max: this.canvas.pixelGrid.y });
        return { x: randomX, y: randomY };
    };
    Frame.prototype.appendRect = function (x, y, height, width, fill) {
        var s = "<rect x=\"".concat(x, "\" y=\"").concat(y, "\" height=\"").concat(height, "\" width=\"").concat(width, "\" fill=\"").concat(fill, "\" />");
        this.body += s;
        return s;
    };
    Frame.prototype.appendPixel = function (x, y, fill) {
        return this.appendRect(x, y, 1, 1, fill);
    };
    Frame.prototype.appendBG = function (fill) {
        return this.appendRect(0, 0, this.canvas.pixelGrid.x, this.canvas.pixelGrid.y, fill);
    };
    Frame.prototype.wrap = function (body) {
        return "<svg width=\"".concat(this.canvas.dimensions.width, "\" height=\"").concat(this.canvas.dimensions.height, "\" viewBox=\"0 0 ").concat(this.canvas.pixelGrid.x, " ").concat(this.canvas.pixelGrid.y, "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\">").concat(body, "</svg>");
    };
    Frame.prototype.toString = function () {
        return this.wrap(this.body);
    };
    return Frame;
}());
exports.Frame = Frame;
