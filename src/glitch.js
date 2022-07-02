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
exports.RowMover = exports.RowRemover = exports.ColumnRemover = exports.DegradePointProcessor = exports.PointProcessor = void 0;
var chance_1 = require("chance");
var PointProcessor = /** @class */ (function () {
    function PointProcessor() {
    }
    PointProcessor.prototype.processPoints = function (points) {
        return [];
    };
    return PointProcessor;
}());
exports.PointProcessor = PointProcessor;
var DegradePointProcessor = /** @class */ (function (_super) {
    __extends(DegradePointProcessor, _super);
    function DegradePointProcessor(percent) {
        var _this = _super.call(this) || this;
        _this.chance = new chance_1.Chance();
        _this.percent = percent;
        return _this;
    }
    DegradePointProcessor.prototype.processPoints = function (points) {
        var processedPoints = [];
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            var degrade = this.chance.bool({ likelihood: this.percent });
            if (!degrade) {
                processedPoints.push(point);
            }
        }
        return processedPoints;
    };
    return DegradePointProcessor;
}(PointProcessor));
exports.DegradePointProcessor = DegradePointProcessor;
var ColumnRemover = /** @class */ (function (_super) {
    __extends(ColumnRemover, _super);
    function ColumnRemover(percent) {
        var _this = _super.call(this) || this;
        _this.chance = new chance_1.Chance();
        _this.percent = percent;
        return _this;
    }
    ColumnRemover.prototype.processPoints = function (points) {
        var processedPoints = [];
        var rows = {}; // {1: false}
        for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
            var point = points_2[_i];
            if (!rows.hasOwnProperty(point.x)) {
                var remove = this.chance.bool({ likelihood: this.percent });
                rows[point.x] = remove;
            }
            if (!rows[point.x]) {
                processedPoints.push(point);
            }
        }
        return processedPoints;
    };
    return ColumnRemover;
}(PointProcessor));
exports.ColumnRemover = ColumnRemover;
var RowRemover = /** @class */ (function (_super) {
    __extends(RowRemover, _super);
    function RowRemover(percent) {
        var _this = _super.call(this) || this;
        _this.chance = new chance_1.Chance();
        _this.percent = percent;
        return _this;
    }
    RowRemover.prototype.processPoints = function (points) {
        var processedPoints = [];
        var rows = {}; // {1: false}
        for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
            var point = points_3[_i];
            if (!rows.hasOwnProperty(point.y)) {
                var remove = this.chance.bool({ likelihood: this.percent });
                rows[point.y] = remove;
            }
            if (!rows[point.y]) {
                processedPoints.push(point);
            }
        }
        return processedPoints;
    };
    return RowRemover;
}(PointProcessor));
exports.RowRemover = RowRemover;
var RowMover = /** @class */ (function (_super) {
    __extends(RowMover, _super);
    function RowMover(percent) {
        var _this = _super.call(this) || this;
        _this.chance = new chance_1.Chance();
        _this.percent = percent;
        return _this;
    }
    RowMover.prototype.processPoints = function (points) {
        var processedPoints = [];
        var rows = {}; // {1: false}
        for (var _i = 0, points_4 = points; _i < points_4.length; _i++) {
            var point = points_4[_i];
            if (!rows.hasOwnProperty(point.y)) {
                var move = this.chance.bool({ likelihood: this.percent });
                rows[point.y] = move ? point.y + 1 : point.y;
            }
            point.y = rows[point.y];
            processedPoints.push(point);
        }
        return processedPoints;
    };
    return RowMover;
}(PointProcessor));
exports.RowMover = RowMover;
