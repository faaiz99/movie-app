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
exports.getReviews = exports.getReviewById = exports.deleteReviewById = exports.updateReviewById = exports.createReview = void 0;
const error_1 = require("../middewares/error");
const response_1 = require("../util/response");
const reviewService = __importStar(require("./service"));
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    try {
        const data = yield reviewService.createReview(review);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.createReview = createReview;
const updateReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const review = req.body;
    try {
        const data = yield reviewService.updateReviewById(reviewId, review);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.updateReviewById = updateReviewById;
const deleteReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    try {
        const data = yield reviewService.deleteReviewById(reviewId);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.deleteReviewById = deleteReviewById;
const getReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    try {
        const data = yield reviewService.getReviewById(reviewId);
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.getReviewById = getReviewById;
const getReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield reviewService.getReviews();
        (0, response_1.handleResponse)(res, 200, data);
    }
    catch (error) {
        (0, error_1.handleError)(error, res, next);
    }
});
exports.getReviews = getReviews;
