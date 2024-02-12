import { Movie } from "../../services/movie";
import { useState } from "react";
import { canModify } from "../../utils/can-modify";
import { Button } from "..";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { AddUpdateMovieModal } from "..";
import { DeleteConfirmationModal } from "..";
import { useDeleteMovie } from "../../hooks/useMovie";
import { useNavigate } from "react-router-dom";
type MovieDetailsCardProps = {
  movie: Movie;
  isAuthenticated: boolean;
  userId: string;
};

export const Card = ({ movie, userId }: MovieDetailsCardProps) => {
  const deleteMutation = useDeleteMovie();
  const navigate = useNavigate();

  const handleDeleteMovie = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        alert("Movie Deleted");
        navigate("/");
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  /** Delete Review MODAL */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal((prev) => !prev);

  /** Update Review MODAL */
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = () => setShowUpdateModal((prev) => !prev);

  const [currentMovie, setCurrentMovie] = useState<Movie>();
  return (
    <>
      <div key={movie.id} className="w-auto bg-gray-50 p-5  dark:bg-gray-900">
        <div className="flex space-x-5">
          <h5 className="flex space-x-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:block">
            {movie.title}
          </h5>{" "}
          {canModify(userId, movie.userId) && (
            <div className="flex justify-end space-x-5">
              <Button
                dataTestId="edit-button"
                onClick={() => {
                  setCurrentMovie(movie);
                  setShowUpdateModal(true);
                }}
                title={``}
                size={"sm"}
                className="w-fit bg-orange-500 dark:bg-orange-500"
                isProcessing={false}
              >
                <HiOutlinePencilSquare />
              </Button>
              <Button
                dataTestId="delete-button"
                onClick={() => {
                  setCurrentMovie(movie);
                  setShowDeleteModal(true);
                }}
                title={``}
                color="red"
                size={"sm"}
                className=""
                isProcessing={false}
              >
                <HiOutlineTrash />
              </Button>
            </div>
          )}
        </div>
        <p className="w-auto rounded-md border-none px-2 py-2 text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
          {movie.description}
        </p>
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal
          type={"movie"}
          message={"Are you sure you want to delete this movie?"}
          movieId={currentMovie.id}
          show={showDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          handleDeletion={handleDeleteMovie}
        />
      )}
      {showUpdateModal && (
        <AddUpdateMovieModal
          movie={currentMovie}
          operation={"Update"}
          show={showUpdateModal}
          handleShowAddUpdateModal={handleShowUpdateModal}
        />
      )}
    </>
  );
};
