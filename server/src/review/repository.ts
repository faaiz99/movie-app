import { PrismaClient, Review } from "@prisma/client";
import { CreateReviewDTO, IReviewRepository } from "../types/types.js";

export class ReviewRepository implements IReviewRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getAll(): Promise<Review[]> {
		return await this.prisma.review.findMany();
	}
	async getById(id: string): Promise<Review | null> {
		return await this.prisma.review.findUnique({
			where: {
				id: id,
			},
		});
	}
	async create(review: CreateReviewDTO): Promise<Review> {
		return await this.prisma.review.create({
			data: review,
		});
	}
	async updatebyId(id: string, review: Partial<Review>): Promise<Review> {
		return await this.prisma.review.update({
			where: {
				id: id,
			},
			data: review,
		});
	}
	async deletebyId(id: string): Promise<void> {
		await this.prisma.review.delete({
			where: {
				id: id,
			},
		});
	}
}
