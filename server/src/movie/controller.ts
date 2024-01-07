import { Request, Response, RequestHandler, NextFunction } from "express";
import { handleError } from "../middewares/error";
import { handleResponse } from "../util/response";
import * as movieService from "./service";

export const updateMovieById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { movieId } = req.params;
	const movie = req.body;
	try {
		const data = await movieService.updateMovieById(movieId, movie);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const deleteMovieById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { movieId } = req.params;
	try {
		const data = await movieService.deleteMovieById(movieId);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const getMovieById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { movieId } = req.params;
	try {
		const data = await movieService.getMovieById(movieId);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const getMovies: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = await movieService.getMovies();
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const createMovie: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const movie = req.body;
	try {
		const data = await movieService.createMovie(movie);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};
