import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../../components/movie-details/Form";

describe("Form component", () => {
  const mockMovieInputs = {
    id: "1",
    title: "Test Movie",
    description: "This is a test movie",
    poster: "test-poster.jpg",
    trailer: "https://www.youtube.com/watch?v=12345",
    userId: "123",
  };

  const onSubmit = vi.fn();
  const handleSubmit = vi.fn(onSubmit);

  it("renders the form with correct initial values", () => {
    render(
      <Form
        movie={mockMovieInputs}
        operation="Create"
        handleAddUpdateMovie={handleSubmit}
      />,
    );

    expect(screen.getByTestId("title")).toHaveValue(mockMovieInputs.title);
    expect(screen.getByTestId("description")).toHaveValue(
      mockMovieInputs.description,
    );
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(handleSubmit).toHaveBeenCalledWith(mockMovieInputs);
  });

  it("calls the onSubmit function with the updated movie inputs when the form is submitted", () => {
    render(
      <Form
        movie={mockMovieInputs}
        operation="Update"
        handleAddUpdateMovie={handleSubmit}
      />,
    );

    const updatedMovieInputs = {
      ...mockMovieInputs,
      title: "Updated Movie",
      description: "This is an updated movie",
    };

    fireEvent.change(screen.getByTestId("title"), {
      target: { value: updatedMovieInputs.title },
    });
    fireEvent.change(screen.getByTestId("description"), {
      target: { value: updatedMovieInputs.description },
    });

    fireEvent.click(screen.getByTestId("button-test-id"));
    expect(handleSubmit).toHaveBeenCalledWith(updatedMovieInputs);
  });
});
