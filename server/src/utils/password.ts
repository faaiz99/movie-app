import bcrypt from "bcryptjs";

import { config } from "../config/env.config";

const salt: number = parseInt(config.SALT || "10");

export const comparePasswords = async (
	password: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, salt);
};
