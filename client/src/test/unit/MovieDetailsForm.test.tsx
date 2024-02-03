import { render, screen, fireEvent } from "@testing-library/react";
import  Form  from "../../components/movie-details/Form";

describe("Form component", () => {
  const mockMovieInputs = {
    id: "1",
    title: "Test Movie",
    description: "This is a test movie",
    poster: "test-poster.jpg",
    trailer: "https://www.youtube.com/watch?v=12345",
    userId: "123",
  };

  const handleSubmit = vi.fn();

  it("renders the form with correct initial values", () => {
    render(<Form movieInputs={mockMovieInputs} onSubmit={handleSubmit} />);

    expect(screen.getByLabelText("Title")).toHaveValue(mockMovieInputs.title);
    expect(screen.getByLabelText("Description")).toHaveValue(
      mockMovieInputs.description
    );
    expect(screen.getByLabelText("Poster")).toHaveValue(mockMovieInputs.poster);
    expect(screen.getByLabelText("Trailer")).toHaveValue(
      mockMovieInputs.trailer
    );
  });

  it("calls the onSubmit function with the updated movie inputs when the form is submitted", () => {
    render(<Form movieInputs={mockMovieInputs} onSubmit={handleSubmit} />);

    const updatedMovieInputs = {
      ...mockMovieInputs,
      title: "Updated Movie",
      description: "This is an updated movie",
    };

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: updatedMovieInputs.title },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: updatedMovieInputs.description },
    });

    fireEvent.submit(screen.getByTestId("form"));

    expect(handleSubmit).toHaveBeenCalledWith(updatedMovieInputs);
  });
});