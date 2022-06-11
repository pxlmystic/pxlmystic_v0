"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var rainbow_screen_1 = require("../src/experiments/rainbow-screen");
var rainbow_lines_1 = require("../src/experiments/rainbow-lines");
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var fs_2 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var child_process_1 = require("child_process");
var OUT_DIR = path_1["default"].join(__dirname, "../out");
var TOTAL_FRAMES = 24;
var canvas = {
    dimensions: { width: 1000, height: 1000 },
    pixelGrid: { x: 64, y: 64 }
};
function createDirectories(root) {
    return __awaiter(this, void 0, void 0, function () {
        var paths, _i, paths_1, path, fullPath, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = ["/svg", "/png", "/gif"];
                    _i = 0, paths_1 = paths;
                    _a.label = 1;
                case 1:
                    if (!(_i < paths_1.length)) return [3 /*break*/, 4];
                    path = paths_1[_i];
                    fullPath = "".concat(root, "/").concat(path);
                    exists = (0, fs_2.existsSync)(fullPath);
                    if (!!exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_1.promises.mkdir(fullPath, { recursive: true })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function writeSVGFrames(root, frames) {
    return __awaiter(this, void 0, void 0, function () {
        var i, frame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < frames.length)) return [3 /*break*/, 4];
                    frame = frames[i];
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(root, "/svg/").concat(i, ".svg"), frame.toString())];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function convertPNG(root) {
    return __awaiter(this, void 0, void 0, function () {
        var i, svgPath, pngPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < TOTAL_FRAMES)) return [3 /*break*/, 4];
                    svgPath = "".concat(root, "/svg/").concat(i, ".svg");
                    pngPath = "".concat(root, "/png/").concat(i, ".png");
                    return [4 /*yield*/, (0, sharp_1["default"])(svgPath).png().toFile(pngPath)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function convertGIF(root) {
    var cmd = "convert -dispose Previous $(ls -1 ".concat(root, "/png/*.png | sort -V) -loop 0 ").concat(root, "/gif/final.gif");
    (0, child_process_1.execSync)(cmd);
}
var generate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var experiments, _i, experiments_1, experiment, root, frames, i, frame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                experiments = [
                    new rainbow_screen_1.RainbowScreenExperiment(canvas),
                    new rainbow_lines_1.RainbowLinesExperiment(canvas)
                ];
                _i = 0, experiments_1 = experiments;
                _a.label = 1;
            case 1:
                if (!(_i < experiments_1.length)) return [3 /*break*/, 7];
                experiment = experiments_1[_i];
                root = "".concat(OUT_DIR, "/").concat(experiment.name, "/").concat(Date.now());
                return [4 /*yield*/, createDirectories(root)];
            case 2:
                _a.sent();
                frames = [];
                for (i = 0; i < TOTAL_FRAMES; i++) {
                    frame = experiment.generateFrame();
                    frames.push(frame);
                }
                return [4 /*yield*/, writeSVGFrames(root, frames)];
            case 3:
                _a.sent();
                return [4 /*yield*/, convertPNG(root)];
            case 4:
                _a.sent();
                return [4 /*yield*/, convertGIF(root)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); };
generate();
