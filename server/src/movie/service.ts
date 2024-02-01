import { Movie } from "@prisma/client";
import { MovieRepository } from "./repository";
import { db } from "../../lib/prisma.db";
import { CreateMovieDTO } from "./dto/create";
import { UpdateMovieDTO } from "./dto/update";




export interface IMovieRepository {
  getMovies(): Promise<Movie[]>;
  getById(movieId: string): Promise<Movie | null>;
  create(movie: Partial<Movie>): Promise<Movie>;
  updateById(movieId: string, movie: Partial<Movie>): Promise<Movie>;
  deleteById(movieId: string): Promise<void>;
  getMoviesWithMostReviews(): Promise<Movie[]>;
  getMoviesByCharactersInTheirName(characters: string): Promise<Movie[]>;
}

const movieRepository = new MovieRepository(db);

export const getMoviesByCharactersInTheirName = async (characters: string) => {
	return await movieRepository.getMoviesByCharactersInTheirName(characters);
};

export const getMoviesWithMostReviews = async () => {
	return await movieRepository.getMoviesWithMostReviews();
};

export const createMovie = async (movie: CreateMovieDTO) => {
	const movieDTO = new CreateMovieDTO();
	movieDTO.title = movie.title;
	movieDTO.description = movie.description;
	movieDTO.poster = movie.poster;
	movieDTO.trailer = movie.trailer;
	movieDTO.userId = movie.userId;

	return await movieRepository.create(movieDTO);
};

export const getMovies = async () => {
	return await movieRepository.getMovies();
};

export const getMovieById = async (movieId: string) => {
	return await movieRepository.getById(movieId);
};

export const deleteMovieById = async (movieId: string) => {
	return await movieRepository.deleteById(movieId);
};

export const updateMovieById = async (
	movieId: string,
	movie: UpdateMovieDTO
) => {
	const movieDTO = new UpdateMovieDTO();
	movieDTO.title = movie.title;
	movieDTO.description = movie.description;
	movieDTO.poster = movie.poster;
	movieDTO.trailer = movie.trailer;

	return await movieRepository.updateById(movieId, movieDTO);
};
