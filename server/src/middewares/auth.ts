import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/auth";
import { handleError } from "./error";
export const validateToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res
			.status(403)
			.send({ status: false, message: "No token provided!" });
	}
	const tokenString = token.split(" ")[1];
	try {
		const decoded = verifyToken(tokenString);
		if (!decoded) {
			return res.status(401).send({
				status: false,
				message: "Unauthorized! Please Login Again",
			});
		}
		next();
	} catch (error: any) {
		error.statusCode = 401;
		error.message = "Invalid Token";
		handleError(error, res, next);
	}
};
