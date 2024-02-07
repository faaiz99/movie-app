import jwt from "jsonwebtoken";

import { config } from "../config/env.config";
type Payload = {
  id: string;
};

export const createToken = (payload: Payload) => {
	const secret = config.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT secret is not defined");
	}
	return jwt.sign(payload, secret, { expiresIn: "1h", algorithm: "HS256" });
};

export const verifyToken = (token: string) => {
	const secret = config.JWT_SECRET;
	if (!secret) throw new Error("JWT secret is not defined");
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		throw new Error("Invalid token");
	}
};
