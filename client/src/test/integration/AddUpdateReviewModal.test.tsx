import { render, screen, fireEvent } from "@testing-library/react";
import { AddUpdateReviewModal } from "../../components/movie-reviews/AddUpdateReviewModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Review } from "../../services/review";
const queryClient = new QueryClient();

describe("AddUpdateReviewModal component", () => {
  const mockReview: Review = {
    id: "1",
    title: "Test Review",
    description: "This is a test review",
    rating: 5,
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
      <QueryClientProvider client={queryClient}>
        <AddUpdateReviewModal
          review={mockReview}
          operation={mockOperation}
          show={mockShow}
          handleShowAddUpdateModal={mockHandleShowAddUpdateModal}
        />
      </QueryClientProvider>,
    );
  });

  it("renders the modal with correct props", () => {
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("relative h-full w-full p-4 md:h-auto max-w-md");
  });

  it("renders the form inside the modal", () => {
    const form = screen.getByLabelText("Title");
    expect(form).toBeVisible();
  });

  it("calls handleShowAddUpdateModal when modal is closed", () => {
    const modal = screen.getByRole("dialog");
    fireEvent.click(modal);
    expect(mockHandleShowAddUpdateModal).toHaveBeenCalled();
  });

  it("calls handleAddUpdateReview with correct data on form submission", () => {
    const submitButton = screen.getByRole("button", { name: mockOperation });
    fireEvent.click(submitButton);
    expect(mockHandleAddUpdateReview).toHaveBeenCalledWith(
      mockReview,
      mockOperation,
    );
  });
});
