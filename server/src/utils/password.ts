import bcrypt from "bcrypt";

// Ideally this should come from an environment variable
const salt: number = parseInt(process.env.SALT || "10");

export const comparePasswords = async (
	password: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, salt);
};
