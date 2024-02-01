import { Review } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "..";
import { Rating } from "..";
import { canModify } from "../../utils/canModify";
import { useAuthStore } from "../../store/store";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { DeleteConfirmationModal } from "..";
import { AddUpdateReviewModal } from "..";
import { useState } from "react";

type MovieReviewsCardProps = {
  reviews: Review[];
  userId: string;
  isAuthenticated: boolean;
};

export const Card = ({ reviews, isAuthenticated }: MovieReviewsCardProps) => {
  console.log(reviews);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInput>();

  const currentId = useAuthStore((state) => state.session.id);

  /** DELETION MODAL */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal((prev) => !prev);

  /** ADD-UPDATION MODAL */
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const handleShowAddUpdateModal = () => setShowAddUpdateModal((prev) => !prev);

  return (
    <div className="w-auto flex-col bg-gray-50  px-5 dark:bg-gray-900 lg:p-5 ">
      <div className="flex justify-between pb-5">
        <h5 className="flex space-x-2 text-xl font-semibold tracking-tight text-gray-700 dark:text-white lg:block">
          {`Reviews (${reviews.length})`}
        </h5>{" "}
        <Button
          title={`Add`}
          color="green"
          size={"md"}
          className="px-5 py-0"
          isProcessing={false}
          onClick={() => isAuthenticated && console.log("clicked")}
        />
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
              </div>
              {canModify(currentId, review.userId) && (
                <div className="flex justify-end space-x-5">
                  <Button
                    onClick={() => {
                      setShowAddUpdateModal(true);
                    }}
                    title={``}
                    color="blue"
                    size={"sm"}
                    className="w-fit"
                    isProcessing={false}
                  >
                    <HiOutlinePencilSquare />
                  </Button>
                  <Button
                    onClick={() => {
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
                  reviewId={review.id}
                  show={showDeleteModal}
                  handleShowDeleteModal={handleShowDeleteModal}
                />
              )}
              {showAddUpdateModal && (
                <AddUpdateReviewModal
                  review={review}
                  operation={"update"}
                  show={showAddUpdateModal}
                  handleShowAddUpdateModal={handleShowAddUpdateModal}
                />
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
