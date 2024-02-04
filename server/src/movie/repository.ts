import { Movie, PrismaClient } from "@prisma/client";

import { IMovieRepository } from "./service";
export class MovieRepository implements IMovieRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getMoviesByCharactersInTheirName(characters: string): Promise<Movie[]> {
		return await this.prisma.movie.findMany({
			where: {
				OR: [
					{
						title: {
							equals: characters,
							mode: "insensitive",
						},
					},
					{
						title: {
							contains: characters,
							mode: "insensitive",
						},
					},
					{
						title: {
							endsWith: characters,
							mode: "insensitive",
						},
					},
					{
						title: {
							startsWith: characters,
							mode: "insensitive",
						},
					},
				],
			},
		});
	}
	async getMoviesWithMostReviews(): Promise<Movie[]> {
		return await this.prisma.movie.findMany({
			include: {
				_count: {
					select: {
						reviews: true,
					},
				},
			},
			orderBy: {
				reviews: {
					_count: "desc",
				},
			},
		});
	}
	async getMovies(): Promise<Movie[]> {
		return await this.prisma.movie.findMany({});
	}
	async getByTitle(title: string): Promise<Movie | null> {
		return await this.prisma.movie.findUnique({
			where: {
				title: title,
			},
		});
	}
	async create(movie: Partial<Movie>): Promise<Movie> {
		const { title, description, poster, trailer, userId } = movie;
		return await this.prisma.movie.create({
			data: {
				title: title,
				description: description,
				poster: poster,
				trailer: trailer,
				userId: userId,
			},
		});
	}
	async updateById(id: string, movie: Partial<Movie>): Promise<Movie> {
		return await this.prisma.movie.update({
			where: {
				id: id,
			},
			data: movie,
		});
	}
	async deleteById(id: string): Promise<void> {
		await this.prisma.movie.delete({
			where: {
				id: id,
			},
		});
	}
}
