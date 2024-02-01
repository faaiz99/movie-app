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
import { validateToken } from "../middewares/auth";

router.post(
	"/reviews/:movieId",
	validateToken,
	checkSchema(
		{
			movieId: {
				isString: true,
				notEmpty: true,
				errorMessage: "MovieId is required",
				isLength: {
					options: { min: 36, max: 36 },
					errorMessage: "MovieId must be 36 characters",
				},
			},
			title: {
				isString: true,
				notEmpty: true,
				errorMessage: "Title is required",
			},
			description: {
				isString: true,
				notEmpty: true,
				errorMessage: "Description is required",
			},
			rating: {
				isInt: true,
				notEmpty: true,
				errorMessage: "Rating is required",
			},
			userId: {
				isString: true,
				notEmpty: true,
				errorMessage: "UserId is required",
			},
		},
		["body", "params"]
	),
	createReview
);
router.get("/reviews/:movieId", checkSchema(
	{
		movieId: {
			isString: true,
			notEmpty: true,
			errorMessage: "MovieId is required",
			isLength: {
				options: { min: 36, max: 36 },
				errorMessage: "MovieId must be 36 characters",
			},
		}
	},
	["params"],

), getReviews);
router.get(
	"/reviews/:reviewId",
	checkSchema(
		{
			reviewId: {
				isString: true,
				notEmpty: true,
				errorMessage: "ReviewId is required",
				isLength: {
					options: { min: 36, max: 36 },
					errorMessage: "ReviewId must be 36 characters",
				},
			},
		},
		["params"]
	),
	getReviewById
);
router.post(
	"/reviews/:reviewId",
	validateToken,
	checkSchema(
		{
			movieId: {
				isString: true,
				notEmpty: true,
				errorMessage: "MovieId is required",
				isLength: {
					options: { min: 36, max: 36 },
					errorMessage: "MovieId must be 36 characters",
				},
			},
			title: {
				isString: true,
				notEmpty: true,
				optional: true,
				errorMessage: "Title cannot be empty",
			},
			description: {
				isString: true,
				notEmpty: true,
				optional: true,
				errorMessage: "Description cannot be empty",
			},
			rating: {
				isInt: true,
				notEmpty: true,
				optional: true,
				errorMessage: "Rating cannot be empty",
			},
			userId: {
				isString: true,
				notEmpty: true,
				errorMessage: "UserId is required",
				isLength: {
					options: { min: 36, max: 36 },
					errorMessage: "UserId must be 36 characters",
				},
			},
		},
		["body", "params"]
	),
	updateReviewById
);
router.delete(
	"/reviews/:reviewId",
	validateToken,
	checkSchema(
		{
			reviewId: {
				isString: true,
				notEmpty: true,
				errorMessage: "ReviewId is required",
				isLength: {
					options: { min: 36, max: 36 },
					errorMessage: "ReviewId must be 36 characters",
				},
			},
		},
		["params"]
	),
	deleteReviewById
);

export { router as reviewRouter };
