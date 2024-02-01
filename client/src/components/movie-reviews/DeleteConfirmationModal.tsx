
import { Modal } from 'flowbite-react';
import { Button } from '..';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDeleteReview } from "../../hooks/useReview";

type DeleteConfirmationProps = {
	show: boolean;
	reviewId: string;
	handleShowDeleteModal: () => void;
}

export const DeleteConfirmationModal = ({ show, handleShowDeleteModal, reviewId }: DeleteConfirmationProps) => {
	const [openModal, setOpenModal] = useState(show);

	const deleteMutation = useDeleteReview();
	const handleDeleteReview = (id: string) => {
		deleteMutation.mutate(id);
	}
	return (
		<>
			<Modal show={openModal} size="md" onClose={handleShowDeleteModal} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this Review?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								title={"Yes, I'm sure"}
								color="failure" onClick={() => {
									handleDeleteReview(reviewId)
									handleShowDeleteModal()
								}}>

							</Button>
							<Button title={`No, cancel`} color="gray" onClick={handleShowDeleteModal}>

							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
