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
	},
	description: {
		isString: true,
		notEmpty: true,
	},
	poster: {
		isString: true,
		notEmpty: true,
	},
	trailer: {
		isString: true,
		notEmpty: true,
	},
	userId: {
		isString: true,
		notEmpty: true,
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
	},
	title: {
		isString: true,
		notEmpty: true,
	},
	description: {
		isString: true,
		notEmpty: true,
	},
	poster: {
		isString: true,
		notEmpty: true,
	},
	trailer: {
		isString: true,
		notEmpty: true,
	},
	userId: {
		isString: true,
		notEmpty: true,
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
