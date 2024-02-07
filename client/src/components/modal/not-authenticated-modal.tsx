import { Modal as Component } from "flowbite-react";
import { useState } from "react";
import { Button } from "..";
import { useNavigate } from "react-router-dom";
import { HiOutlineFingerPrint } from "react-icons/hi";

type ModalProps = {
  show: boolean;
  message: string;
};

export const NotAuthenticatedModal = ({ show, message }: ModalProps) => {
  const [openModal, setOpenModal] = useState(show);
  const navigate = useNavigate();
  return (
    <>
      <Component
        dismissible
        className="backdrop-blur-sm"
        show={openModal}
        size="lg"
        onClose={() => setOpenModal(false)}
      >
        <Component.Body>
          <div className="text-center">
            <HiOutlineFingerPrint className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="text-md mb-5 font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <Button
              className="w-full"
              color="blue"
              title={"Login"}
              onClick={() => navigate("/login")}
            />
          </div>
        </Component.Body>
      </Component>
    </>
  );
};
