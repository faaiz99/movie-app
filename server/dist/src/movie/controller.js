"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = exports.getMovies = exports.getMovieById = exports.deleteMovieById = exports.updateMovieById = void 0;
const error_1 = require("../middewares/error");
const response_1 = require("../utils/response");
const movieService = __importStar(require("./service"));
const updateMovieById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const movie = req.body;
    try {
        const data = yield movieService.updateMovieById(movieId, movie);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.updateMovieById = updateMovieById;
const deleteMovieById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const data = yield movieService.deleteMovieById(movieId);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.deleteMovieById = deleteMovieById;
const getMovieById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    try {
        const data = yield movieService.getMovieById(movieId);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.getMovieById = getMovieById;
const getMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield movieService.getMovies();
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.getMovies = getMovies;
const createMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.body;
    try {
        const data = yield movieService.createMovie(movie);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.createMovie = createMovie;
