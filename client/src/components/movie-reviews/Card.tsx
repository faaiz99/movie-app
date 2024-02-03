import { Review } from "../../services/review";
import { Button } from "..";
import { Rating } from "..";
import { canModify } from "../../utils/canModify";
import { useDeleteReview } from "../../hooks/useReview";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { DeleteConfirmationModal } from "..";
import { AddUpdateReviewModal } from "..";
import { NotAuthenticatedModal } from "..";
import { useState } from "react";
type MovieReviewsCardProps = {
  reviews: Review[];
  userId: string;
  isAuthenticated: boolean;
  movieId: string;
};

export const Card = ({
  reviews,
  isAuthenticated,
  userId,
  movieId,
}: MovieReviewsCardProps) => {
  const deleteMutation = useDeleteReview();
  const handleDeleteReview = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        alert("Review Deleted");
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

  //** ADD-Review Modal */
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal((prev) => !prev);

  //** Not Authenticated Modal */
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] =
    useState(false);
  const handleShowNotAuthenticatedModal = () =>
    setShowNotAuthenticatedModal((prev) => !prev);

  const [currentReview, setCurrentReview] = useState<Review>();
  return (
    <div className="w-auto flex-col bg-gray-50  px-5 dark:bg-gray-900 lg:p-5 ">
      <div className="flex justify-between pb-5">
        <h5 className="flex space-x-2 text-xl font-semibold tracking-tight text-gray-700 dark:text-white lg:block">
          {`Reviews (${reviews.length})`}
        </h5>{" "}
        <Button
          title={``}
          color="green"
          size={"md"}
          className=""
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
      {reviews.map((review) => {
        return (
          <>
            <div
              key={review.id}
              className="max-w-md py-1  lg:max-w-2xl lg:py-2.5"
            >
              <Rating rating={review.rating} />

              <div
                key={review.id}
                className="flex justify-between gap-1 space-x-10"
              >
                <p className="text-md flex space-x-2 font-semibold tracking-tight text-gray-900 dark:text-white lg:block">
                  {review.title}
                </p>
                <p className="flex space-x-2 text-xs font-semibold tracking-tight text-gray-900 dark:text-white lg:block">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
              <div className=" flex flex-col gap-1 rounded-md border-none text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
                <p className="flow-text whitespace-normal text-wrap break-words rounded-md  border-none text-sm font-normal text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
                  {review.description}
                </p>
                <p className="flow-text whitespace-normal text-wrap break-words rounded-md  border-none text-sm font-normal text-gray-700 outline-none focus:ring-0 dark:bg-inherit dark:text-gray-400">
                  {`${review.user?.firstName} ${review.user?.lastName}`}
                </p>
              </div>
              {canModify(userId, review.userId) && (
                <div className="flex justify-end space-x-5">
                  <Button
                    data-testid="edit-button"
                    onClick={() => {
                      setCurrentReview(review);
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
                    data-testid="delete-button"
                    onClick={() => {
                      setCurrentReview(review);
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
              {showDeleteModal && (
                <DeleteConfirmationModal
                  type={"review"}
                  reviewId={currentReview!.id}
                  message={`Are you sure you want to delete this Review?
                  `}
                  handleDeletion={handleDeleteReview}
                  show={showDeleteModal}
                  handleShowDeleteModal={handleShowDeleteModal}
                />
              )}
              {showUpdateModal && (
                <AddUpdateReviewModal
                  review={currentReview!}
                  operation={"Update"}
                  show={showUpdateModal}
                  handleShowAddUpdateModal={handleShowUpdateModal}
                />
              )}
            </div>
          </>
        );
      })}
      {showAddModal && (
        <AddUpdateReviewModal
          review={{
            id: "",
            movieId: movieId,
            userId: userId,
            title: "",
            description: "",
            rating: 0,
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
    </div>
  );
};
