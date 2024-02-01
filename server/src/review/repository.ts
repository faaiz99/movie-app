import { PrismaClient, Review } from "@prisma/client";
import { IReviewRepository } from "./service";

export class ReviewRepository implements IReviewRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getAll(movieId:string): Promise<Review[]> {
		return await this.prisma.review.findMany({
			where :{
				movieId:movieId
			},
		});
	}
	async getById(id: string): Promise<Review | null> {
		return await this.prisma.review.findUnique({
			where: {
				id: id,
			},
		});
	}
	async create(review: Partial<Review>, movieId: string): Promise<Review> {
		const { title, rating, description, userId } = review;
		return await this.prisma.review.create({
			data: {
				title: title,
				rating: rating,
				description: description,
				userId: userId,
				movieId: movieId,
			},
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
