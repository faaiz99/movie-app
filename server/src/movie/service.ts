import { PrismaClient, Movie } from "@prisma/client";
import { MovieRepository } from "./repository";

export class CreateMovieDTO {
	id: string;
	title: string;
	description: string;
	poster: string;
	trailer: string;
	userId: string;

	constructor() {
		this.id = "";
		this.title = "";
		this.description = "";
		this.poster = "";
		this.trailer = "";
		this.userId = "";
	}
}

export class UpdateMovieDTO {
	id?: string;
	title?: string;
	description?: string;
	poster?: string;
	trailer?: string;
}

export interface IMovieRepository {
	getAll(): Promise<Movie[]>;
	getById(movieId: string): Promise<Movie | null>;
	create(movie: CreateMovieDTO): Promise<Movie>;
	updatebyId(movieId: string, movie: Partial<Movie>): Promise<Movie>;
	deletebyId(movieId: string): Promise<void>;
}

const prisma = new PrismaClient();
const movieRepository = new MovieRepository(prisma);

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
	return await movieRepository.getAll();
};

export const getMovieById = async (movieId: string) => {
	return await movieRepository.getById(movieId);
};

export const deleteMovieById = async (movieId: string) => {
	return await movieRepository.deletebyId(movieId);
};

export const updateMovieById = async (
	movieId: string,
	movie: UpdateMovieDTO,
) => {
	const movieDTO = new UpdateMovieDTO();
	movieDTO.title = movie.title;
	movieDTO.description = movie.description;
	movieDTO.poster = movie.poster;
	movieDTO.trailer = movie.trailer;

	return await movieRepository.updatebyId(movieId, movieDTO);
};
