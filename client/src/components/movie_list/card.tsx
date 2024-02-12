import { useState } from "react";
import { Card as Component } from "flowbite-react";
import { Star } from "..";
import { Movie } from "../../services/movie";
import { useNavigate } from "react-router-dom";
import { titleToSlug } from "../../utils/title-to-slug";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "..";
import { HiOutlinePlus } from "react-icons/hi2";
import { AddUpdateMovieModal } from "..";
import { NotAuthenticatedModal } from "..";

type CardProps = {
  title: string;
  movies: Movie[] | undefined;
  userId: string;
  isAuthenticated: boolean;
  rank?: boolean;
};

export const Card = ({
  title,
  movies,
  isAuthenticated,
  userId,
  rank,
}: CardProps) => {
  type ExpandedMovies = {
    [key: string]: boolean;
  };

  const [expandedMovies, setExpandedMovies] = useState<ExpandedMovies>({});
  const navigate = useNavigate();

  //** ADD-Review Modal */
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal((prev) => !prev);

  //** Not Authenticated Modal */
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] =
    useState(false);
  const handleShowNotAuthenticatedModal = () =>
    setShowNotAuthenticatedModal((prev) => !prev);
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div
          data-testid="movie-card"
          className=" mx-auto flex flex-col items-center justify-center px-6 py-6 lg:py-0"
        >
          <div className="flex justify-between space-x-5">
            <h3 className="p-10 text-center text-3xl font-semibold italic dark:text-white lg:text-4xl">
              {title}
            </h3>
            <Button
              dataTestId="add-movie-button"
              title={``}
              color="green"
              size={"md"}
              className="h-10 w-10 self-center"
              isProcessing={false}
              onClick={() => {
                isAuthenticated
                  ? handleShowAddModal()
                  : handleShowNotAuthenticatedModal();
              }}
            >
              <HiOutlinePlus />
            </Button>
          </div>

          <div className=" flex w-full flex-wrap items-start justify-center gap-5 lg:gap-10">
            {movies &&
              movies.map((movie) => {
                const isExpanded = expandedMovies[movie.id as string];
                return (
                  <Component
                    data-testid="movie-detail-card"
                    horizontal
                    key={movie.id}
                    className="w-full rounded-md border-2 border-gray-300 shadow-xl dark:border-gray-700 lg:h-[387px]"
                    renderImage={() => (
                      <img
                        loading="lazy"
                        src={movie.poster}
                        alt={`${movie.title} + poster picture`}
                        className="h-64 w-auto rounded-l md:h-full lg:h-96 lg:w-64"
                      />
                    )}
                  >
                    <div className=" flex h-full flex-col justify-start gap-5 md:gap-0 lg:gap-0">
                      <div className="flex flex-col ">
                        <h5 className="flex space-x-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:block">
                          {movie.title}
                          {rank && ` (${movie._count?.reviews})`}
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
                                [movie.id as string]: !isExpanded,
                              })
                            }
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        </p>
                      </div>
                      <div className="mt-auto w-full ">
                        <Button
                          dataTestId="watch-now-button"
                          onClick={() =>
                            navigate(`/movie/${titleToSlug(movie.title)}`)
                          }
                          title={"Watch Now"}
                          color="failure"
                          className={`w-full rounded-md lg:w-[270px] ${
                            isExpanded ? "lg:mt-10" : "md:mt-10 lg:mt-24"
                          }`}
                          isProcessing={false}
                        >
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

      {showAddModal && (
        <AddUpdateMovieModal
          data-testid="add-modal"
          movie={{
            id: "",
            userId: userId,
            title: "",
            description: "",
            poster: "",
            trailer: "",
          }}
          operation={"Create"}
          show={showAddModal}
          handleShowAddUpdateModal={handleShowAddModal}
        />
      )}
      {showNotAuthenticatedModal && (
        <NotAuthenticatedModal
          show={showNotAuthenticatedModal}
          message={"You need to be logged in to add a movie"}
        />
      )}
    </>
  );
};
