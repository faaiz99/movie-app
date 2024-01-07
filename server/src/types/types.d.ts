import { User, Movie, Review } from "@prisma/client";

export interface IUserRepository {
  register(user: Partial<User>): Promise<User>;
  login(user: Partial<User>): Promise<User>;
  refreshToken(user: Partial<User>): Promise<User>;
}

export interface IMovieRepository {
  getAll(): Promise<Movie[]>;
  getById(movieId: string): Promise<Movie | null>;
  create(movie: CreateMovieDTO): Promise<Movie>;
  updatebyId(movieId: string, movie: Partial<Movie>): Promise<Movie>;
  deletebyId(movieId: string): Promise<void>;
}

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  getById(reviewId: string): Promise<Review | null>;
  create(review: CreateReviewDTO): Promise<Review>;
  updatebyId(reviewId: string, review: Partial<Review>): Promise<Review>;
  deletebyId(reviewId: string): Promise<void>;
}

export class CreateMovieDTO {
	id: string;
	title: string;
	description: string;
	poster: string;
	trailer: string;
	userId: string;
}

export class UpdateMovieDTO {
	id?: string;
	title?: string;
	description?: string;
	poster?: string;
	trailer?: string;
}

export class CreateReviewDTO {
	id?: string;
	title: string;
	rating: number;
	description: string;
	movieId: string;
	userId: string;
}

export class UpdateReviewDTO {
	id?: string;
	title?: string;
	rating?: number;
	description?: string;
}
