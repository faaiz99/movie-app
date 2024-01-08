import { db } from "../lib/prisma.db";

// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();
type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type Movie = {
  title: string;
  poster: string;
  trailer: string;
  description: string;
};

type Review = {
  title: string;
  description: string;
  rating: number;
};

function getUsers(): Array<User> {
	return [
		{
			email: "john_adams@movie.app",
			firstName: "John",
			lastName: "Adams",
			password: "admin",
		},
		{
			email: "charles_nick@movie.app",
			firstName: "Charles",
			lastName: "Nick",
			password: "admin",
		},
	];
}

// function getReviews(): Array<Review> {
// 	return [
// 		{
// 			title: "Good Movie",
// 			description: "This is a good movie",
// 			rating: 4,
// 		},
// 		{
// 			title: "Bad Movie",
// 			description: "This is a bad movie",
// 			rating: 1,
// 		},
// 	];
// }

// function getMovies(): Array<Movie> {
// 	return [
// 		{
// 			title: "Oppenheimer",
// 			poster:
//         "https://en.wikipedia.org/wiki/Oppenheimer_(film)#/media/File:Oppenheimer_(film).jpg",
// 			trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
// 			description:
//         "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
// 		},
// 		{
// 			title: "Napoleon",
// 			poster:
//         "https://en.wikipedia.org/wiki/Napoleon_(2023_film)#/media/File:Napoleon_Film_poster.jpg",
// 			trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
// 			description:
//         "A look at the military commander's origins and his swift, ruthless climb to emperor, viewed through the prism of his addictive and often volatile relationship with his wife and one true love, Josephine",
// 		},
// 	];
// }

async function seed() {
	await Promise.all(
		getUsers().map((person) => {
			db.user.create({
				data: {
					firstName: person.firstName,
					lastName: person.lastName,
					email: person.email,
					password: person.password,
				},
			});
		})
	);
	// const person = await db.user.findFirst({
	// 	where: {
	// 		email: "john_adams@movie.app"
	// 	}
	// });
	// await Promise.all(
	// 	getMovies().map(movie => {
	// 		const { title, poster, trailer, description } = movie;
	// 		db.movie.create({
	// 			data: {
	// 				title,
	// 				poster,
	// 				trailer,
	// 				description,
	// 				user: {
	// 					connect : {
	// 						id: person?.id
	// 					}
	// 				},
	// 			}
	// 		});
	// 	})
	// );
	// const movies = await db.movie.findFirst({
	// 	where: {
	// 		title: "Oppenheimer"
	// 	}
	// });
	// const user = await db.user.findFirst({
	// 	where :{
	// 		email: "john_adams@movie.app"
	// 	}
	// });
	// await Promise.all(
	// 	getReviews().map(review => {
	// 		const { title, description, rating } = review;
	// 		db.review.create({
	// 			data: {
	// 				title,
	// 				description,
	// 				rating,
	// 				movie: {
	// 					connect: {
	// 						id: movies?.id
	// 					}
	// 				},
	// 				user: {
	// 					connect: {
	// 						id: user?.id
	// 					}
	// 				}
	// 			}
	// 		}).then((res) => {
	// 			console.log("res", res);
	// 		});

	// 	})
	// );
	// const reviews = await db.review.findMany();
	// const movies = await db.movie.findMany();
	// const users = await db.user.findMany();

	// console.log("users", users);
	// console.log("movies", movies);
	// console.log("reviews", reviews);
}

seed();
