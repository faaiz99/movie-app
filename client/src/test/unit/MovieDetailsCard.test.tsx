import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../../components/movie-details/Card";

describe("Card component", () => {
  const mockMovie = {
    id: "1",
    title: "Test Movie",
    description: "Test Description",
    userId: "user1",
  };

  const mockUserId = "user1";

  it("renders movie details correctly", () => {
    render(<Card movie={mockMovie} userId={mockUserId} />);

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it("shows delete confirmation modal when delete button is clicked", () => {
    render(<Card movie={mockMovie} userId={mockUserId} />);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(screen.getByText("Are you sure you want to delete this movie?")).toBeInTheDocument();
  });

  it("shows update modal when update button is clicked", () => {
    render(<Card movie={mockMovie} userId={mockUserId} />);

    const updateButton = screen.getByTestId("update-button");
    fireEvent.click(updateButton);

    expect(screen.getByText("Update Movie")).toBeInTheDocument();
  });

  it("calls deleteMutation.mutate and navigates to home page when movie is deleted", () => {
    const mockDeleteMutation = {
      mutate: vi.fn(),
    };

    const mockNavigate = vi.fn();

    render(
      <Card
        movie={mockMovie}
        userId={mockUserId}
        deleteMutation={mockDeleteMutation}
        navigate={mockNavigate}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(mockDeleteMutation.mutate).toHaveBeenCalledWith(mockMovie.id, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    // Simulate a successful deletion
    mockDeleteMutation.mutate.mock.calls[0][1].onSuccess();

    expect(screen.getByText("Movie Deleted")).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});