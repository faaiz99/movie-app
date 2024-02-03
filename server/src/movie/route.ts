import { Router } from "express";
import { checkSchema } from "express-validator";

import { validateToken } from "../middewares/auth";

import {
	createMovie,
	deleteMovieById,
	getMovieByTitle,
	getMovies,
	getMoviesByCharactersInTheirName,
	getMoviesWithMostReviews,
	updateMovieById,
} from "./controller";
const router = Router();

router.post(
	"/movies",
	validateToken,
	checkSchema({
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
		poster: {
			isString: true,
			notEmpty: true,
			errorMessage: "Poster is required",
		},
		trailer: {
			isString: true,
			notEmpty: true,
			errorMessage: "Trailer is required",
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
	}),
	createMovie
);
router.post(
	"/movie/:movieId",
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
			poster: {
				isString: true,
				notEmpty: true,
				optional: true,
				errorMessage: "Poster cannot be empty",
			},
			trailer: {
				isString: true,
				notEmpty: true,
				optional: true,
				errorMessage: "Trailer cannot be empty",
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
		["params", "body"]
	),
	updateMovieById
);
router.delete(
	"/movie/:movieId",
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
		},
		["params"]
	),
	deleteMovieById
);

router.get("/movies", getMovies);
router.get(
	"/movie/:movieTitle",
	checkSchema(
		{
			movieTitle: {
				isString: true,
				notEmpty: true,
				errorMessage: "Movie Title is required",
				isLength: {
					options: { min: 5, max: 150 },
					errorMessage: "Movie Title must be min 5 characters",
				},
			},
		},
		["params"]
	),
	getMovieByTitle
);
router.get("/movies-featured", getMoviesWithMostReviews);
router.get(
	"/movies-search",
	checkSchema(
		{
			term: {
				isString: true,
				notEmpty: true,
				errorMessage: "Term is required",
			},
		},
		["query"]
	),
	getMoviesByCharactersInTheirName
);
export { router as movieRouter };
