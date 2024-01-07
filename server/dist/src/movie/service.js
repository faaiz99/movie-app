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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieById = exports.deleteMovieById = exports.getMovieById = exports.getMovies = exports.createMovie = void 0;
const client_1 = require("@prisma/client");
const repository_1 = require("./repository");
const types_1 = require("../types/types");
const prisma = new client_1.PrismaClient();
const movieRepository = new repository_1.MovieRepository(prisma);
const createMovie = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    const movieDTO = new types_1.CreateMovieDTO();
    movieDTO.title = movie.title;
    movieDTO.description = movie.description;
    movieDTO.poster = movie.poster;
    movieDTO.trailer = movie.trailer;
    movieDTO.userId = movie.userId;
    return yield movieRepository.create(movieDTO);
});
exports.createMovie = createMovie;
const getMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield movieRepository.getAll();
});
exports.getMovies = getMovies;
const getMovieById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movieRepository.getById(movieId);
});
exports.getMovieById = getMovieById;
const deleteMovieById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movieRepository.deletebyId(movieId);
});
exports.deleteMovieById = deleteMovieById;
const updateMovieById = (movieId, movie) => __awaiter(void 0, void 0, void 0, function* () {
    const movieDTO = new types_1.UpdateMovieDTO();
    movieDTO.title = movie.title;
    movieDTO.description = movie.description;
    movieDTO.poster = movie.poster;
    movieDTO.trailer = movie.trailer;
    return yield movieRepository.updatebyId(movieId, movieDTO);
});
exports.updateMovieById = updateMovieById;
