import { useState } from "react";
import { Card as Component } from "flowbite-react";
import { Button } from "flowbite-react";
import { Star } from "..";
import { Movie } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { titleToSlug } from "../../utils/titleToSlug";
import { HiOutlineArrowRight } from "react-icons/hi";

// import { Button } from "..";

type CardProps = {
  title: string;
  movies: Movie[];
};

export const Card = ({ title, movies }: CardProps) => {
  // const [movies, setMovies] = useState([
  // 	{
  // 		id: "039dccf4-87d0-4a62-8d28-196e2aef0da9",
  // 		title: "Napoleon",
  // 		description: "A look at the military commander's origins and his swift, ruthless climb to emperor, viewed through the prism of his addictive and often volatile relationship with his wife and one true love, Josephine",
  // 		poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Napoleon_Film_poster.jpg",
  // 		trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  // 		userId: "54b3c9c9-3e4d-4de3-bf27-cc8e60fd4f97",
  // 		createdAt: "2024-01-07T16:20:50.290Z",
  // 		updatedAt: "2024-01-07T16:20:50.290Z"
  // 	},
  // 	{
  // 		id: "8fcc29dd-4961-4be1-8cf0-ce179634a4cd",
  // 		title: "Oppenheimer",
  // 		description: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
  // 		poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
  // 		trailer: "sadsadasd",
  // 		userId: "54b3c9c9-3e4d-4de3-bf27-cc8e60fd4f97",
  // 		createdAt: "2024-01-07T16:20:50.290Z",
  // 		updatedAt: "2024-01-07T16:20:50.290Z"
  // 	}
  // ])
  type ExpandedMovies = {
    [key: string]: boolean;
  };
  const [expandedMovies, setExpandedMovies] = useState<ExpandedMovies>({});
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-6 lg:py-0">
          <h3 className="p-10 text-center text-3xl font-semibold italic dark:text-white lg:text-4xl">
            {title}
          </h3>
          <div className="flex flex-wrap items-start justify-center gap-5 lg:gap-10">
            {movies.map((movie) => {
              const isExpanded = expandedMovies[movie.id];
              return (
                <Component
                  horizontal
                  key={movie.id}
                  className=" max-w-sm rounded-md border-2 border-gray-300 shadow-xl dark:border-gray-700 lg:h-[387px]"
                  renderImage={() => (
                    <img
                      loading="lazy"
                      src={movie.poster}
                      alt={`${movie.title} + poster picture`}
                      className="h-64 w-auto rounded-l md:h-full lg:h-96 lg:w-64"
                    />
                  )}
                >
                  <div className="flex h-full flex-col justify-start gap-5 md:gap-0 lg:gap-0">
                    <div className="flex flex-col ">
                      <h5 className="flex space-x-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:block">
                        {movie.title}
                      </h5>
                      <Star />
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {isExpanded
                          ? `${movie.description.substring(0, 200)}...`
                          : `${movie.description.substring(0, 100)}...`}
                        <button
                          className="flex flex-col text-sm hover:underline"
                          onClick={() =>
                            setExpandedMovies({
                              ...expandedMovies,
                              [movie.id]: !isExpanded,
                            })
                          }
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          navigate(`/movie/${titleToSlug(movie.title)}`, {
                            state: { movie },
                          })
                        }
                        color="failure"
                        className={`w-full rounded-md ${
                          isExpanded ? "lg:mt-10" : "md:mt-10 lg:mt-24"
                        }`}
                        isProcessing={false}
                      >
                        Watch Now
                        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
