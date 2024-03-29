import { PrismaClient, User } from "@prisma/client";

import { comparePasswords, hashPassword } from "../utils/password";

import { CreateUserDTO } from "./dto/create";
import { LoginUserDTO } from "./dto/login";
import { IUserRepository } from "./service";
export class UserRepository implements IUserRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async register(user: CreateUserDTO): Promise<Partial<User>> {
		const { email, firstName, lastName, password } = user;
		const encodedPassword = await hashPassword(password);
		return await this.prisma.user.create({
			data: {
				email: email,
				firstName: firstName,
				lastName: lastName,
				password: encodedPassword,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
			},
		});
	}
	async login(user: LoginUserDTO): Promise<User | null> {
		const { email, password } = user;
		const foundUser = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (foundUser && (await comparePasswords(password, foundUser.password))) {
			return foundUser;
		}
		return null;
	}
	async getUserByEmail(email: string): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});
	}
	// async refreshToken();
	async deleteUser(email: string): Promise<User | null> {
		return await this.prisma.user.delete({
			where: {
				email: email,
			},
		});
	}
}
