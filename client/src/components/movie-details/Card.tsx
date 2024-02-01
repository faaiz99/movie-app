/* eslint-disable @typescript-eslint/no-unused-vars */

import { Movie, Review } from "../../services/api";

type MovieDetailsCardProps = {
  movie: Movie;
  isAuthenticated: boolean;
};
export const Card = ({
  movie,
  isAuthenticated

  
}: MovieDetailsCardProps) => {

  return (
    <>
      <div key={movie.id} className="w-auto bg-gray-50 p-5  dark:bg-gray-900">
        <h5 className="flex space-x-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:block">
          {movie.title}
        </h5>{" "}
        <p className="w-auto rounded-md border-none px-2 py-2 text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
          {movie.description}
        </p>
      </div>
    </>
  );
};
