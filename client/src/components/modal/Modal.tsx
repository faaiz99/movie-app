import { Modal as Component } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  show: boolean;
  message: string;
};

export const Modal = ({ show, message }: ModalProps) => {
  const [openModal, setOpenModal] = useState(show);
  const navigate = useNavigate();
  useEffect(() => {
    if (openModal) {
      const timer = setTimeout(() => {
        setOpenModal(false);
        //navigate("/error")
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Component
        className="outline-none focus:ring-0 active:outline-none active:ring-0"
        show={openModal}
        size="lg"
        onClose={() => setOpenModal(false)}
      >
        <Component.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
          </div>
        </Component.Body>
      </Component>
    </>
  );
};
