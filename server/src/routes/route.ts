import { Router } from "express";

import { db } from "../../lib/prisma.db";
import { movieRouter } from "../movie/route";
import { reviewRouter } from "../review/route";
import { userRouter } from "../user/route";
const router = Router();

router.get("/", async (req, res) => {
	function getUsers(): Array<any> {
		return [
			{
				email: "johnadams29@movie.app",
				firstName: "john",
				lastName: "adams",
				password: "test@Password",
			},
			{
				email: "mikejason84@movie.app",
				firstName: "mike",
				lastName: "jason",
				password: "test@Password",
			}
		];
	}
	
	function getMovies(): Array<any> {
		return [
			{
				title: "Oppenheimer",
				poster:
					"https://en.wikipedia.org/wiki/Oppenheimer_(film)#/media/File:Oppenheimer_(film).jpg",
				trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
			},
			{
				title: "Napoleon",
				poster:
					"https://en.wikipedia.org/wiki/Napoleon_(2023_film)#/media/File:Napoleon_Film_poster.jpg",
				trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
				description:
					"A look at the military commander's origins and his swift, ruthless climb to emperor, viewed through the prism of his addictive and often volatile relationship with his wife and one true love, Josephine",
			},
			{
				title: "The Last Kingdom Seven Kings Must Die",
				poster: "https://upload.wikimedia.org/wikipedia/en/1/15/Last_kingdom_seven_kings_must_die.png",
				trailer: "https://www.youtube.com/watch?v=eqCYw_o5lng",
				description:
					"Uhtred of Bebbanburg is given a task by King Edward to kill the seven kings who have formed an alliance against him. Uhtred is forced to face the greatest enemy he has ever encountered, and the fate of Wessex hangs in the balance.",
			}
		];
	}
	
	async function seed() {
		console.log("Seeding database...");
	
		const users = getUsers();
		users.forEach(async (user) => {
			console.log("Seeding users...");
			await db.user.create({
				data: {
					...user,
				},
			});
		});
		const testUser = await db.user.findFirst({
			where: {
				email: "johnadams29@movie.app"
			}
		});
		const movies = getMovies();
		console.log("Seeding movies...");
		if (!testUser) throw new Error("User not found");
		movies.forEach(async (movie) => {
			await db.movie.create({
				data: {
					title: movie.title,
					poster: movie.poster,
					trailer: movie.trailer,
					description: movie.description,
					userId: testUser.id
				},
			});
		});
	}
	seed();
	res.send("Database seeded");
	
});
router.use(userRouter);
router.use(movieRouter);
router.use(reviewRouter);

export { router as mainRouter };
