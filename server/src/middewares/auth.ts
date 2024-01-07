import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/auth";
export const validateToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}
	const tokenString = token.split(" ")[1];
	const decoded = verifyToken(tokenString);
	if (!decoded) {
		return res.status(401).send({ message: "Unauthorized!" });
	}
	next();
};
