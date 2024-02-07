/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
export const handleError = (
	error: any,
	res: Response,
	next: NextFunction
): void => {
	const statusCode = error.statusCode || 500;
	let message = error.message || "Internal Server Error";
	if (error instanceof Error) {
		res.status(statusCode).json({
			status: "error",
			message: message,
			stack: process.env.NODE_ENV === "development" ? error.stack : {},
		});
	}
	// If the error is not an instance of Error, create a new Error object
	const errorObject = new Error("Internal Server Error");
	message = errorObject.message || "Internal Server Error";
	res.status(statusCode).json({
		status: "error",
		message: message,
		stack: process.env.NODE_ENV === "development" ? errorObject.stack : {},
	});

	//next(error as Error);
};
