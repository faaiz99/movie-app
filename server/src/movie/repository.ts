import { PrismaClient, Movie } from "@prisma/client";
import { CreateMovieDTO, IMovieRepository } from "./service";

export class MovieRepository implements IMovieRepository {
	private prisma: PrismaClient;
	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getAll(): Promise<Movie[]> {
		return await this.prisma.movie.findMany();
	}
	async getById(id: string): Promise<Movie | null> {
		return await this.prisma.movie.findUnique({
			where: {
				id: id,
			},
		});
	}
	async create(movie: CreateMovieDTO): Promise<Movie> {
		return await this.prisma.movie.create({
			data: movie,
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
