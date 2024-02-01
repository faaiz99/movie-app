import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { Review } from '../../services/api';
import { useUpdateReview } from '../../hooks/useReview';
import { useCreateReview } from '../../hooks/useReview';
import Form from './Form';


type AddUpdateReviewModalProps = {
  review:Review
  operation: 'Create' | 'Update'
  show: boolean;
  handleShowAddUpdateModal: () => void;
}

export const AddUpdateReviewModal = ({review, operation, show, handleShowAddUpdateModal}:AddUpdateReviewModalProps)=>{
  console.log(show)
  const [openModal, setOpenModal] = useState(show);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();

  const handleAddUpdateReview = (review:Review) => {
    if (operation === 'Create') {
      createMutation.mutate(review);
    } else {
      updateMutation.mutate(review);
    }
  }
  return (
    <>
      <Modal show={openModal} size="md" popup onClose={handleShowAddUpdateModal} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
         <Form {...review} />
        </Modal.Body>
      </Modal>
    </>
  );
}
