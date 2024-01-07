import { PrismaClient, Review } from "@prisma/client";
import { ReviewRepository } from "./repository";

export class CreateReviewDTO {
	id?: string;
	title: string;
	rating: number;
	description: string;
	movieId: string;
	userId: string;

	constructor() {
		this.id = "";
		this.title = "";
		this.rating = 0;
		this.description = "";
		this.movieId = "";
		this.userId = "";
	}
}

export class UpdateReviewDTO {
	id?: string;
	title?: string;
	rating?: number;
	description?: string;
}

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  getById(reviewId: string): Promise<Review | null>;
  create(review: CreateReviewDTO): Promise<Review>;
  updatebyId(reviewId: string, review: Partial<Review>): Promise<Review>;
  deletebyId(reviewId: string): Promise<void>;
}

const prisma = new PrismaClient();
const reviewRepository = new ReviewRepository(prisma);

export const createReview = async (review: CreateReviewDTO) => {
	const reviewDTO = new CreateReviewDTO();
	reviewDTO.rating = review.rating;
	reviewDTO.title = review.title;
	reviewDTO.description = review.description;
	reviewDTO.userId = review.userId;
	reviewDTO.movieId = review.movieId;

	return await reviewRepository.create(reviewDTO);
};

export const getReviews = async () => {
	return await reviewRepository.getAll();
};

export const getReviewById = async (reviewId: string) => {
	return await reviewRepository.getById(reviewId);
};

export const deleteReviewById = async (reviewId: string) => {
	return await reviewRepository.deletebyId(reviewId);
};

export const updateReviewById = async (
	reviewId: string,
	review: UpdateReviewDTO,
) => {
	const reviewDTO = new UpdateReviewDTO();
	reviewDTO.rating = review.rating;
	reviewDTO.title = review.title;
	reviewDTO.description = review.description;

	return await reviewRepository.updatebyId(reviewId, reviewDTO);
};
