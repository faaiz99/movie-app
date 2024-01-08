import { Router } from "express";
import {
	createMovie,
	getMovies,
	getMovieById,
	deleteMovieById,
	updateMovieById,
	getMoviesWithMostReviews,
	getMoviesByCharactersInTheirName
} from "./controller";
const router = Router();

router.post("/movies", createMovie);
router.get("/movies", getMovies);
router.get("/movies/:movieId", getMovieById);
router.post("/movies/:movieId", updateMovieById);
router.delete("/movies/:movieId", deleteMovieById);
router.get("/movies-featured", getMoviesWithMostReviews);
router.get("/movies-search", getMoviesByCharactersInTheirName);
export { router as movieRouter };
