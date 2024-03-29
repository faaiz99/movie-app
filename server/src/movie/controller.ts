import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

import { handleError } from "../middewares/error";
import { handleResponse } from "../utils/response";

import * as movieService from "./service";

export const getMoviesByCharactersInTheirName: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	}
	const { term } = req.query;
	try {
		const data = await movieService.getMoviesByCharactersInTheirName(
      term as string
		);
		handleResponse(res, 200, data);
	} catch (error) {
		console.log("error", error);
		handleError(error, res, next);
	}
};

export const updateMovieById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	}
	const { movieId } = req.params;
	const movie = req.body;
	try {
		const data = await movieService.updateMovieById(movieId, movie);
		handleResponse(res, 200, data);
	} catch (error: any) {
		error.statusCode = 409;
		error.message = "Movie already exists with title";
		handleError(error, res, next);
	}
};

export const deleteMovieById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	}
	const { movieId } = req.params;
	try {
		const data = await movieService.deleteMovieById(movieId);
		handleResponse(res, 200, data);
	} catch (error: any) {
		error.statusCode = 404;
		error.message = "Movie Not Found";
		handleError(error, res, next);
	}
};

export const getMovieByTitle: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	}
	const { movieTitle } = req.params;
	try {
		const data = await movieService.getMovieByTitle(movieTitle);
		/**
     * Since no movies are matched an exception is not thrown but a null value is returned but code is not refactored to handle this case
     */
		if (!data) {
			throw new Error("Movie Not Found");
		}
		handleResponse(res, 200, data);
	} catch (error: any) {
		// error.statusCode = 404;
		// error.message = "Movie Not Found";
		handleError(error, res, next);
	}
};

export const getMovies: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return handleResponse(res, 422, errors.array());
	}
	try {
		const data = await movieService.getMovies();
		return handleResponse(res, 200, data);
	} catch (error) {
		return handleError(error, res, next);
	}
};

export const createMovie: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	}
	const movie = req.body;
	try {
		const data = await movieService.createMovie(movie);
		handleResponse(res, 201, data);
	} catch (error: any) {
		error.statusCode = 409;
		error.message = "Movie already exists with title";
		handleError(error, res, next);
	}
};

export const getMoviesWithMostReviews: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await movieService.getMoviesWithMostReviews();
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};
