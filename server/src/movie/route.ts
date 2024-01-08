import { Router } from "express";
import {
	createMovie,
	getMovies,
	getMovieById,
	deleteMovieById,
	updateMovieById,
	getMoviesWithMostReviews,
	getMoviesByCharactersInTheirName,
} from "./controller";
import { checkSchema } from "express-validator";
const router = Router();

router.post("/movies", checkSchema({
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
	},
}), createMovie);
router.get("/movies", getMovies);
router.get("/movies/:movieId", checkSchema({
	movieId: {
		isString: true,
		notEmpty: true,
	},
}, ["params"]), getMovieById);
router.post("/movies/:movieId", checkSchema({
	movieId: {
		isString: true,
		notEmpty: true,
		errorMessage: "MovieId is required",
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
	},
}, ["params", "body"]), updateMovieById);
router.delete("/movies/:movieId", checkSchema({
	movieId: {
		isString: true,
		notEmpty: true,
	}
}, ["params"]), deleteMovieById);
router.get("/movies-featured", getMoviesWithMostReviews);
router.get("/movies-search", checkSchema({
	term: {
		isString: true,
		notEmpty: true,
	}
}, ["query"]), getMoviesByCharactersInTheirName);
export { router as movieRouter };
