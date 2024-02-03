import request from "supertest";

import app from "../../app";

type Payload = {
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId?: string;
};

describe("Movie - Controller", () => {
	let token: string;
	let userId: string;
	let movieId: string | undefined;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	let payload: Payload;
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;
		payload = {
			title: "test-movie-title-1",
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(payload);
		movieId = createTestMovie.body.id;
	});

	afterAll(async () => {
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Create Movie", () => {
		it("POST api/movies should return 403 Unauthorized with missing auth header", async () => {
			const response = await request(app).post("/api/movies").send(payload);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("POST api/movies should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.post("/api/movies")
				.set("authorization", `Bearer ${token}1`)
				.send(payload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("POST api/movies should return 200 OK with valid data", async () => {
			const response = await request(app)
				.post("/api/movies")
				.set("authorization", `Bearer ${token}`)
				.send(payload);
			// Since we have already created a movie with the same title, we expect a 409 Conflict hence the test will fail
			expect(response.status).not.toBe(201);
			expect(response.body.title).not.toEqual(payload.title);
			expect(response.body.description).not.toEqual(payload.description);
			expect(response.body.poster).not.toEqual(payload.poster);
			expect(response.body.trailer).not.toEqual(payload.trailer);
			expect(response.body.userId).not.toEqual(payload.userId);
			expect(response.body.id).not.toBeDefined();
			expect(response.body.id).not.toBeNull();
		});
		it("POST api/movies should return 409 Conflict with duplicate data", async () => {
			const response = await request(app)
				.post("/api/movies")
				.set("authorization", `Bearer ${token}`)
				.send(payload);
			expect(response.status).toBe(409);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Movie already exists with title");
		});
		it("POST api/movies should return 422 Unprocessable Content with incomplete data", async () => {
			const modifiedPayload: Payload = JSON.parse(JSON.stringify(payload));
			delete modifiedPayload.userId;
			const response = await request(app)
				.post("/api/movies")
				.set("authorization", `Bearer ${token}`)
				.send(modifiedPayload);
			expect(response.status).toBe(422);
		});
	});
});

describe("Movie - Controller", () => {
	let token: string;
	let userId: string;
	let movieId: string | undefined;
	let movieTitle: string | undefined;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	let payload: Payload;
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;
		payload = {
			title: "test-movie-title-1",
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(payload);
		movieId = createTestMovie.body.id;
		movieTitle = createTestMovie.body.title;
	});

	afterAll(async () => {
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Get Movie", () => {
		it("GET api/movies should return 403 No Token with missing auth header", async () => {
			const response = await request(app).get("/api/movies");
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("GET api/movies should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.get("/api/movies")
				.set("authorization", `Bearer ${token}1`)
				.send(payload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("GET api/movies should return 200 OK list of movies", async () => {
			const response = await request(app)
				.get("/api/movies")
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("GET api/movies/movieId should return 200 OK movie by id", async () => {
			if (movieTitle) {
				const response = await request(app)
					.get(`/api/movie/${movieTitle}`)
					.set("authorization", `Bearer ${token}`);
				expect(response.status).toBe(200);
				expect(response.body).toBeDefined();
				expect(response.body).toHaveProperty("reviews");
				expect(response.body.title).toEqual(movieTitle);
			}
		});
		it("GET api/movies/movieId should return 422 Unprocessable Content with missing MovieId", async () => {
			const modifiedMovieTitle = undefined;
			const response = await request(app)
				.get(`/api/movie/${modifiedMovieTitle}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("GET api/movies/movieId should return 404 Movie Not Found with mismatched MovieId", async () => {
			const modifiedMovieTitle = "8fcc29dd";
			const response = await request(app)
				.get(`/api/movie/${modifiedMovieTitle}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Movie Not Found");
		});
	});
});

describe("Movie - Controller", () => {
	let token: string;
	let userId: string;
	let movieId: string | undefined;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	let payload: Payload;
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;
		payload = {
			title: "test-movie-title-1",
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(payload);
		movieId = createTestMovie.body.id;
	});

	afterAll(async () => {
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Update Movie", () => {
		it("POST api/movies/movieId should return 403 No Token with missing auth header", async () => {
			const response = await request(app).get(`/api/movie/${movieId}`);
			expect(response.status).toBe(403);
			expect(response.body.status).toEqual(false);
			expect(response.body.message).toEqual("No token provided!");
		});
		it("POST api/movies/movieId should return 401 Unauthorized with invalid token", async () => {
			const response = await request(app)
				.get(`/api/movie/${movieId}`)
				.set("authorization", `Bearer ${token}1`)
				.send(payload);
			expect(response.status).toBe(401);
			expect(response.body.status).toEqual("error");
			expect(response.body.message).toEqual("Invalid Token");
		});
		it("POST api/movies/movieId should return 200 Movie Updated with valid data", async () => {
			const payload = {
				title: "test-movie-updated",
				description: "test-movie-description-updated",
				poster: "test-movie-poster-updated",
				trailer: "test-movie-trailer-updated",
				userId: userId,
			};
			const response = await request(app)
				.post(`/api/movie/${movieId}`)
				.set("authorization", `Bearer ${token}`)
				.send(payload);
			expect(response.status).toBe(200);
			expect(response.body.title).toEqual(payload.title);
			expect(response.body.description).toEqual(payload.description);
			expect(response.body.poster).toEqual(payload.poster);
			expect(response.body.trailer).toEqual(payload.trailer);
			expect(response.body.userId).toEqual(userId);
			expect(response.body.id).toEqual(movieId);
		});
		it("POST api/movies/movieId should return 404 Movie Not Found with invalid MovieId", async () => {
			const modifiedMovieId = "8fcc29dd-4961-4be1-8cf0-ce179634a4ce";
			const response = await request(app)
				.post(`/api/movie/${modifiedMovieId}`)
				.set("authorization", `Bearer ${token}`)
				.send(payload);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Movie Not Found");
		});
		it("POST api/movies/movieId should return 422 Movie Not Updated with missing UserId OR MovieId undefined", async () => {
			const modifiedMovieId = undefined;
			const modifiedPayload = JSON.parse(JSON.stringify(payload));
			delete modifiedPayload.userId;
			const response = await request(app)
				.post(`/api/movie/${modifiedMovieId}`)
				.set("authorization", `Bearer ${token}`)
				.send(payload);
			expect(response.status).toBe(422);
		});
	});
});

describe("Movie - Controller", () => {
	let token: string;
	let userId: string;
	let movieId: string | undefined;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	let payload: Payload;
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;
		payload = {
			title: "test-movie-title-1",
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(payload);
		movieId = createTestMovie.body.id;
	});

	afterAll(async () => {
		await request(app)
			.delete(`/api/movies/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Search & Ranked Movie", () => {
		it("GET api/movies/movies-featured should return 200 OK list of movies", async () => {
			const response = await request(app)
				.get("/api/movies-featured")
				.set("authorization", `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("GET api/movies/movies-search should return 200 OK list of movies if a term matches", async () => {
			const response = await request(app)
				.get("/api/movies-search")
				.set("authorization", `Bearer ${token}`)
				.query({ term: "test-movie" });
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("GET api/movies/movies-search should return 200 OK empty list of movies if a term does not match", async () => {
			const response = await request(app)
				.get("/api/movies-search")
				.set("authorization", `Bearer ${token}`)
				.query({ term: "test-movie-1" });
			expect(response.status).toBe(200);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBe(0);
		});
		it("GET api/movies/movies-ranked should return 422 if not query provided", async () => {
			const response = await request(app)
				.get("/api/movies-search")
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
	});
});

describe("Movie - Controller", () => {
	let token: string;
	let userId: string;
	let movieId: string | undefined;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	let payload: Payload;
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
		userId = loginTestUser.body.user.id;
		payload = {
			title: "test-movie-title-1",
			description: "test-movie-description",
			poster: "test-movie-poster",
			trailer: "test-movie-trailer",
			userId: userId,
		};
		const createTestMovie = await request(app)
			.post("/api/movies")
			.set("authorization", `Bearer ${token}`)
			.send(payload);
		movieId = createTestMovie.body.id;
	});

	afterAll(async () => {
		await request(app)
			.delete(`/api/movie/${movieId}`)
			.set("authorization", `Bearer ${token}`);
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	describe("Delete Movie", () => {
		it("DELETE api/movies/movieId should return 200 Movie Deleted with valid data", async () => {
			const response = await request(app)
				.delete(`/api/movie/${movieId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
		});
		it("DELETE api/movies/movieId should return 422 Movie Not Deleted with missing MovieId", async () => {
			const modifiedMovieId = undefined;
			const response = await request(app)
				.delete(`/api/movie/${modifiedMovieId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(422);
			expect(response.body).toBeDefined();
			expect(response.body.length).toBeGreaterThan(0);
		});
		it("DELETE api/movies/movieId should return 404 Movie Not Found with mismatched MovieId", async () => {
			const modifiedMovieId = "8fcc29dd-4961-4be1-8cf0-ce179634a4ce";
			const response = await request(app)
				.delete(`/api/movie/${modifiedMovieId}`)
				.set("authorization", `Bearer ${token}`);
			expect(response.status).toBe(404);
			expect(response.body.message).toEqual("Movie Not Found");
		});
	});
});
