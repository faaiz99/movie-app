import request from "supertest";

import app from "../../app";

type ReviewPayload = {
  title: string;
  description: string;
  rating: number;
  userId?: string;
};

type MoviewPayload = {
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId?: string;
};

describe("Review - Controller", () => {
	let token: string;
	let reviewPayload: ReviewPayload;
	let moviePayload: MoviewPayload;
	let movieId: string;
	let reviewId: string;
	let userId: string;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};

	beforeEach(async () => {
		// create a test user
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		// save token and userId for later use
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;

		// Define and create test movie
		moviePayload = {
			title: `test-movie-title-${userId}`,
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(moviePayload);
		movieId = createTestMovie.body.id;
		// console.log("res", createTestMovie.body);
		// console.log("MovieId in Before",movieId);

		// Define and create test review
		reviewPayload = {
			title: "test-review-title",
			description: "test-movie-description",
			rating: 5,
			userId: userId,
		};
		const createTestReview = await request(app)
			.post(`/api/reviews/${movieId}`)
			.set("authorization", `Bearer ${token}`)
			.send(reviewPayload);
		reviewId = createTestReview.body.id;
	});
	afterEach(async () => {
		await request(app)
			.delete(`/api/reviews/${reviewId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Create Review for Movie", () => {
		it("POST api/reviews/movieId should return 201 OK with valid data", async () => {
			const response = await request(app)
				.post(`/api/reviews/${movieId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(201);
			expect(response.body.title).toEqual(reviewPayload.title);
			expect(response.body.rating).toEqual(reviewPayload.rating);
			expect(response.body.description).toEqual(reviewPayload.description);
			expect(response.body.userId).toEqual(reviewPayload.userId);
			expect(response.body.id).toBeTruthy();
		});
		it("POST api/reviews should return 403 No Token with missing auth header", async () => {
			const response = await request(app)
				.post(`/api/reviews/${movieId}`)
				.send(reviewPayload);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("POST api/reviews should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.post(`/api/reviews/${movieId}`)
				.set("authorization", `Bearer ${token}1`)
				.send(reviewPayload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("POST api/reviews/movieId should return 422 Unprocessable Content with incomplete data", async () => {
			const modifiedPayload: ReviewPayload = JSON.parse(
				JSON.stringify(reviewPayload)
			);
			delete modifiedPayload.userId;
			const response = await request(app)
				.post("/api/movies")
				.set("authorization", `Bearer ${token}`)
				.send(modifiedPayload);
			expect(response.status).toBe(422);
		});
	});
});

describe("Review - Controller", () => {
	let token: string;
	let reviewPayload: ReviewPayload;
	let moviePayload: MoviewPayload;
	let movieId: string;
	let reviewId: string;
	let userId: string;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};

	beforeEach(async () => {
		// create a test user
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		// save token and userId for later use
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;

		// Define and create test movie
		moviePayload = {
			title: `test-movie-title-${userId}`,
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(moviePayload);
		movieId = createTestMovie.body.id;

		// Define and create test review
		reviewPayload = {
			title: "test-review-title",
			description: "test-movie-description",
			rating: 5,
			userId: userId,
		};
		const createTestReview = await request(app)
			.post(`/api/reviews/${movieId}`)
			.set("authorization", `Bearer ${token}`)
			.send(reviewPayload);
		reviewId = createTestReview.body.id;
	});
	afterEach(async () => {
		await request(app)
			.delete(`/api/reviews/${reviewId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe.only("GET Reviews", () => {
		it("GET api/review/reviewId should return 403 No Token with missing auth header", async () => {
			const response = await request(app).get(`/api/review/${reviewId}`);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("GET api/review/reviewId should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.get(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}1`);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("GET api/review/reviewId should return 200 OK with valid data", async () => {
			const response = await request(app)
				.get(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body.title).toBe(reviewPayload.title);
			expect(response.body.description).toBe(reviewPayload.description);
			expect(response.body.rating).toBe(reviewPayload.rating);
			expect(response.body.userId).toBe(reviewPayload.userId);
		});
		it("GET api/review/reviewId should return 422 Unprocessable Content with missing reviewId", async () => {
			const modifiedReviewId = undefined;
			const response = await request(app)
				.get(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("GET api/review/reviewId should return 404 Review Not Found with mismatched ReviewId", async () => {
			const modifiedReviewId = "039dccf4-87d0-4a62-8d28-196e2aef0da9";
			const response = await request(app)
				.get(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Review Not Found");
		});
		it("GET api/reviews/movieId should return 200 OK with valid data", async () => {
			const response = await request(app)
				.get(`/api/reviews/${movieId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body.length).toBeGreaterThan(0);
		});
	});
});

describe("Review - Controller", () => {
	let token: string;
	let reviewPayload: ReviewPayload;
	let moviePayload: MoviewPayload;
	let movieId: string;
	let reviewId: string;
	let userId: string;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};

	beforeEach(async () => {
		// create a test user
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		// save token and userId for later use
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;

		// Define and create test movie
		moviePayload = {
			title: `test-movie-title-${userId}`,
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(moviePayload);
		movieId = createTestMovie.body.id;

		// Define and create test review
		reviewPayload = {
			title: "test-review-title",
			description: "test-movie-description",
			rating: 5,
			userId: userId,
		};
		const createTestReview = await request(app)
			.post(`/api/reviews/${movieId}`)
			.set("authorization", `Bearer ${token}`)
			.send(reviewPayload);
		reviewId = createTestReview.body.id;
	});
	afterEach(async () => {
		await request(app)
			.delete(`/api/review/${reviewId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("UPDATE Reviews", () => {
		it("POST api/review/reviewId should return 403 No Token with missing auth header", async () => {
			const response = await request(app)
				.post(`/api/review/${reviewId}`)
				.send(reviewPayload);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("POST api/review/reviewId should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.post(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}1`)
				.send(reviewPayload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("POST api/review/reviewId should return 200 OK with valid data", async () => {
			const response = await request(app)
				.get(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(200);
			expect(response.body.title).toBe(reviewPayload.title);
			expect(response.body.description).toBe(reviewPayload.description);
			expect(response.body.rating).toBe(reviewPayload.rating);
			expect(response.body.userId).toBe(reviewPayload.userId);
		});
		it("POST api/review/reviewId should return 422 Unprocessable Content with missing reviewId", async () => {
			const modifiedReviewId = undefined;
			const response = await request(app)
				.get(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("POST api/review/reviewId should return 404 Review Not Found with mismatched ReviewId", async () => {
			const modifiedReviewId = "039dccf4-87d0-4a62-8d28-196e2aef0da9";
			const response = await request(app)
				.get(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Review Not Found");
		});
	});
});

describe("Review - Controller", () => {
	let token: string;
	let reviewPayload: ReviewPayload;
	let moviePayload: MoviewPayload;
	let movieId: string;
	let reviewId: string;
	let userId: string;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};

	beforeEach(async () => {
		// create a test user
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		// save token and userId for later use
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;

		// Define and create test movie
		moviePayload = {
			title: `test-movie-title-${userId}`,
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(moviePayload);
		movieId = createTestMovie.body.id;

		// Define and create test review
		reviewPayload = {
			title: "test-review-title",
			description: "test-movie-description",
			rating: 5,
			userId: userId,
		};
		const createTestReview = await request(app)
			.post(`/api/reviews/${movieId}`)
			.set("authorization", `Bearer ${token}`)
			.send(reviewPayload);
		reviewId = createTestReview.body.id;
	});
	afterEach(async () => {
		await request(app)
			.delete(`/api/review/${reviewId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("DELETE Reviews", () => {
		it("DELETE api/review/reviewId should return 403 No Token with missing auth header", async () => {
			const response = await request(app)
				.delete(`/api/review/${reviewId}`)
				.send(reviewPayload);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("DELETE api/review/reviewId should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.delete(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}1`)
				.send(reviewPayload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("DELETE api/review/reviewId should return 200 OK with valid data", async () => {
			const response = await request(app)
				.delete(`/api/review/${reviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(200);
		});
		it("DELETE api/review/reviewId should return 422 Unprocessable Content with missing reviewId", async () => {
			const modifiedReviewId = undefined;
			const response = await request(app)
				.delete(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("DELETE api/review/reviewId should return 404 Review Not Found with mismatched ReviewId", async () => {
			const modifiedReviewId = "039dccf4-87d0-4a62-8d28-196e2aef0da9";
			const response = await request(app)
				.delete(`/api/review/${modifiedReviewId}`)
				.set("authorization", `Bearer ${token}`)
				.send(reviewPayload);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Review Not Found");
		});
	});
});
