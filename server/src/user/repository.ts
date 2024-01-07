import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./types";

export class UserRepository implements IUserRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async register();
	async login();
	async refreshToken();
}
