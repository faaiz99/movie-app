import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../../components/movie-reviews/Form";
import { Review } from "../../services/review";

describe("Form component", () => {
  const mockOperation = "Create";
  const mockReview: Review = {
    id: "1",
    title: "Test Review",
    description: "This is a test review",
    rating: 5,
    movieId: "123",
    userId: "456",
  };
  const mockHandleAddUpdateReview = vi.fn();

  beforeEach(() => {
    render(
      <Form
        operation={mockOperation}
        review={mockReview}
        handleAddUpdateReview={mockHandleAddUpdateReview}
      />,
    );
  });

  it("renders the form with correct title", () => {
    const formTitle = screen.getByText("Review");
    expect(formTitle).toBeInTheDocument();
  });

  it("renders the form with correct input fields", () => {
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const ratingSelect = screen.getByLabelText("Rating");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(ratingSelect).toBeInTheDocument();
  });

  it("renders the form with correct default values", () => {
    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      "Description",
    ) as HTMLInputElement;
    const ratingSelect = screen.getByLabelText("Rating") as HTMLSelectElement;

    expect(titleInput.value).toBe(mockReview.title);
    expect(descriptionInput.value).toBe(mockReview.description);
    expect(ratingSelect.value.toString()).toEqual(mockReview.rating.toString());
  });

  it("calls handleAddUpdateReview with correct data on form submission", () => {
    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      "Description",
    ) as HTMLInputElement;
    const ratingSelect = screen.getByLabelText("Rating") as HTMLSelectElement;
    const submitButton = screen.getByRole("button", { name: mockOperation });

    const updatedTitle = "Updated Title";
    const updatedDescription = "Updated Description";
    const updatedRating = "4";

    fireEvent.change(titleInput, { target: { value: updatedTitle } });
    fireEvent.change(descriptionInput, {
      target: { value: updatedDescription },
    });
    fireEvent.change(ratingSelect, { target: { value: updatedRating } });
    fireEvent.click(submitButton);

    expect(mockHandleAddUpdateReview).toHaveBeenCalledWith(
      mockReview,
      mockOperation,
    );
  });
});
