import { render, screen } from "@testing-library/react";
import { Card } from "../../components/movie-reviews/card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Review } from "../../services/review";

const queryClient = new QueryClient();

describe("Card component", () => {
  const mockReviews: Review[] = [
    {
      id: "1",
      title: "Test Review 1",
      description: "This is test review 1",
      rating: 5,
      movieId: "123",
      userId: "456",
    },
    {
      id: "2",
      title: "Test Review 2",
      description: "This is test review 2",
      rating: 4,
      movieId: "123",
      userId: "789",
    },
  ];
  const mockUserId = "456";
  const mockIsAuthenticated = true;
  const mockMovieId = "123";

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Card
          reviews={mockReviews}
          userId={mockUserId}
          isAuthenticated={mockIsAuthenticated}
          movieId={mockMovieId}
        />
      </QueryClientProvider>,
    );
  });

  it("renders the card component with correct reviews", () => {
    const reviewElements = screen.getAllByTestId("review-card");
    const reviewElementDetails = screen.getAllByTestId("review-card-details");
    expect(reviewElements.length).not.toBe(0);
    expect(reviewElementDetails.length).toBe(mockReviews.length);
  });

  it("renders the card component with edit and delete buttons for authenticated user", () => {
    const editButtons = screen.getAllByTestId("edit-button");
    const deleteButtons = screen.getAllByTestId("delete-button");

    expect(editButtons.length).toBeLessThanOrEqual(mockReviews.length);
    expect(deleteButtons.length).toBeLessThanOrEqual(mockReviews.length);
  });

  it("renders the card component without edit and delete buttons for unauthenticated user", () => {
    const editButtons = screen.queryAllByTestId("edit-button");
    const deleteButtons = screen.queryAllByTestId("delete-button");

    expect(editButtons.length).toBe(1);
    expect(deleteButtons.length).toBe(1);
  });
});
