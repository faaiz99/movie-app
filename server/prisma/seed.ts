import { db } from "../lib/prisma.db";

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

db.$connect();

async function getUsers(): Promise<User[]> {
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
		},
	  ];
}

function getMovies(): Array<Movie> {
	return [
		{
			title: "Oppenheimer",
			poster:
        "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
			trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
			description:
        "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
		},
		{
			title: "Napoleon",
			poster:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Napoleon_Film_poster.jpg",
			trailer: "https://www.youtube.com/watch?v=OAZWXUkrjPc",
			description:
        "A look at the military commander's origins and his swift, ruthless climb to emperor, viewed through the prism of his addictive and often volatile relationship with his wife and one true love, Josephine",
		},
		{
			title: "The Last Kingdom Seven Kings Must Die",
			poster:
        "https://upload.wikimedia.org/wikipedia/en/1/15/Last_kingdom_seven_kings_must_die.png",
			trailer: "https://www.youtube.com/watch?v=eqCYw_o5lng",
			description:
        "Uhtred of Bebbanburg is given a task by King Edward to kill the seven kings who have formed an alliance against him. Uhtred is forced to face the greatest enemy he has ever encountered, and the fate of Wessex hangs in the balance.",
		},
	];
}

async function seed() {
	console.log("Seeding database...");
  
	try {
	  const users = await getUsers();
	  console.log("Seeding users...");
	  for (const user of users) {
			await db.user.create({
		  data: {
					...user,
		  },
			});
	  }
  
	  const testUser = await db.user.findFirst({
			where: {
		  email: "johnadams29@movie.app",
			},
	  });
	  if (!testUser) throw new Error("User Account not found");
  
	  const movies = getMovies();
	  console.log("Seeding movies...");
	  for (const movie of movies) {
			await db.movie.create({
		  data: {
					...movie,
					userId: testUser.id,
		  },
			});
	  }
  
	  console.log("Database seeding completed.");
	} catch (error) {
	  console.error("Error seeding database:", error);
	} finally {
	  await db.$disconnect();
	}
}
  
seed();