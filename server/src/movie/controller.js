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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = exports.getMovies = exports.getMovieById = exports.deleteMovieById = exports.updateMovieById = void 0;
var error_1 = require("../middewares/error");
var response_1 = require("../util/response");
var movieService = require("./service");
var updateMovieById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, movie, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.params.movieId;
                movie = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, movieService.updateMovieById(movieId, movie)];
            case 2:
                data = _a.sent();
                (0, response_1.handleResponse)(res, 200, data);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                (0, error_1.handleError)(error_2, res, next);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateMovieById = updateMovieById;
var deleteMovieById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.params.movieId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, movieService.deleteMovieById(movieId)];
            case 2:
                data = _a.sent();
                (0, response_1.handleResponse)(res, 200, data);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                (0, error_1.handleError)(error_3, res, next);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteMovieById = deleteMovieById;
var getMovieById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var movieId, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = req.params.movieId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, movieService.getMovieById(movieId)];
            case 2:
                data = _a.sent();
                (0, response_1.handleResponse)(res, 200, data);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                (0, error_1.handleError)(error_4, res, next);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMovieById = getMovieById;
var getMovies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, movieService.getMovies()];
            case 1:
                data = _a.sent();
                (0, response_1.handleResponse)(res, 200, data);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                (0, error_1.handleError)(error_5, res, next);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMovies = getMovies;
var createMovie = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var movie, data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movie = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, movieService.createMovie(movie)];
            case 2:
                data = _a.sent();
                (0, response_1.handleResponse)(res, 200, data);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                (0, error_1.handleError)(error_6, res, next);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createMovie = createMovie;
