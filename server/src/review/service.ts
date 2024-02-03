import { Review } from "@prisma/client";

import { db } from "../../lib/prisma.db";

import { CreateReviewDTO } from "./dto/create";
import { UpdateReviewDTO } from "./dto/update";
import { ReviewRepository } from "./repository";

export interface IReviewRepository {
  getAll(movieId: string): Promise<Review[]>;
  getById(reviewId: string): Promise<Review | null>;
  create(review: CreateReviewDTO, movieId: string): Promise<Review>;
  updatebyId(reviewId: string, review: Partial<Review>): Promise<Review>;
  deletebyId(reviewId: string): Promise<void>;
}

const reviewRepository = new ReviewRepository(db);

export const createReview = async (
	review: CreateReviewDTO,
	movieId: string
) => {
	const reviewDTO = new CreateReviewDTO();
	reviewDTO.rating = review.rating;
	reviewDTO.title = review.title;
	reviewDTO.description = review.description;
	reviewDTO.userId = review.userId;

	return await reviewRepository.create(reviewDTO, movieId);
};

export const getReviews = async (movieId: string) => {
	return await reviewRepository.getAll(movieId);
};

export const getReviewById = async (reviewId: string) => {
	return await reviewRepository.getById(reviewId);
};

export const deleteReviewById = async (reviewId: string) => {
	return await reviewRepository.deletebyId(reviewId);
};

export const updateReviewById = async (
	reviewId: string,
	review: UpdateReviewDTO
) => {
	const reviewDTO = new UpdateReviewDTO();
	reviewDTO.rating = review.rating;
	reviewDTO.title = review.title;
	reviewDTO.description = review.description;
	reviewDTO.userId = review.userId;
	reviewDTO.movieId = review.movieId;

	return await reviewRepository.updatebyId(reviewId, reviewDTO);
};
