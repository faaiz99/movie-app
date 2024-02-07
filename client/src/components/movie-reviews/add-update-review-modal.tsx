import { Modal } from "flowbite-react";
import { useState } from "react";
import { Review } from "../../services/review";
import { useUpdateReview } from "../../hooks/useReview";
import { useCreateReview } from "../../hooks/useReview";
import Form from "./form";
type AddUpdateReviewModalProps = {
  review: Review;
  operation: "Create" | "Update";
  show: boolean;
  handleShowAddUpdateModal: () => void;
};

export const AddUpdateReviewModal = ({
  review,
  operation,
  show,
  handleShowAddUpdateModal,
}: AddUpdateReviewModalProps) => {
  const [openModal] = useState(show);
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const handleAddUpdateReview = (
    review: Omit<Review, "id">,
    operation: string,
  ) => {
    switch (operation) {
      case "Create": {
        createMutation.mutate(review, {
          onSuccess: () => {
            alert("Review added successfully");
            handleShowAddUpdateModal();
          },
          onError: (error) => {
            alert(error);
            handleShowAddUpdateModal();
          },
        });
        break;
      }
      case "Update": {
        updateMutation.mutate(review, {
          onSuccess: () => {
            alert("Review updated successfully");
            handleShowAddUpdateModal();
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
            review={review}
            operation={operation}
            handleAddUpdateReview={handleAddUpdateReview}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
