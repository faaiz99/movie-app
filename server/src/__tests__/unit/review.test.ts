import { Review } from "@prisma/client";

import { ReviewRepository } from "../../review/repository";
import * as reviewService from "../../review/service";
import { CreateReviewDTO, UpdateReviewDTO } from "../../review/service";

jest.mock("../../review/repository");

describe("Review Service", () => {
	let mockReview: Review;
	beforeEach(() => {
		mockReview = {
			id: "1",
			title: "Test Movie",
			description: "This is a test movie",
			rating: 3,
			userId: "123",
			movieId: "456",
			updatedAt: new Date(),
			createdAt: new Date(),
		};

		jest.clearAllMocks();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("createReview", () => {
		it("should create a review", async () => {
			const createReviewDTO: CreateReviewDTO = {
				id: "",
				title: "test revieew",
				description: "test description",
				rating: 4,
				userId: "123",
			};

			const expectedReview: Review = {
				...createReviewDTO,
				id: "2",
				movieId: "3",
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			jest
				.spyOn(reviewService, "createReview")
				.mockResolvedValue(expectedReview);

			const mockMovieId = "123";

			const result = await reviewService.createReview(mockReview, mockMovieId);

			expect(reviewService.createReview).toHaveBeenCalledWith(
				mockReview,
				mockMovieId
			);
			expect(result).toEqual(expectedReview);
		});
	});

	describe("getReviews", () => {
		it("should get all reviews", async () => {
			const mockReviews: Review[] = [mockReview];
			const mockMovieId = "12345";
			jest.spyOn(reviewService, "getReviews").mockResolvedValue(mockReviews);

			const result = await reviewService.getReviews(mockMovieId);

			expect(reviewService.getReviews).toHaveBeenCalled();
			expect(result).toEqual(mockReviews);
		});
	});

	describe("getReviewById", () => {
		it("should get a review by ID", async () => {
			const mockReviewId = "123";
			jest.spyOn(reviewService, "getReviewById").mockResolvedValue(mockReview);
			const result = await reviewService.getReviewById(mockReviewId);

			expect(reviewService.getReviewById).toHaveBeenCalledWith(mockReviewId);
			expect(result).toEqual(mockReview);
		});
	});

	describe("deleteReviewById", () => {
		it("should delete a review by ID", async () => {
			const mockReviewId = "123";

			jest
				.spyOn(reviewService, "deleteReviewById")
			//@ts-ignore
				.mockResolvedValue(mockReview);

			const result = await reviewService.deleteReviewById(mockReviewId);
			expect(reviewService.deleteReviewById).toHaveBeenCalledWith(mockReviewId);
			expect(result).toEqual(mockReview);
		});
	});

	describe("updateReviewById", () => {
		it("should update a review by ID", async () => {
			const mockReviewId = "123";
			const mockReview: UpdateReviewDTO = {
				id: "2",
				title: "test review",
				description: "test description",
				rating: 4,
			};
			jest
				.spyOn(reviewService, "updateReviewById")
			//@ts-ignore
				.mockResolvedValue(mockReview);

			const result = await reviewService.updateReviewById(
				mockReviewId,
				mockReview
			);
			expect(reviewService.updateReviewById).toHaveBeenCalledWith(
				mockReviewId,
				mockReview
			);
			expect(result).toEqual(mockReview);
		});
	});
});
