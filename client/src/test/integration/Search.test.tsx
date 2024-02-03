import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../../components/movie-search/Search";

describe("Search component", () => {
  it("renders the search input field", () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText("Search your favourite movies...");
    expect(searchInput).toBeInTheDocument();
  });

  it("toggles the modal on click", () => {
    render(<Search />);
    const searchContainer = screen.getByRole("button");
    fireEvent.click(searchContainer);
    const modalElement = screen.getByTestId("modal");
    expect(modalElement).toBeInTheDocument();
  });
});