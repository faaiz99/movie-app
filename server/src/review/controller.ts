import { Request, Response, RequestHandler, NextFunction } from "express";
import { handleError } from "../middewares/error";
import { handleResponse } from "../util/response";
import * as reviewService from "./service";

export const createReview: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const review = req.body;
	try {
		const data = await reviewService.createReview(review);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const updateReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { reviewId } = req.params;
	const review = req.body;
	try {
		const data = await reviewService.updateReviewById(reviewId, review);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const deleteReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { reviewId } = req.params;
	try {
		const data = await reviewService.deleteReviewById(reviewId);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const getReviewById: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { reviewId } = req.params;
	try {
		const data = await reviewService.getReviewById(reviewId);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};

export const getReviews: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = await reviewService.getReviews();
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};
