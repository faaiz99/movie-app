import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../../components/movie_list/card";
import { BrowserRouter } from "react-router-dom";
import { Movie } from "../../services/movie";
describe("Card component", () => {
  const mockTitle = "Movie List";
  const mockMovies: Movie[] = [
    {
      id: "1",
      title: "Movie 1",
      description: "Description 1",
      poster: "poster1.jpg",
      trailer: "trailer1.mp4",
      userId: "123",
      reviews: [],
    },
    {
      id: "2",
      title: "Movie 2",
      description: "Description 2",
      poster: "poster2.jpg",
      trailer: "trailer2.mp4",
      userId: "123",
      reviews: [],
    },
  ];

  const mockIsAuthenticated = true;
  const mockUserId = "123";
  const mockRank = true;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Card
          title={mockTitle}
          movies={mockMovies}
          isAuthenticated={mockIsAuthenticated}
          userId={mockUserId}
          rank={mockRank}
        />
      </BrowserRouter>,
    );
  });

  it("renders the title correctly", () => {
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the movie cards correctly", () => {
    const movieElements = screen.getAllByTestId("movie-details-card");
    expect(movieElements.length).toBe(mockMovies.length);
  });

  it("expands and collapses movie descriptions correctly", () => {
    const firstMovieElement = screen.getByText(mockMovies[0].title);
    const readMoreButton = screen.getByText("Read More");

    fireEvent.click(readMoreButton);

    expect(firstMovieElement).toHaveTextContent(
      `${mockMovies[0].description.substring(0, 200)}...`,
    );

    fireEvent.click(readMoreButton);

    expect(firstMovieElement).toHaveTextContent(
      `${mockMovies[0].description.substring(0, 100)}...`,
    );
  });

  it("opens the add modal when the button is clicked", () => {
    const addButton = screen.getByTestId("add-movie-button");
    fireEvent.click(addButton);

    const addModal = screen.getByTestId("add-modal");
    expect(addModal).toBeInTheDocument();
  });

  it("navigates to the movie details page when the 'Watch Now' button is clicked", () => {
    const watchNowButton = screen.getByTestId("watch-now-button");
    fireEvent.click(watchNowButton);

    expect(window.location.pathname).toBe(`/movie/${mockMovies[0].id}`);
  });
});
