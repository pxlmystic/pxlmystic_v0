"use strict";
exports.__esModule = true;
exports.Experiment = void 0;
var Experiment = /** @class */ (function () {
    function Experiment(name, canvas, totalFrames) {
        this.totalFrames = 24;
        this.name = name;
        this.canvas = canvas;
        this.totalFrames = totalFrames ? totalFrames : this.totalFrames;
    }
    Experiment.prototype.generateFrame = function () {
        return null;
    };
    return Experiment;
}());
exports.Experiment = Experiment;
