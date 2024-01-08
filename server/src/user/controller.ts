import { Request, Response, RequestHandler, NextFunction } from "express";
import * as userService from "./service";
import { handleError } from "../middewares/error";
import { handleResponse } from "../utils/response";
import { validationResult } from "express-validator";

export const register: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleResponse(res, 422, errors.array());
	} else {
		try {
			const data = await userService.register(req.body);
			handleResponse(res, 201, data);
		} catch (error:any) {
			error.statusCode = 409; 
			handleError(error, res, next);
		}
	}
};

export const login: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return handleResponse(res, 422, errors.array());
	} else {
		try {
			const data = await userService.login(req.body);
			handleResponse(res, 200, data);
		} catch (error:any) {
			error.statusCode = 401; 
			handleError(error, res, next);
		}
	}
};

export const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return handleResponse(res, 422, errors.array());
	}
	else {
		const { emailId } = req.params;
		try {
			const data = await userService.deleteUser(emailId);
			handleResponse(res, 200, data);
		} catch (error) {
			handleError(error, res, next);
		}
	}
	
};

export const refreshToken: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await userService.refreshToken(req.body);
		handleResponse(res, 200, data);
	} catch (error) {
		handleError(error, res, next);
	}
};
