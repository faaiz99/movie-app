import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./service";
import { CreateUserDTO, LoginUserDTO } from "./service";
import { comparePasswords, hashPassword } from "../utils/password";
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
				id:true,
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
