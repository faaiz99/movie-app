import { User } from "@prisma/client";

import { db } from "../../lib/prisma.db";
import { createToken } from "../utils/auth";

import { CreateUserDTO } from "./dto/create";
import { LoginUserDTO } from "./dto/login";
import { UserRepository } from "./repository";

export interface IUserRepository {
  register(user: Partial<User>): Promise<Partial<User>>;
  login(user: Partial<User>): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  deleteUser(email: string): Promise<User | null>;
}

const userRepository = new UserRepository(db);

export const login = async (userData: LoginUserDTO) => {
	const loginUserDTO = new LoginUserDTO();
	loginUserDTO.email = userData.email;
	loginUserDTO.password = userData.password;

	const authenticatedUser = await userRepository.login(loginUserDTO);
	if (!authenticatedUser) {
		throw new Error(
			`User not found with email ${loginUserDTO.email} or Password is incorrect`
		);
	}
	//generate token
	const token = createToken({ id: authenticatedUser.id });
	// return user information along with auth token
	const user = {
		id: authenticatedUser.id,
		firstName: authenticatedUser.firstName,
		lastName: authenticatedUser.lastName,
		email: authenticatedUser.email,
	};
	return { token, user };
};

export const register = async (userData: CreateUserDTO) => {
	const registerUserDTO = new CreateUserDTO();
	registerUserDTO.firstName = userData.firstName;
	registerUserDTO.lastName = userData.lastName;
	registerUserDTO.email = userData.email;
	registerUserDTO.password = userData.password;

	const userExists = await userRepository.getUserByEmail(registerUserDTO.email);
	if (!userExists) {
		const newUser = await userRepository.register(registerUserDTO);
		return newUser;
	}
	throw new Error(`User already exists with email ${registerUserDTO.email}`);
};

export const deleteUser = async (email: string) => {
	const user = await userRepository.getUserByEmail(email);
	if (!user) {
		throw new Error(`User not found with email ${email}`);
	}
	const deletedUser = await userRepository.deleteUser(email);
	return deletedUser;
};
