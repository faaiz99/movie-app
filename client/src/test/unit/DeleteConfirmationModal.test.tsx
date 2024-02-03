import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteConfirmationModal } from "../../components/modal/DeleteConfirmationModal";

describe("DeleteConfirmationModal component", () => {
  const mockProps = {
    type: "review",
    show: true,
    handleShowDeleteModal: vitest.fn(),
    reviewId: "123",
    movieId: "456",
    message: "Are you sure you want to delete?",
    handleDeletion: vitest.fn(),
  };

  beforeEach(() => {
    mockProps.handleShowDeleteModal.mockClear();
    render(<DeleteConfirmationModal
      type="review"
      show={true}
      handleShowDeleteModal={mockProps.handleShowDeleteModal}
      reviewId="123"
      movieId="456"
      message="Are you sure you want to delete?"
      handleDeletion={mockProps.handleDeletion}
    />);
  });

  it("renders the modal with the correct message", () => {
    const messageElement = screen.getByText(mockProps.message);
    expect(messageElement).toBeInTheDocument();
  });

  it("calls handleDeletion and handleShowDeleteModal when 'Yes, I'm sure' button is clicked", () => {
    const yesButton = screen.getByText("Yes, I'm sure");
    fireEvent.click(yesButton);
    expect(mockProps.handleDeletion).toHaveBeenCalledTimes(1);
    expect(mockProps.handleShowDeleteModal).toHaveBeenCalledTimes(1);
  });

  it("calls handleShowDeleteModal when 'No, cancel' button is clicked", () => {
    const cancelButton = screen.getByText("No, cancel");
    fireEvent.click(cancelButton);
    expect(mockProps.handleShowDeleteModal).toHaveBeenCalledTimes(1);
  });
});