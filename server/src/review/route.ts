import { Router } from "express";
import {
	createReview,
	updateReviewById,
	deleteReviewById,
	getReviewById,
	getReviews,
} from "./controller";
import { checkSchema } from "express-validator";
const router = Router();

router.post("/reviews/:movieId", checkSchema({
	movieId: {
		isString: true,
		notEmpty: true,
		errorMessage:"MovieId is required"
	},
	title: {
		isString: true,
		notEmpty: true,
		errorMessage:"Title is required"
	},
	description: {
		isString: true,
		notEmpty: true,
		errorMessage:"Description is required"
	},
	rating: {
		isInt: true,
		notEmpty: true,
		errorMessage:"Rating is required"
	},
	userId: {
		isString: true,
		notEmpty: true,
		errorMessage:"UserId is required"
	},
},["body", "params"]) , createReview);
router.get("/reviews", getReviews);
router.get("/reviews/:reviewId", checkSchema({
	reviewId: {
		isString: true,
		notEmpty: true,
		errorMessage:"ReviewId is required"
	},
},["params"]), getReviewById);
router.post("/reviews/:reviewId", checkSchema({
	movieId: {
		isString: true,
		notEmpty: true,
		errorMessage:"MovieId is required"
	},
	title: {
		isString: true,
		notEmpty: true,
		optional: true,
		errorMessage:"Title cannot be empty"
	},
	description: {
		isString: true,
		notEmpty: true,
		optional: true,
		errorMessage:"Description cannot be empty"
	},
	rating: {
		isInt: true,
		notEmpty: true,
		optional: true,
		errorMessage:"Rating cannot be empty"
	},
	userId: {
		isString: true,
		notEmpty: true,
		errorMessage:"UserId is required"
	},
}, ["body", "params"]), updateReviewById);
router.delete("/reviews/:reviewId", checkSchema({
	reviewId: {
		isString: true,
		notEmpty: true,
		errorMessage:"ReviewId is required"
	},
},["params"]), deleteReviewById);

export { router as reviewRouter };
