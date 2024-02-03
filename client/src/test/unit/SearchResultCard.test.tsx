import { render, screen } from "@testing-library/react";
import { Card } from "../../components/movie-search/Card";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
const mockMovie = {
  poster: "https://example.com/poster.jpg",
  title: "Sample Movie",
  description: "This is a sample movie description",
  loading: false,
  trailer: "https://www.youtube.com/watch?v=1234",
  userId: "1234"
};

describe("Card component", () => {
  it("renders the movie title and description", () => {
    render(<Card {...mockMovie} />);
    const titleElement = screen.getByText("Sample Movie...");
    const descriptionElement = screen.getByText("This is a sample movie description...");
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("navigates to the movie details page on button click", () => {
    const navigateMock = vi.fn();
    vi.mock("react-router-dom", () => ({
      ...vi.importActual("react-router-dom"),
      useNavigate: () => navigateMock,
    }));
    render(
      <BrowserRouter>
        <Card
          title={mockMovie.title}
          description={mockMovie.description}
          poster={mockMovie.poster}
          loading={mockMovie.loading}
          trailer={mockMovie.trailer}
          userId={mockMovie.userId}
        />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText("Watch Now");
    buttonElement.click();
    expect(navigateMock).toHaveBeenCalledWith("/movie/sample-movie");
  });
});