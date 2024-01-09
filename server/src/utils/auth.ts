import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

type Payload = {
  id: string;
};

export const createToken = (payload: Payload) => {
	if (!secret) {
		throw new Error("JWT secret is not defined");
	}
	return jwt.sign(payload, secret, { expiresIn: "1h", algorithm: "HS256" });
};

export const verifyToken = (token: string) => {
	if (!secret) throw new Error("JWT secret is not defined");
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		throw new Error("Invalid token");
	}
};
