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
exports.MovieRepository = void 0;
class MovieRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.movie.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.movie.findUnique({
                where: {
                    id: id,
                },
            });
        });
    }
    create(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.movie.create({
                data: movie,
            });
        });
    }
    updatebyId(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.movie.update({
                where: {
                    id: id,
                },
                data: movie,
            });
        });
    }
    deletebyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.movie.delete({
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.MovieRepository = MovieRepository;
