"use strict";
exports.__esModule = true;
exports.Element = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["horizontal"] = 0] = "horizontal";
    Direction[Direction["vertical"] = 1] = "vertical";
})(Direction = exports.Direction || (exports.Direction = {}));
var Element = /** @class */ (function () {
    function Element() {
    }
    Element.prototype.tick = function () { };
    Element.prototype.getPoints = function () { return []; };
    ;
    return Element;
}());
exports.Element = Element;
