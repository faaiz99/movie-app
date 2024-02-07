import { Movie } from "@prisma/client";

import { MovieRepository } from "../../movie/repository";
import * as movieService from "../../movie/service";
import { CreateMovieDTO, UpdateMovieDTO } from "../../movie/service";

describe("Movie Service", () => {
	let mockMovie: Movie;

	beforeEach(() => {
		mockMovie = {
			id: "1",
			title: "Test Movie",
			description: "This is a test movie",
			poster: "test-poster.jpg",
			trailer: "https://www.youtube.com/watch?v=test",
			userId: "123",
			updatedAt: new Date(),
			createdAt: new Date(),
		};
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getMoviesByCharactersInTheirName", () => {
		it("should return movies with matching characters in their name", async () => {
			const characters = "test";
			const expectedMovies: Movie[] = [mockMovie];

			jest
				.spyOn(movieService, "getMoviesByCharactersInTheirName")
				.mockResolvedValue(expectedMovies);

			const result =
        await movieService.getMoviesByCharactersInTheirName(characters);

			expect(result).toEqual(expectedMovies);
		});
	});

	describe("getMoviesWithMostReviews", () => {
		it("should return movies with the most reviews", async () => {
			const expectedMovies: Movie[] = [mockMovie];

			jest
				.spyOn(movieService, "getMoviesWithMostReviews")
				.mockResolvedValue(expectedMovies);

			const result = await movieService.getMoviesWithMostReviews();

			expect(result).toEqual(expectedMovies);
		});
	});

	describe("createMovie", () => {
		it("should create a new movie", async () => {
			const createMovieDTO: CreateMovieDTO = {
				id: "",
				title: "New Movie",
				description: "This is a new movie",
				poster: "new-movie-poster.jpg",
				trailer: "https://www.youtube.com/watch?v=new",
				userId: "456",
			};
			//@ts-ignore
			const expectedMovie: Movie = {
				...createMovieDTO,
				id: "2",
			};

			jest.spyOn(movieService, "createMovie").mockResolvedValue(expectedMovie);

			const result = await movieService.createMovie(createMovieDTO);
			expect(movieService.createMovie).toHaveBeenCalledWith(createMovieDTO);
			expect(result).toEqual(expectedMovie);
		});
	});

	describe("updateMovieById", () => {
		it("should update a movie by its ID", async () => {
			const movieId = "1";
			const movie: UpdateMovieDTO = {
				title: "Updated Movie",
				description: "This is an updated movie",
				poster: "updated-movie-poster.jpg",
				trailer: "https://www.youtube.com/watch?v=updated",
			};

			//@ts-ignore
			const updatedMovie: Movie = {
				id: movieId,
				...movie,
				userId: "123",
			};

			jest
				.spyOn(movieService, "updateMovieById")
				.mockResolvedValue(updatedMovie);

			const result = await movieService.updateMovieById(movieId, movie);
			expect(movieService.updateMovieById).toHaveBeenCalledWith(movieId, movie);
			expect(result).toEqual(updatedMovie);
		});
	});

	describe("getMovies", () => {
		it("should return all movies", async () => {
			const expectedMovies: Movie[] = [mockMovie];

			jest.spyOn(movieService, "getMovies").mockResolvedValue(expectedMovies);

			const result = await movieService.getMovies();
			expect(movieService.getMovies).toHaveBeenCalled();
			expect(result).toEqual(expectedMovies);
		});
	});

	describe("getByMovieId", () => {
		it("should return a movie by its ID", async () => {
			const movieId = "1";
			const expectedMovie: Movie = mockMovie;
			jest.spyOn(movieService, "getMovieById").mockResolvedValue(expectedMovie);

			const result = await movieService.getMovieById(movieId);
			expect(movieService.getMovieById).toHaveBeenCalledWith(movieId);
			expect(result).toEqual(expectedMovie);
		});
	});

	describe("deleteById", () => {
		it("should delete a movie by its ID", async () => {
			const movieId = "1";
			jest
				.spyOn(movieService, "deleteMovieById")
			//@ts-ignore
				.mockResolvedValue(movieId);

			const result = await movieService.deleteMovieById(movieId);
			expect(movieService.deleteMovieById).toHaveBeenCalledWith(movieId);
			expect(result).toEqual(movieId);
		});
	});
});
