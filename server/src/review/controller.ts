import { Request, Response, RequestHandler, NextFunction } from "express";
import { handleError } from "../middewares/error";
import { handleResponse } from "../utils/response";
import * as reviewService from "./service";
import { validationResult } from "express-validator";

export const createReview: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		const review = req.body;
		const { movieId } = req.params;
		try {
			const data = await reviewService.createReview(review, movieId);
			handleResponse(res, 201, data);
		} catch (error: any) {
			// error.statusCode = 409;
			// error.message = "Review already exists with title";
			handleError(error, res, next);
		}
	}
};

export const updateReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		const { reviewId } = req.params;
		const review = req.body;
		try {
			const data = await reviewService.updateReviewById(reviewId, review);
			handleResponse(res, 200, data);
		} catch (error: any) {
			error.statusCode = 404;
			error.message = "Review Not Found";
			handleError(error, res, next);
		}
	}
};

export const deleteReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		const { reviewId } = req.params;
		try {
			const data = await reviewService.deleteReviewById(reviewId);
			handleResponse(res, 200, data);
		} catch (error: any) {
			error.statusCode = 404;
			error.message = "Review Not Found";
			handleError(error, res, next);
		}
	}
};

export const getReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		const { reviewId } = req.params;
		try {
			const data = await reviewService.getReviewById(reviewId);
			if (!data) throw new Error("Review Not Found");
			handleResponse(res, 200, data);
		} catch (error: any) {
			error.statusCode = 404;
			error.message = "Review Not Found";
			handleError(error, res, next);
		}
	}
};

export const getReviews: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		const { movieId } = req.params;
		try {
			const data = await reviewService.getReviews(movieId);
			if (!data) throw new Error("Review Not Found");
			handleResponse(res, 200, data);
		} catch (error) {
			handleError(error, res, next);
		}
	}
};
