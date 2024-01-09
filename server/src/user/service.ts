import { User } from "@prisma/client";
import { UserRepository } from "./repository";
import { createToken } from "../utils/auth";
import { db } from "../../lib/prisma.db";
export class CreateUserDTO {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;

	constructor() {
		this.id = "";
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.password = "";
	}
}
export class LoginUserDTO {
	email: string;
	password: string;
	constructor() {
		this.email = "";
		this.password = "";
	}
}

export interface IUserRepository {
  register(user: Partial<User>): Promise<Partial<User>>;
  login(user: Partial<User>): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  deleteUser(email: string): Promise<User | null>;
}

const userRepository = new UserRepository(db);
/**
 * Get user by email
 * compare the passowrd by decrypting the password
 * if the email is null or undefined, throw an error
 * if the password is correct, generate a token
 * return the token
 * if the password is incorrect, throw an error
 */
export const login = async (user: LoginUserDTO) => {
	const loginUserDTO = new LoginUserDTO();
	loginUserDTO.email = user.email;
	loginUserDTO.password = user.password;

	const authenticatedUser = await userRepository.login(loginUserDTO);
	if (!authenticatedUser) {
		throw new Error(
			`User not found with email ${loginUserDTO.email} or Password is incorrect`
		);
	} else {
		//generate token
		const token = createToken({ id: authenticatedUser.id });
		// probably return user information along with auth token
		const user = {
			id: authenticatedUser.id,
			firstName: authenticatedUser.firstName,
			lastName: authenticatedUser.lastName,
			email: authenticatedUser.email,
		};
		return { token, user };
	}
};

/**
 * Get user by email
 * if the email is null or undefined, throw an error
 * if the email is not null or undefined, throw an error
 * create a new user
 * return the user
 * ideally we should tell the user to login by redirecting them
 * on the frontend is registration is successfull
 */

export const register = async (user: CreateUserDTO) => {
	const registerUserDTO = new CreateUserDTO();
	registerUserDTO.firstName = user.firstName;
	registerUserDTO.lastName = user.lastName;
	registerUserDTO.email = user.email;
	registerUserDTO.password = user.password;

	const userExists = await userRepository.getUserByEmail(registerUserDTO.email);
	if (!userExists) {
		const newUser = await userRepository.register(registerUserDTO);
		return newUser;
	} else {
		throw new Error(`User already exists with email ${registerUserDTO.email}`);
	}
};
/**
 * Get the user by token
 * the token is present in the request header
 * [Authorization] = 12233223
 * if the token is valid, generate a new token
 * return the new token
 * if the token is invalid, throw an error telling the user to login again
 */
export const refreshToken = async (token: string) => {
	return token;
};

export const deleteUser = async (email: string) => {
	const user = await userRepository.getUserByEmail(email);
	if (!user) {
		throw new Error(`User not found with email ${email}`);
	} else {
		const deletedUser = await userRepository.deleteUser(email);
		return deletedUser;
	}
};
