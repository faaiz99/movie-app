import { render, screen, fireEvent } from "@testing-library/react";
import { AddUpdateReviewModal } from "../../components/movie-reviews/AddUpdateReviewModal";

describe('AddUpdateReviewModal component', () => {
  const mockReview = {
    id: "1",
    title: "Test Review",
    description: "This is a test review",
    rating: "5",
    movieId: "123",
    userId: "456",
  };
  const mockOperation = "Create";
  const mockShow = true;
  const mockHandleShowAddUpdateModal = vi.fn();
  const mockHandleAddUpdateReview = vi.fn();

  beforeEach(() => {
    const mockHandleShowAddUpdateModal = vi.fn();

    render(
      <AddUpdateReviewModal
        review={mockReview}
        operation={mockOperation}
        show={mockShow}
        handleShowAddUpdateModal={mockHandleShowAddUpdateModal}
      />
    );
  });

  it('renders the modal with correct props', () => {
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass('backdrop-blur-sm');
    expect(modal).toHaveAttribute('size', 'md');
  });

  it('renders the form inside the modal', () => {
    const form = screen.getByLabelText('Title');
    expect(form).toBeInTheDocument();
  });

  it('calls handleShowAddUpdateModal when modal is closed', () => {
    const modal = screen.getByRole('dialog');
    fireEvent.click(modal);
    expect(mockHandleShowAddUpdateModal).toHaveBeenCalled();
  });

  it('calls handleAddUpdateReview with correct data on form submission', () => {
    
    const submitButton = screen.getByRole('button', { name: mockOperation });
    fireEvent.click(submitButton);
    expect(mockHandleAddUpdateReview).toHaveBeenCalledWith(
      mockReview,
      mockOperation
    );
  });
});