import { PrismaClient, Movie } from "@prisma/client";
import { CreateMovieDTO, IMovieRepository } from "./service";

export class MovieRepository implements IMovieRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getMoviesByCharactersInTheirName(characters: string): Promise<Movie[]> {
		return await this.prisma.movie.findMany({
			where:{
				title:{
					contains: characters,
				},
			},
	
		});
	}
	async getMoviesWithMostReviews(): Promise<Movie[]> {
		return await this.prisma.movie.findMany({
			include:{
				reviews: true,
			},
			orderBy:{
				reviews:{
					_count: "desc",
				}
			},
		});
	}
	async getAll(): Promise<Movie[]> {
		return await this.prisma.movie.findMany();
	}
	async getById(id: string): Promise<Movie | null> {
		return await this.prisma.movie.findUnique({
			where: {
				id: id,
			},
			include:{
				reviews: {
					include:{
						user: {
							select:{
								id: true,
								firstName: true,
								lastName: true,
								email: true,
							}
						}
					}
				},
				user: {
					select:{
						id: true,
						firstName: true,
						lastName: true,
						email: true,
					}
				},
			}
		});
	}
	async create(movie: CreateMovieDTO): Promise<Movie> {
		const { title, description, poster, trailer, userId } = movie;
		return await this.prisma.movie.create({
			data: {
				title: title,
				description: description,
				poster: poster,
				trailer: trailer,
				userId: userId,
			}
		});
	}
	async updatebyId(id: string, movie: Partial<Movie>): Promise<Movie> {
		return await this.prisma.movie.update({
			where: {
				id: id,
			},
			data: movie,
		});
	}
	async deletebyId(id: string): Promise<void> {
		await this.prisma.movie.delete({
			where: {
				id: id,
			},
		});
	}

}
