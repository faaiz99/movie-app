import { Modal } from "flowbite-react";
import { Button } from "..";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type DeleteConfirmationProps = {
  type: "review" | "movie";
  show: boolean;
  reviewId?: string;
  movieId?: string;
  handleShowDeleteModal: () => void;
  handleDeletion: (id: string) => void;
  message: string;
};

export const DeleteConfirmationModal = ({
  type,
  show,
  handleShowDeleteModal,
  reviewId,
  movieId,
  message,
  handleDeletion,
}: DeleteConfirmationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openModal] = useState(show);

  return (
    <>
      <Modal
        className="backdrop-blur-sm"
        show={openModal}
        size="md"
        onClose={handleShowDeleteModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                title={"Yes, I'm sure"}
                color="failure"
                onClick={() => {
                  handleDeletion(
                    type === "review"
                      ? (reviewId as string)
                      : (movieId as string),
                  );
                  handleShowDeleteModal();
                }}
              ></Button>
              <Button
                title={`No, cancel`}
                color="gray"
                onClick={handleShowDeleteModal}
              ></Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
