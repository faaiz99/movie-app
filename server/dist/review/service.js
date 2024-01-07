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
exports.updateReviewById = exports.deleteReviewById = exports.getReviewById = exports.getReviews = exports.createReview = void 0;
const client_1 = require("@prisma/client");
const repository_1 = require("./repository");
const types_js_1 = require("../types/types.js");
const prisma = new client_1.PrismaClient();
const reviewRepository = new repository_1.ReviewRepository(prisma);
const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewDTO = new types_js_1.CreateReviewDTO();
    reviewDTO.rating = review.rating;
    reviewDTO.title = review.title;
    reviewDTO.description = review.description;
    reviewDTO.userId = review.userId;
    reviewDTO.movieId = review.movieId;
    return yield reviewRepository.create(reviewDTO);
});
exports.createReview = createReview;
const getReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield reviewRepository.getAll();
});
exports.getReviews = getReviews;
const getReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reviewRepository.getById(reviewId);
});
exports.getReviewById = getReviewById;
const deleteReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield reviewRepository.deletebyId(reviewId);
});
exports.deleteReviewById = deleteReviewById;
const updateReviewById = (reviewId, review) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewDTO = new types_js_1.UpdateReviewDTO();
    reviewDTO.rating = review.rating;
    reviewDTO.title = review.title;
    reviewDTO.description = review.description;
    return yield reviewRepository.updatebyId(reviewId, reviewDTO);
});
exports.updateReviewById = updateReviewById;
