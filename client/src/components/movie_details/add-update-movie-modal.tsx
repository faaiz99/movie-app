import { Modal } from "flowbite-react";
import { useState } from "react";
import { Movie } from "../../services/movie";
import { useCreateMovie, useUpdateMovie } from "../../hooks/useMovie";
import { useNavigate } from "react-router-dom";
import Form from "./form";

type AddUpdateReviewModalProps = {
  movie: Movie;
  operation: "Create" | "Update";
  show: boolean;
  handleShowAddUpdateModal: () => void;
};

export const AddUpdateMovieModal = ({
  movie,
  operation,
  show,
  handleShowAddUpdateModal,
}: AddUpdateReviewModalProps) => {
  const [openModal] = useState(show);
  const navigate = useNavigate();
  const createMutation = useCreateMovie();
  const updateMutation = useUpdateMovie();

  const handleAddUpdateMovie = (movie: Movie, operation: string) => {
    switch (operation) {
      case "Create": {
        createMutation.mutate(movie, {
          onSuccess: () => {
            alert("Movie added successfully");
            handleShowAddUpdateModal();
            navigate("/");
          },
          onError: (error) => {
            alert(error);
            handleShowAddUpdateModal();
          },
        });
        break;
      }
      case "Update": {
        updateMutation.mutate(movie, {
          onSuccess: () => {
            alert("Movie updated successfully");
            handleShowAddUpdateModal();
            navigate("/");
          },
          onError: (error) => {
            alert(error);
            handleShowAddUpdateModal();
          },
        });
        break;
      }
      default:
        console.log("Invalid operation");
        break;
    }
  };
  return (
    <>
      <Modal
        className="backdrop-blur-sm"
        show={openModal}
        size="md"
        popup
        onClose={handleShowAddUpdateModal}
      >
        <Modal.Header />
        <Modal.Body>
          <Form
            movie={movie}
            operation={operation}
            handleAddUpdateMovie={handleAddUpdateMovie}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
