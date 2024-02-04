import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../../components/movie-details/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
describe("Card component", () => {
  const mockMovie = {
    id: "1",
    title: "Test Movie",
    description: "Test Description",
    userId: "user1",
    poster: "https://via.placeholder.com/150",
    trailer: "https://www.youtube.com/watch?v=1234",
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    loading: false,
  };

  // id?: string;
  // title: string;
  // description: string;
  // poster: string;
  // trailer: string;
  // userId: string;
  // reviews?: Review[];
  // createdAt?: Date;
  // updatedAt?: Date;
  // loading?: boolean;
  // _count?: {
  //   reviews: number;
  // };
  const mockUserId = "user1";

  it("renders movie details correctly", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Card movie={mockMovie} userId={mockUserId} isAuthenticated={false} />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it("shows delete confirmation modal when delete button is clicked", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Card movie={mockMovie} userId={mockUserId} isAuthenticated={false} />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure you want to delete this movie?"),
    ).toBeInTheDocument();
  });

  it("shows update modal when update button is clicked", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Card movie={mockMovie} userId={mockUserId} isAuthenticated={true} />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    const updateButton = screen.getByTestId("edit-button");
    fireEvent.click(updateButton);

    expect(screen.getByText("Update Movie")).toBeVisible();
  });

  it("calls deleteMutation.mutate and navigates to home page when movie is deleted", () => {
    const mockDeleteMutation = {
      mutate: vi.fn(),
    };

    const mockNavigate = vi.fn();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Card movie={mockMovie} userId={mockUserId} isAuthenticated={true} />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(mockDeleteMutation.mutate).toHaveBeenCalledWith(mockMovie.id, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });
    mockDeleteMutation.mutate.mock.calls[0][1].onSuccess();

    expect(screen.getByText("Movie Deleted")).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
